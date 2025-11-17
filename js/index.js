// Carrito de compras
let carrito = [];

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

// Agregar pizzas al carrito
document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const nombre = btn.getAttribute('data-name');
        const precio = parseInt(btn.getAttribute('data-price'));
        
        agregarAlCarrito(nombre, precio);
        
        // Animación del botón
        btn.textContent = '✓ Agregado';
        btn.style.background = '#4caf50';
        setTimeout(() => {
            btn.textContent = 'Agregar';
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
}

// Función para actualizar el carrito
function actualizarCarrito() {
    // Actualizar contador
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Actualizar contenido del modal
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
carritoBtn.addEventListener('click', () => {
    carritoModal.style.display = 'flex';
});

perfilBtn.addEventListener('click', () => {
    perfilModal.style.display = 'flex';
});

closeCarrito.addEventListener('click', () => {
    carritoModal.style.display = 'none';
});

closePerfil.addEventListener('click', () => {
    perfilModal.style.display = 'none';
});

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
checkoutBtn.addEventListener('click', () => {
    if (carrito.length > 0) {
        alert('¡Pedido realizado con éxito! Total: ' + totalPrice.textContent);
        carrito = [];
        actualizarCarrito();
        carritoModal.style.display = 'none';
    }
});

// Guardar perfil
perfilForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✓ Perfil actualizado correctamente');
    perfilModal.style.display = 'none';
});

// Logout
logoutBtn.addEventListener('click', () => {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        window.location.href = '../html/login.html';
    }
});

// Smooth scroll para navegación
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});