// Variables globales
let carrito = [];
let usuarioLogueado = null;

// Elementos del DOM
const carritoModal = document.getElementById('carritoModal');
const perfilModal = document.getElementById('perfilModal');
const carritoBtn = document.getElementById('carritoBtn');
const perfilBtn = document.getElementById('perfilBtn');
const logoutBtn = document.getElementById('logoutBtn');
const closeCarrito = document.getElementById('closeCarrito');
const closePerfil = document.getElementById('closePerfil');
const cartCount = document.getElementById('cartCount');
const carritoItems = document.getElementById('carritoItems');
const totalPrice = document.getElementById('totalPrice');
const checkoutBtn = document.getElementById('checkoutBtn');
const perfilForm = document.getElementById('perfilForm');

// Verificar sesión al cargar la página
async function verificarSesion() {
    try {
        const response = await fetch('../PHP/verificar_sesion.php');
        const data = await response.json();
        
        if (data.logueado) {
            usuarioLogueado = data.usuario;
            cargarDatosUsuario();
        } else {
            // No hay sesión activa
            usuarioLogueado = null;
        }
    } catch (error) {
        console.error('Error al verificar sesión:', error);
        usuarioLogueado = null;
    }
}

// Cargar datos del usuario en el perfil
function cargarDatosUsuario() {
    if (usuarioLogueado && perfilForm) {
        document.getElementById('perfilNombre').value = usuarioLogueado.nombre || '';
        document.getElementById('perfilEmail').value = usuarioLogueado.email || '';
        document.getElementById('perfilTelefono').value = usuarioLogueado.telefono || '';
        document.getElementById('perfilDireccion').value = usuarioLogueado.direccion || '';
    }
}

// Abrir/cerrar modales
if (carritoBtn) {
    carritoBtn.addEventListener('click', () => {
        if (!usuarioLogueado) {
            if (confirm('⚠️ Debes iniciar sesión para agregar pizzas al carrito.\n\n¿Deseas ir al login ahora?')) {
                window.location.href = '../html/login.html';
            }
            return;
        }
        carritoModal.style.display = 'flex';
    });
}

if (perfilBtn) {
    perfilBtn.addEventListener('click', () => {
        if (!usuarioLogueado) {
            if (confirm('⚠️ Debes iniciar sesión para agregar pizzas al carrito.\n\n¿Deseas ir al login ahora?')) {
                window.location.href = '../html/login.html';
            }
            return;
        }
        perfilModal.style.display = 'flex';
    });
}

if (closeCarrito) {
    closeCarrito.addEventListener('click', () => {
        carritoModal.style.display = 'none';
    });
}

if (closePerfil) {
    closePerfil.addEventListener('click', () => {
        perfilModal.style.display = 'none';
    });
}

// Cerrar modales al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === carritoModal) {
        carritoModal.style.display = 'none';
    }
    if (e.target === perfilModal) {
        perfilModal.style.display = 'none';
    }
});

// Finalizar pedido
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (carrito.length > 0) {
            alert('¡Pedido realizado con éxito! Total: ' + totalPrice.textContent);
            carrito = [];
            actualizarCarrito();
            carritoModal.style.display = 'none';
        }
    });
}

// Guardar perfil
if (perfilForm) {
    perfilForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✓ Perfil actualizado correctamente');
        perfilModal.style.display = 'none';
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
            window.location.href = '../PHP/logout.php';
        }
    });
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
});