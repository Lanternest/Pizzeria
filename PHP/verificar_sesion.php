<?php
session_start();

// Verificar si hay sesión activa
if (isset($_SESSION['usuario_id'])) {
    // Usuario logueado - devolver datos
    header('Content-Type: application/json');
    echo json_encode([
        'logueado' => true,
        'usuario' => [
            'id' => $_SESSION['usuario_id'],
            'nombre' => $_SESSION['usuario_nombre'],
            'email' => $_SESSION['usuario_email'],
            'telefono' => $_SESSION['usuario_telefono'],
            'direccion' => $_SESSION['usuario_direccion']
        ]
    ]);
} else {
    // No hay sesión
    header('Content-Type: application/json');
    echo json_encode([
        'logueado' => false
    ]);
}
?>