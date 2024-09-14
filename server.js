const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obtener los civiles
app.get('/agentes/regciviles.json', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'agentes', 'regciviles.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo de civiles.');
            return;
        }
        res.send(data);
    });
});

// Endpoint para añadir infracción
app.post('/agentes/regciviles.json', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'agentes', 'regciviles.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo de civiles.');
            return;
        }

        let civiles = JSON.parse(data);
        const { dni, infraccion } = req.body;

        const civil = civiles.find(c => c.dni === dni);
        if (civil) {
            civil.infracciones.push(infraccion);

            fs.writeFile(filePath, JSON.stringify(civiles, null, 2), 'utf8', (err) => {
                if (err) {
                    res.status(500).send('Error al guardar la infracción.');
                    return;
                }
                res.send('Infracción registrada con éxito');
            });
        } else {
            res.status(404).send('DNI no encontrado');
        }
    });
});

app.listen(port, '192.168.1.197', () => {
    console.log(`Servidor corriendo en http://192.168.1.197:${port}`);
});
