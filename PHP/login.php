<?php
session_start();
include_once('../PHP/db.php');

$conectar = conn();

// Recibir datos del formulario
$email = mysqli_real_escape_string($conectar, $_POST['email']);
$password = $_POST['password'];

// Validar campos vacíos
if (empty($email) || empty($password)) {
    header("Location: ../html/login.html?error=campos_vacios");
    exit();
}

// Buscar usuario en la base de datos
$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$result = mysqli_query($conectar, $sql);

if (mysqli_num_rows($result) == 1) {
    $usuario = mysqli_fetch_assoc($result);
    
    // Verificar contraseña
    if (password_verify($password, $usuario['contrasenia'])) {
        // Login exitoso - crear sesión
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['nombreCompleto'];
        $_SESSION['usuario_email'] = $usuario['email'];
        $_SESSION['usuario_telefono'] = $usuario['telefono'];
        $_SESSION['usuario_direccion'] = $usuario['direccion'];
        
        // Redirigir al index
        header("Location: ../html/index.html");
        exit();
    } else {
        // Contraseña incorrecta
        header("Location: ../html/login.html?error=password_incorrecto");
        exit();
    }
} else {
    // Usuario no encontrado
    header("Location: ../html/login.html?error=usuario_no_existe");
    exit();
}

mysqli_close($conectar);
?>