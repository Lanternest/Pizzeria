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
            console.log('Usuario logueado:', usuarioLogueado.nombre);
        } else {
            usuarioLogueado = null;
            console.log('No hay sesión activa');
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

// Agregar pizzas al carrito - EVENTO PRINCIPAL
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Verificar si hay sesión activa
        if (!usuarioLogueado) {
            if (confirm('⚠️ Debes iniciar sesión para agregar pizzas al carrito.\n\n¿Deseas ir al login ahora?')) {
                window.location.href = '../html/login.html';
            }
            return;
        }
        
        const nombre = btn.getAttribute('data-name');
        const precio = parseInt(btn.getAttribute('data-price'));
        
        agregarAlCarrito(nombre, precio);
        
        // Animación del botón
        const textoOriginal = btn.textContent;
        btn.textContent = '✓ Agregado';
        btn.style.background = '#4caf50';
        setTimeout(() => {
            btn.textContent = textoOriginal;
            btn.style.background = '';
        }, 1000);
    });
});

// Función para agregar al carrito
function agregarAlCarrito(nombre, precio) {
    const itemExistente = carrito.find(item => item.nombre === nombre);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    
    actualizarCarrito();
    
    // Mostrar notificación
    mostrarNotificacion(`${nombre} agregada al carrito`);
}

// Mostrar notificación
function mostrarNotificacion(mensaje) {
    // Crear elemento de notificación
    const notif = document.createElement('div');
    notif.className = 'notificacion';
    notif.textContent = mensaje;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 2000);
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        totalPrice.textContent = '$0';
        checkoutBtn.disabled = true;
    } else {
        carritoItems.innerHTML = carrito.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.nombre}</h4>
                    <p>$${item.precio.toLocaleString()} x ${item.cantidad}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="qty-btn" onclick="cambiarCantidad('${item.nombre}', -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button class="qty-btn" onclick="cambiarCantidad('${item.nombre}', 1)">+</button>
                    <button class="remove-btn" onclick="eliminarDelCarrito('${item.nombre}')">🗑️</button>
                </div>
            </div>
        `).join('');
        
        const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        totalPrice.textContent = `$${total.toLocaleString()}`;
        checkoutBtn.disabled = false;
    }
}

// Cambiar cantidad
function cambiarCantidad(nombre, cambio) {
    const item = carrito.find(i => i.nombre === nombre);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            eliminarDelCarrito(nombre);
        } else {
            actualizarCarrito();
        }
    }
}

// Eliminar del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

// Abrir/cerrar modales
if (carritoBtn) {
    carritoBtn.addEventListener('click', () => {
        if (!usuarioLogueado) {
            if (confirm('⚠️ Debes iniciar sesión para ver el carrito.\n\n¿Deseas ir al login ahora?')) {
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
            if (confirm('⚠️ Debes iniciar sesión para ver tu perfil.\n\n¿Deseas ir al login ahora?')) {
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
            const total = totalPrice.textContent;
            if (confirm(`¿Confirmar pedido?\nTotal: ${total}\n\nLa pizza llegará a: ${usuarioLogueado.direccion}`)) {
                alert('🍕 ¡Pedido realizado con éxito!\n\nLlegará en aproximadamente 30 minutos.');
                carrito = [];
                actualizarCarrito();
                carritoModal.style.display = 'none';
            }
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

// Agregar estilos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarSesion();
});

// Log para depuración
console.log('Menu.js cargado correctamente');