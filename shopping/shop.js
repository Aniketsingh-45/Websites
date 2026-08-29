const products = [
    {
        id: 1,
        title: "Banarasi Silk Saree - Royal Blue",
        price: 3599.00,
        originalPrice: 5999.00,
        rating: 4.8,
        reviews: 1280,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6153c?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Best Seller"
    },
    {
        id: 2,
        title: "Men's Embroidered Kurta Set",
        price: 1999.00,
        originalPrice: 3499.00,
        rating: 4.7,
        reviews: 850,
        image: "https://images.unsplash.com/photo-1599557451433-87d3e0db787f?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "New Utsav"
    },
    {
        id: 3,
        title: "Kundan & Pearl Choker Set",
        price: 1299.00,
        originalPrice: 2499.00,
        rating: 4.9,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400&h=500",
        badge: ""
    },
    {
        id: 4,
        title: "Handcrafted Brass Urli / Diya",
        price: 899.00,
        originalPrice: 1499.00,
        rating: 4.6,
        reviews: 412,
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Sale -40%"
    },
    {
        id: 5,
        title: "Ayurvedic Kumkumadi Tailam",
        price: 649.00,
        originalPrice: 999.00,
        rating: 4.8,
        reviews: 1670,
        image: "https://images.unsplash.com/photo-1595874287819-216a7f058145?auto=format&fit=crop&q=80&w=400&h=500",
        badge: ""
    },
    {
        id: 6,
        title: "Women's Bandhani Print Kurti",
        price: 799.00,
        originalPrice: 1599.00,
        rating: 4.5,
        reviews: 2560,
        image: "https://images.unsplash.com/photo-1583391733958-650fac5ebf7f?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Trending"
    },
    {
        id: 7,
        title: "Rajasthani Mojari Footwear",
        price: 599.00,
        originalPrice: 1299.00,
        rating: 4.4,
        reviews: 340,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=400&h=500",
        badge: ""
    },
    {
        id: 8,
        title: "Terracotta Handpainted Pots",
        price: 1199.00,
        originalPrice: 1999.00,
        rating: 4.9,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1599643478514-4a820c56a8e4?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Artisan Made"
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItems');
const cartBadge = document.getElementById('cartBadge');
const cartTotalValue = document.getElementById('cartTotalValue');
const toast = document.getElementById('toast');

// Initialize
function init() {
    renderProducts();
    loadCart();
    setupEventListeners();
}

// Render Products
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-card';
        
        let badgeHtml = '';
        if (product.badge) {
            badgeHtml = `<span class="product-badge">${product.badge}</span>`;
        }

        let starsHtml = '';
        for(let i = 1; i <= 5; i++) {
            if(i <= Math.floor(product.rating)) {
                starsHtml += '<i class="fas fa-star"></i>';
            } else if(i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }

        productEl.innerHTML = `
            <div class="product-img-wrapper">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.title}" class="product-img">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    ${starsHtml}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    ₹${product.price.toFixed(2)} <del>₹${product.originalPrice.toFixed(2)}</del>
                </div>
                <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productEl);
    });

    // Add event listeners to newly created buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            // Trigger a mini animation on the card
            const card = e.target.closest('.product-card');
            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = '', 150);
        });
    });

    // 3D Tilt Effect logic
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
            const rotateY = ((x - centerX) / centerX) * 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });
}

// Setup Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });

    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

// Open/Close Cart
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

// Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;

    // Update Items List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-message">Your cart is empty.</div>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">₹${item.price.toFixed(2)}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="qty-btn minus" data-id="${item.id}">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        // Add event listeners for cart item buttons
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => updateQuantity(parseInt(e.target.getAttribute('data-id')), -1));
        });
        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => updateQuantity(parseInt(e.target.getAttribute('data-id')), 1));
        });
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => removeFromCart(parseInt(e.target.getAttribute('data-id'))));
        });
    }

    // Update Total
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalValue.textContent = `₹${totalValue.toFixed(2)}`;
}

// Local Storage
function saveCart() {
    localStorage.setItem('looto_cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('looto_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Toast Notification
function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Run init
init();
