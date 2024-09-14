// Función que maneja el envío del formulario de login
function handleLogin(event, jsonFile, successRedirect) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Consulta el archivo JSON correspondiente
    fetch(jsonFile)
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.username === username && user.password === password);

            const loginResult = document.getElementById('loginResult');
            if (user) {
                loginResult.textContent = 'Login exitoso. Redirigiendo...';
                loginResult.style.color = 'green';

                // Redirige a la página correspondiente
                setTimeout(() => {
                    window.location.href = successRedirect;
                }, 2000);
            } else {
                loginResult.textContent = 'Nombre de usuario o contraseña incorrectos.';
                loginResult.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error al consultar el archivo:', error);
            const loginResult = document.getElementById('loginResult');
            loginResult.textContent = 'Hubo un error. Intente de nuevo más tarde.';
            loginResult.style.color = 'red';
        });
}

// Determina la lógica según la página de origen
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        // Verifica de qué página proviene la solicitud y ajusta la consulta y redirección
        if (window.location.pathname.includes('alogin.html')) {
            loginForm.addEventListener('submit', function(event) {
                handleLogin(event, '/login/agentes.json', '/agentes/home.html');
            });
        } else if (window.location.pathname.includes('login.html')) {
            loginForm.addEventListener('submit', function(event) {
                handleLogin(event, '/login/civil.json', '/learning/idenuncia.html');
            });
        }
    }
});
