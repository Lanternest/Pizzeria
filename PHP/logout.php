<?php
session_start();

// Destruir todas las variables de sesión
$_SESSION = array();

// Destruir la sesión
session_destroy();

// Eliminar cookie de sesión
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time()-3600, '/');
}

// Redirigir al login
header("Location: ../html/login.html");
exit();
?>