const form = document.getElementById('registroForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', (e) => {
    const password = document.getElementById('contrasenia').value;
    const confirmPassword = document.getElementById('confirm-contrasenia').value;

    if (password !== confirmPassword) {
        e.preventDefault();
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return;
    }

    if (password.length < 6) {
        e.preventDefault();
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    // Si todo es correcto, NO bloqueamos el envío.
    // regis.php se ejecutará y redirigirá al login.
});


    // // Simular registro exitoso
    // successMessage.style.display = 'block';
    // form.reset();

    // setTimeout(() => {
    //     successMessage.style.display = 'none';
    // }, 5000);
