const form = document.getElementById('loginForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación básica
    if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Simula inicio de sesión exitoso
    successMessage.style.display = 'block';

    // Aquí iría la lógica real de autenticación
    setTimeout(() => {
        // Redirigir a página principal o dashboard
        window.location.href = '../html/index.html';
    }, 1500);
});