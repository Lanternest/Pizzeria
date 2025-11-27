// Script común para todas las páginas (navbar functionality)
let usuarioLogueado = null;

// Verificar sesión
async function verificarSesion() {
    try {
        const response = await fetch('../PHP/verificar_sesion.php');
        const data = await response.json();
        
        if (data.logueado) {
            usuarioLogueado = data.usuario;
        } else {
            usuarioLogueado = null;
        }
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        usuarioLogueado = null;
    }
}

// Inicializar funcionalidad del navbar
document.addEventListener('DOMContentLoaded', async () => {
    await verificarSesion();
    
    // Botón de perfil
    const perfilBtn = document.getElementById('perfilBtn');
    if (perfilBtn) {
        perfilBtn.addEventListener('click', () => {
            if (!usuarioLogueado) {
                if (confirm('⚠️ Debes iniciar sesión para ver tu perfil.\n\n¿Deseas ir al login ahora?')) {
                    window.location.href = '../html/login.html';
                }
            }
        });
    }
    
    // Botón de carrito
    const carritoBtn = document.getElementById('carritoBtn');
    if (carritoBtn) {
        carritoBtn.addEventListener('click', () => {
            if (!usuarioLogueado) {
                if (confirm('⚠️ Debes iniciar sesión para ver el carrito.\n\n¿Deseas ir al login ahora?')) {
                    window.location.href = '../html/login.html';
                }
            }
        });
    }
    
    // Botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
                window.location.href = '../PHP/logout.php';
            }
        });
    }
});