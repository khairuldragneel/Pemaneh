// Product Data
const cakes = [
  {
    id: 1,
    name: 'Pandan Chiffon Cake',
    category: 'Pandan',
    price: 45,
    image: '',
    description: 'Light and fluffy pandan chiffon cake with the aromatic essence of pandan leaves. Vibrant green color and delicate sweetness.',
    ingredients: 'Pandan leaves, eggs, flour, sugar, oil, vanilla',
    rating: 4.8,
    reviews: 145
  },
  {
    id: 2,
    name: 'Durian Cheesecake',
    category: 'Durian',
    price: 65,
    image: '',
    description: 'Creamy durian cheesecake combining the rich king of fruits with smooth cheesecake texture',
    ingredients: 'Durian pulp, cream cheese, butter, graham cracker crust, eggs',
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: 'Chocolate Ganache Cake',
    category: 'Chocolate',
    price: 50,
    image: '',
    description: 'Dense and fudgy chocolate cake layered with rich chocolate ganache',
    ingredients: 'Dark chocolate, butter, eggs, flour, cocoa powder',
    rating: 4.9,
    reviews: 203
  },
  {
    id: 4,
    name: 'Butter Cake',
    category: 'Classic',
    price: 35,
    image: '',
    description: 'Simple yet timeless favorite with rich, buttery flavor and tender crumb',
    ingredients: 'Butter, eggs, flour, sugar, vanilla',
    rating: 4.7,
    reviews: 178
  },
  {
    id: 5,
    name: 'Mango Cheesecake',
    category: 'Cheesecake',
    price: 60,
    image: '',
    description: 'Fresh tropical mango combined with creamy cheesecake, perfect for summer',
    ingredients: 'Fresh mango, cream cheese, butter, eggs, graham crackers',
    rating: 4.8,
    reviews: 112
  },
  {
    id: 6,
    name: 'Red Velvet Cake',
    category: 'Classic',
    price: 48,
    image: '',
    description: 'Striking red velvet cake with mild cocoa flavor and luxurious cream cheese frosting',
    ingredients: 'Cocoa, buttermilk, cream cheese, butter, flour',
    rating: 4.7,
    reviews: 156
  },
  {
    id: 7,
    name: 'Pandan Cheesecake',
    category: 'Pandan',
    price: 55,
    image: '',
    description: 'Aromatic pandan blended with creamy cheesecake for a unique Malaysian twist',
    ingredients: 'Pandan leaves, cream cheese, butter, eggs, graham crackers',
    rating: 4.8,
    reviews: 134
  },
  {
    id: 8,
    name: 'Tiramisu Cake',
    category: 'Classic',
    price: 52,
    image: '',
    description: 'Coffee-flavored Italian classic with layers of sponge soaked in espresso and mascarpone',
    ingredients: 'Coffee, mascarpone cheese, eggs, sponge cake, cocoa powder',
    rating: 4.9,
    reviews: 201
  },
  {
    id: 9,
    name: 'Classic Carrot Cake',
    category: 'Classic',
    price: 42,
    image: '',
    description: 'Moist carrot cake with cream cheese frosting and a hint of spices',
    ingredients: 'Carrots, flour, eggs, cream cheese, walnuts',
    rating: 4.6,
    reviews: 98
  },
  {
    id: 10,
    name: 'Gula Melaka Layer Cake',
    category: 'Malaysian',
    price: 58,
    image: '',
    description: 'Traditional Malaysian layer cake with caramelized gula melaka and coconut',
    ingredients: 'Gula melaka, coconut milk, eggs, flour',
    rating: 4.7,
    reviews: 167
  },
  {
    id: 11,
    name: 'Strawberry Shortcake',
    category: 'Fruit',
    price: 50,
    image: '',
    description: 'Light sponge layered with fresh whipped cream and ripe strawberries',
    ingredients: 'Fresh strawberries, cream, flour, eggs, sugar',
    rating: 4.8,
    reviews: 143
  },
  {
    id: 12,
    name: 'Earl Grey Tea Cake',
    category: 'Classic',
    price: 46,
    image: '',
    description: 'Elegant tea cake infused with aromatic Earl Grey tea',
    ingredients: 'Earl Grey tea, flour, butter, eggs, sugar',
    rating: 4.7,
    reviews: 121
  }
];

const categories = [
  'All Cakes',
  'Pandan',
  'Durian',
  'Chocolate',
  'Cheesecake',
  'Classic',
  'Malaysian',
  'Fruit'
];

// Application State (using JavaScript variables instead of localStorage)
let cart = [];
let currentPage = 'home';
let selectedCategory = 'All Cakes';
let sortBy = 'default';
let searchQuery = '';
let selectedProduct = null;
let selectedSize = '8"';
let quantity = 1;

// Initialize App
function init() {
  setupNavigation();
  setupSearch();
  loadFeaturedCakes();
  loadCategories();
  loadProducts();
  setupSortFilter();
  updateCartCount();
  setupCheckoutForm();
  setupMinDeliveryDate();
}

// Navigation
function setupNavigation() {
  document.querySelectorAll('[data-page]').forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      const page = element.getAttribute('data-page');
      navigateTo(page);
    });
  });
}

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Remove active from nav links
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  
  // Show selected page
  const pageElement = document.getElementById(page + 'Page');
  if (pageElement) {
    pageElement.classList.add('active');
  }
  
  // Add active to nav link
  const navLink = document.querySelector(`.nav-link[data-page="${page}"]`);
  if (navLink) {
    navLink.classList.add('active');
  }
  
  currentPage = page;
  
  // Load page-specific content
  if (page === 'cart') {
    loadCart();
  } else if (page === 'checkout') {
    loadCheckout();
  }
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Search
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    loadProducts();
  });
}

// Featured Cakes
function loadFeaturedCakes() {
  const featuredContainer = document.getElementById('featuredCakes');
  const featured = [cakes[0], cakes[2], cakes[4], cakes[7]];
  
  featuredContainer.innerHTML = featured.map(cake => `
    <div class="product-card" onclick="viewProduct(${cake.id})">
      <div class="product-image"></div>
      <h3 class="product-name">${cake.name}</h3>
      <p class="product-description">${cake.description}</p>
      <div class="product-rating">
        <span>${cake.rating}</span>
        <span>(${cake.reviews} reviews)</span>
      </div>
      <div class="product-price">RM ${cake.price}</div>
      <button class="btn btn-primary add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${cake.id})">Add to Cart</button>
    </div>
  `).join('');
}

// Categories
function loadCategories() {
  const categoryContainer = document.getElementById('categoryFilters');
  categoryContainer.innerHTML = categories.map(cat => `
    <div class="filter-option ${cat === selectedCategory ? 'active' : ''}" onclick="selectCategory('${cat}')">
      ${cat}
    </div>
  `).join('');
}

function selectCategory(category) {
  selectedCategory = category;
  loadCategories();
  loadProducts();
}

// Products
function loadProducts() {
  const productsContainer = document.getElementById('productsGrid');
  let filteredCakes = [...cakes];
  
  // Apply category filter
  if (selectedCategory !== 'All Cakes') {
    filteredCakes = filteredCakes.filter(cake => cake.category === selectedCategory);
  }
  
  // Apply search filter
  if (searchQuery) {
    filteredCakes = filteredCakes.filter(cake => 
      cake.name.toLowerCase().includes(searchQuery) ||
      cake.description.toLowerCase().includes(searchQuery)
    );
  }
  
  // Apply sorting
  switch(sortBy) {
    case 'price-low':
      filteredCakes.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredCakes.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filteredCakes.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
      filteredCakes.sort((a, b) => b.reviews - a.reviews);
      break;
  }
  
  if (filteredCakes.length === 0) {
    productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No cakes found.</p>';
    return;
  }
  
  productsContainer.innerHTML = filteredCakes.map(cake => `
    <div class="product-card" onclick="viewProduct(${cake.id})">
      <div class="product-image"></div>
      <h3 class="product-name">${cake.name}</h3>
      <p class="product-description">${cake.description}</p>
      <div class="product-rating">
        <span>${cake.rating}</span>
        <span>(${cake.reviews} reviews)</span>
      </div>
      <div class="product-price">RM ${cake.price}</div>
      <button class="btn btn-primary add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${cake.id})">Add to Cart</button>
    </div>
  `).join('');
}

function setupSortFilter() {
  const sortSelect = document.getElementById('sortSelect');
  sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    loadProducts();
  });
}

// Product Detail
function viewProduct(id) {
  selectedProduct = cakes.find(cake => cake.id === id);
  if (!selectedProduct) return;
  
  selectedSize = '8"';
  quantity = 1;
  
  const productDetail = document.getElementById('productDetail');
  productDetail.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image"></div>
      <div class="product-detail-info">
        <h2>${selectedProduct.name}</h2>
        <div class="product-rating" style="font-size: 13px; color: var(--muji-text-light); margin-bottom: 16px;">
          <span>${selectedProduct.rating} — ${selectedProduct.reviews} reviews</span>
        </div>
        <div class="product-detail-price">RM ${selectedProduct.price}</div>
        <p class="product-detail-description">${selectedProduct.description}</p>
        
        <div class="product-ingredients">
          <h4>Ingredients:</h4>
          <p>${selectedProduct.ingredients}</p>
        </div>
        
        <div class="customization-section">
          <h4>Select Size:</h4>
          <div class="size-options">
            <button class="size-btn active" onclick="selectSize('6\"')">6"</button>
            <button class="size-btn" onclick="selectSize('8\"')">8"</button>
            <button class="size-btn" onclick="selectSize('10\"')">10"</button>
          </div>
        </div>
        
        <div class="customization-section">
          <h4>Special Requests:</h4>
          <textarea class="form-control" id="specialRequests" placeholder="Enter any special requests or customizations..." rows="3"></textarea>
        </div>
        
        <div class="customization-section">
          <h4>Quantity:</h4>
          <div class="quantity-selector">
            <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
            <span class="quantity-value" id="quantityValue">1</span>
            <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-primary" onclick="addToCartWithDetails()">Add to Cart</button>
          <button class="btn btn-secondary" onclick="buyNow()">Buy Now</button>
        </div>
        
        <div class="reviews-section">
          <h3>Customer Reviews</h3>
          <p>"Absolutely delicious! The cake was fresh and flavorful." — Sarah L.</p>
          <p>"Perfect for our celebration. Highly recommend!" — Ahmad M.</p>
          <p>"Great taste and texture. Will order again!" — Priya K.</p>
        </div>
      </div>
    </div>
  `;
  
  navigateTo('product');
}

function selectSize(size) {
  selectedSize = size;
  document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function updateQuantity(change) {
  quantity = Math.max(1, quantity + change);
  document.getElementById('quantityValue').textContent = quantity;
}

function addToCartWithDetails() {
  if (!selectedProduct) return;
  
  const specialRequests = document.getElementById('specialRequests')?.value || '';
  
  const cartItem = {
    id: Date.now(),
    productId: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    image: selectedProduct.image,
    size: selectedSize,
    quantity: quantity,
    specialRequests: specialRequests
  };
  
  cart.push(cartItem);
  updateCartCount();
  alert(`${selectedProduct.name} added to cart!`);
}

function buyNow() {
  addToCartWithDetails();
  navigateTo('cart');
}

// Simple Add to Cart
function addToCart(id) {
  const cake = cakes.find(c => c.id === id);
  if (!cake) return;
  
  const cartItem = {
    id: Date.now(),
    productId: cake.id,
    name: cake.name,
    price: cake.price,
    image: cake.image,
    size: '8"',
    quantity: 1,
    specialRequests: ''
  };
  
  cart.push(cartItem);
  updateCartCount();
  alert(`${cake.name} added to cart!`);
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.cart-count').textContent = totalItems;
}

// Cart
function loadCart() {
  const cartContent = document.getElementById('cartContent');
  
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty</p>
        <button class="btn btn-primary" data-page="shop">Start Shopping</button>
      </div>
    `;
    setupNavigation();
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;
  
  cartContent.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map((item, index) => `
          <div class="cart-item">
            <div class="cart-item-image"></div>
            <div class="cart-item-details">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-size">Size: ${item.size}</p>
              ${item.specialRequests ? `<p class="cart-item-size">Special: ${item.specialRequests}</p>` : ''}
              <p class="cart-item-price">RM ${item.price}</p>
            </div>
            <div class="cart-item-actions">
              <div class="quantity-selector">
                <button class="quantity-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
              </div>
              <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>RM ${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
          <span>Delivery Fee:</span>
          <span>RM ${deliveryFee.toFixed(2)}</span>
        </div>
        <div class="promo-input">
          <input type="text" class="form-control" placeholder="Promo code">
          <button class="btn btn-secondary">Apply</button>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>RM ${total.toFixed(2)}</span>
        </div>
        <button class="btn btn-primary" style="width: 100%;" onclick="navigateTo('checkout')">Proceed to Checkout</button>
      </div>
    </div>
  `;
}

function updateCartQuantity(index, change) {
  if (cart[index]) {
    cart[index].quantity = Math.max(1, cart[index].quantity + change);
    updateCartCount();
    loadCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  loadCart();
}

// Checkout
function loadCheckout() {
  if (cart.length === 0) {
    navigateTo('cart');
    return;
  }
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;
  
  const checkoutSummary = document.getElementById('checkoutSummary');
  checkoutSummary.innerHTML = `
    <h3>Order Summary</h3>
    ${cart.map(item => `
      <div class="summary-item">
        <span>${item.name} (${item.size}) x${item.quantity}</span>
        <span>RM ${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('')}
    <div class="summary-row">
      <span>Subtotal:</span>
      <span>RM ${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row">
      <span>Delivery Fee:</span>
      <span>RM ${deliveryFee.toFixed(2)}</span>
    </div>
    <div class="summary-row total">
      <span>Total:</span>
      <span>RM ${total.toFixed(2)}</span>
    </div>
    <button class="btn btn-primary" style="width: 100%; margin-top: 16px;" onclick="placeOrder()">Place Order</button>
  `;
}

function setupCheckoutForm() {
  // Form will be validated when placing order
}

function setupMinDeliveryDate() {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  const minDate = today.toISOString().split('T')[0];
  
  const deliveryDateInput = document.getElementById('deliveryDate');
  if (deliveryDateInput) {
    deliveryDateInput.min = minDate;
  }
}

function placeOrder() {
  const form = document.getElementById('checkoutForm');
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  
  const customerName = document.getElementById('customerName').value;
  const customerEmail = document.getElementById('customerEmail').value;
  const customerPhone = document.getElementById('customerPhone').value;
  const customerAddress = document.getElementById('customerAddress').value;
  const deliveryDate = document.getElementById('deliveryDate').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  
  const orderNumber = 'KM' + Date.now();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const total = subtotal + deliveryFee;
  
  // Store order details temporarily
  const orderDetails = {
    orderNumber,
    customerName,
    customerEmail,
    customerPhone,
    customerAddress,
    deliveryDate,
    paymentMethod,
    items: [...cart],
    total
  };
  
  // Clear cart
  cart = [];
  updateCartCount();
  
  // Show confirmation
  showOrderConfirmation(orderDetails);
}

function showOrderConfirmation(orderDetails) {
  const confirmationContent = document.getElementById('confirmationContent');
  
  const deliveryDateFormatted = new Date(orderDetails.deliveryDate).toLocaleDateString('en-MY', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  confirmationContent.innerHTML = `
    <div class="confirmation-icon">✓</div>
    <h2>Thank You for Your Order!</h2>
    <p class="order-number">Order Number: <strong>${orderDetails.orderNumber}</strong></p>
    
    <div class="order-details">
      <h3>Order Details</h3>
      ${orderDetails.items.map(item => `
        <p>${item.name} (${item.size}) x${item.quantity} - RM ${(item.price * item.quantity).toFixed(2)}</p>
      `).join('')}
      <p style="margin-top: 16px;"><strong>Total Amount: RM ${orderDetails.total.toFixed(2)}</strong></p>
      <p style="margin-top: 16px;"><strong>Delivery Date:</strong> ${deliveryDateFormatted}</p>
      <p><strong>Delivery Address:</strong> ${orderDetails.customerAddress}</p>
      <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod === 'card' ? 'Credit/Debit Card' : orderDetails.paymentMethod === 'online' ? 'Online Banking' : 'Cash on Delivery'}</p>
    </div>
    
    <p style="margin: 24px 0;">A confirmation email has been sent to <strong>${orderDetails.customerEmail}</strong></p>
    <p style="color: var(--color-text-secondary);">Your order will be delivered on ${deliveryDateFormatted}. We'll contact you at ${orderDetails.customerPhone} if there are any updates.</p>
    
    <button class="btn btn-primary" style="margin-top: 24px;" data-page="shop">Continue Shopping</button>
  `;
  
  navigateTo('confirmation');
  setupNavigation();
}

// Initialize app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}