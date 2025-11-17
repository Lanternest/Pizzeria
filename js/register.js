const form = document.getElementById('registroForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    if (password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    // Simular registro exitoso
    successMessage.style.display = 'block';
    form.reset();

    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});