// Cake Data
const cakes = [
    {
        id: 1,
        name: 'Kek BaoBao Tersedap',
        description: 'Traditional Indonesian layer cake with rich spice flavors',
        price: 45.00,
        image: './images/kek1.jpg'
    },
    {
        id: 2,
        name: 'Kek Batik Indulgence',
        description: 'Light and fluffy lemon-infused chiffon cake',
        price: 38.00,
        image: './images/kek2.jpg'

    },
    {
        id: 3,
        name: 'Kek Tiramisu T20',
        description: 'Aromatic pandan-flavored cake with light green color',
        price: 42.00,
        image: './images/kek3.jpg'

    },
    {
        id: 4,
        name: 'Chocolate Indulgence Ultra T20',
        description: 'Rich and decadent chocolate fudge layer cake',
        price: 50.00,
        image: './images/kek4.jpg'

    },
    {
        id: 5,
        name: 'BaoBao Tarik Cake',
        description: 'Malaysian tea-inspired cake with creamy layers',
        price: 48.00,
        image: './images/kek2.jpg'

    },
    {
        id: 6,
        name: 'Kek Batik B40',
        description: 'Colorful patterned cake with chocolate and vanilla swirls',
        price: 55.00,
        image: './images/kek3.jpg'

    }
];

// Cart State
let cart = [];

// DOM Elements
const cakesGrid = document.getElementById('cakesGrid');
const cartButton = document.getElementById('cartButton');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');
const checkoutModal = document.getElementById('checkoutModal');
const modalClose = document.getElementById('modalClose');
const checkoutForm = document.getElementById('checkoutForm');
const checkoutItems = document.getElementById('checkoutItems');
const checkoutTotal = document.getElementById('checkoutTotal');
const successModal = document.getElementById('successModal');
const successClose = document.getElementById('successClose');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

// Initialize App
function init() {
    renderCakes();
    setupEventListeners();
    updateCartUI();
}

// Render Cakes
function renderCakes() {
    cakesGrid.innerHTML = cakes.map(cake => `
        <div class="cake-card" data-id="${cake.id}">
            <div class="cake-image-wrapper">
                <div class="cake-image" style="background-image: url('${cake.image}'); background-size: cover; background-position: center;"></div>
            </div>
            <div class="cake-info">
                <h3 class="cake-name">${cake.name}</h3>
                <p class="cake-description">${cake.description}</p>
                <div class="cake-footer">
                    <span class="cake-price">MYR ${cake.price.toFixed(2)}</span>
                    <button class="btn btn-primary btn-add-to-cart" data-id="${cake.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const cakeId = parseInt(button.getAttribute('data-id'));
            addToCart(cakeId);
        });
    });
}

// Add to Cart
function addToCart(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    const existingItem = cart.find(item => item.id === cakeId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...cake,
            quantity: 1
        });
    }

    updateCartUI();
    showCartSidebar();
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">MYR ${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">−</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                        <button class="btn-remove" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                const action = button.getAttribute('data-action');
                updateQuantity(itemId, action);
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = parseInt(button.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `MYR ${total.toFixed(2)}`;
}

// Update Quantity
function updateQuantity(itemId, action) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
    }

    updateCartUI();
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Show Cart Sidebar
function showCartSidebar() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

// Hide Cart Sidebar
function hideCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Show Checkout Modal
function showCheckoutModal() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Populate checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <span>MYR ${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');

    // Update checkout total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = `MYR ${total.toFixed(2)}`;

    checkoutModal.classList.add('active');
    hideCartSidebar();
}

// Hide Checkout Modal
function hideCheckoutModal() {
    checkoutModal.classList.remove('active');
    checkoutForm.reset();
}

// Show Success Modal
function showSuccessModal() {
    successModal.classList.add('active');
}

// Hide Success Modal
function hideSuccessModal() {
    successModal.classList.remove('active');
}

// Handle Checkout Form Submit
function handleCheckout(e) {
    e.preventDefault();
    
    // Here you would typically send the order to a server
    // For now, we'll just show a success message
    
    hideCheckoutModal();
    showSuccessModal();
    
    // Clear cart
    cart = [];
    updateCartUI();
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart button
    cartButton.addEventListener('click', showCartSidebar);
    
    // Cart close
    cartClose.addEventListener('click', hideCartSidebar);
    
    // Cart overlay
    cartOverlay.addEventListener('click', hideCartSidebar);
    
    // Checkout button
    checkoutButton.addEventListener('click', showCheckoutModal);
    
    // Modal close
    modalClose.addEventListener('click', hideCheckoutModal);
    
    // Checkout form
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Success close
    successClose.addEventListener('click', hideSuccessModal);
    
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
