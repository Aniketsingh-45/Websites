/* ══════════════════════════════════
   LOOTO – shop.js  (by Aniket Singh)
══════════════════════════════════ */

// ── Products ──
const products = [
    {
        id: 1,
        title: "Royal Banarasi Pure Silk Saree",
        price: 3599.00,
        originalPrice: 7999.00,
        rating: 4.9,
        reviews: 3280,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Best Seller"
    },
    {
        id: 2,
        title: "Men's Royal Embroidered Sherwani",
        price: 4999.00,
        originalPrice: 8999.00,
        rating: 4.8,
        reviews: 1450,
        image: "https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Royal Pick"
    },
    {
        id: 3,
        title: "24K Gold Kundan Bridal Choker Set",
        price: 2499.00,
        originalPrice: 4999.00,
        rating: 4.9,
        reviews: 2190,
        image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Sale -50%"
    },
    {
        id: 4,
        title: "Handcrafted Brass Diya Set (Pack of 4)",
        price: 599.00,
        originalPrice: 1199.00,
        rating: 4.7,
        reviews: 4120,
        image: "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Festive"
    },
    {
        id: 5,
        title: "Pure Ayurvedic Kumkumadi Tailam",
        price: 799.00,
        originalPrice: 1499.00,
        rating: 4.8,
        reviews: 1670,
        image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "100% Vedic"
    },
    {
        id: 6,
        title: "Hand-Painted Terracotta Flower Vase",
        price: 849.00,
        originalPrice: 1599.00,
        rating: 4.6,
        reviews: 1560,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Artisan"
    },
    {
        id: 7,
        title: "Rajasthani Hand-Embroidered Mojari",
        price: 899.00,
        originalPrice: 1899.00,
        rating: 4.8,
        reviews: 2040,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Handmade"
    },
    {
        id: 8,
        title: "Jaipur Hand-Block Print Dohar & Quilt",
        price: 1299.00,
        originalPrice: 2499.00,
        rating: 4.9,
        reviews: 3400,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&q=80&w=400&h=500",
        badge: "Heritage"
    }
];

let cart = [];

// ── DOM References ──
const productGrid    = document.getElementById('productGrid');
const cartBtn        = document.getElementById('cartBtn');
const closeCartBtn   = document.getElementById('closeCart');
const cartSidebar    = document.getElementById('cartSidebar');
const cartOverlay    = document.getElementById('cartOverlay');
const cartItemsCont  = document.getElementById('cartItems');
const cartBadge      = document.getElementById('cartBadge');
const cartTotalVal   = document.getElementById('cartTotalValue');
const toast          = document.getElementById('toast');
const toastMsg       = document.querySelector('.toast-msg');
const cursorDot      = document.getElementById('cursorDot');
const cursorRing     = document.getElementById('cursorRing');

// ── Init ──
function init() {
    renderProducts();
    loadCart();
    setupEventListeners();
    setupCursor();
    setupNavbarScroll();
    observeAnimations();
}

// ── Custom Cursor ──
function setupCursor() {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left  = e.clientX + 'px';
        cursorDot.style.top   = e.clientY + 'px';
        setTimeout(() => {
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top  = e.clientY + 'px';
        }, 60);
    });

    document.querySelectorAll('button, a, .category-item, .product-card, .saree-card, .jewel-card, .puja-card, .craft-card, .men-card, .fw-card, .feature-card, .tilt-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// ── Navbar Scroll Effect ──
function setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(4,6,14,0.9)';
        } else {
            navbar.style.background = 'rgba(8,12,24,0.75)';
        }
    });
}

// ── Scroll Reveal ──
function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.collection-section, .feature-card, .saree-card, .men-card, .craft-card, .puja-card, .jewel-card, .fw-card, .decor-card, .product-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ── Render Products ──
function renderProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const el = document.createElement('div');
        el.className = 'product-card tilt-card';

        const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
        const starsHtml = generateStars(product.rating);
        const discount  = Math.round((1 - product.price / product.originalPrice) * 100);

        el.innerHTML = `
            <div class="product-img-wrapper">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=500&h=600'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">
                    ${starsHtml}
                    <span>(${product.reviews.toLocaleString()})</span>
                </div>
                <div class="product-price">
                    ₹${product.price.toLocaleString()}
                    <del>₹${product.originalPrice.toLocaleString()}</del>
                    <small style="color:var(--emerald);font-size:0.78rem;margin-left:0.4rem;">${discount}% off</small>
                </div>
                <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(el);
    });

    // Add-to-cart listeners
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
            const card = e.target.closest('.product-card');
            card.style.transform = 'scale(0.97)';
            setTimeout(() => card.style.transform = '', 180);
        });
    });

    // 3D Tilt on all .tilt-card elements
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r   = card.getBoundingClientRect();
            const x   = e.clientX - r.left;
            const y   = e.clientY - r.top;
            const cx  = r.width / 2;
            const cy  = r.height / 2;
            const rx  = ((y - cy) / cy) * -12;
            const ry  = ((x - cx) / cx) * 12;
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
    });

    // Update cursor ring listeners for new cards
    document.querySelectorAll('.tilt-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// ── Search ──
function executeSearch() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) { renderProducts(); return; }
    const filtered = products.filter(p => p.title.toLowerCase().includes(q) || (p.badge && p.badge.toLowerCase().includes(q)));
    productGrid.innerHTML = '';
    if (!filtered.length) {
        productGrid.innerHTML = '<p style="color:var(--text-muted);padding:2rem;text-align:center;grid-column:1/-1;font-size:1.1rem;"><i class="fas fa-search" style="margin-right:8px;color:var(--saffron);"></i>No matching products found. Try searching for Sarees, Sherwanis, Diyas, Kundan, or Mojaris.</p>';
    } else {
        renderFilteredProducts(filtered);
    }
}

document.getElementById('searchBtn')?.addEventListener('click', executeSearch);
document.getElementById('searchInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        executeSearch();
    }
});
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    if (e.target.value.trim() === '') {
        renderProducts();
    }
});

function renderFilteredProducts(list) {
    productGrid.innerHTML = '';
    list.forEach(product => {
        const el = document.createElement('div');
        el.className = 'product-card tilt-card';
        const badgeHtml = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
        const starsHtml = generateStars(product.rating);
        const discount  = Math.round((1 - product.price / product.originalPrice) * 100);
        el.innerHTML = `
            <div class="product-img-wrapper">
                ${badgeHtml}
                <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=500&h=600'">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-rating">${starsHtml}<span>(${product.reviews.toLocaleString()})</span></div>
                <div class="product-price">₹${product.price.toLocaleString()} <del>₹${product.originalPrice.toLocaleString()}</del> <small style="color:var(--emerald);">${discount}% off</small></div>
                <button class="btn-add-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(el);
    });

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
            const card = e.target.closest('.product-card');
            if (card) {
                card.style.transform = 'scale(0.97)';
                setTimeout(() => card.style.transform = '', 180);
            }
        });
    });

    // 3D Tilt for filtered cards
    productGrid.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r   = card.getBoundingClientRect();
            const x   = e.clientX - r.left;
            const y   = e.clientY - r.top;
            const cx  = r.width / 2;
            const cy  = r.height / 2;
            const rx  = ((y - cy) / cy) * -12;
            const ry  = ((x - cx) / cx) * 12;
            card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
        });
        card.addEventListener('mouseenter', () => cursorRing?.classList.add('hover'));
        card.addEventListener('mouseleave', () => cursorRing?.classList.remove('hover'));
    });

    document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth' });
}

// ── Event Listeners ──
function setupEventListeners() {
    cartBtn.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
}

// ── Cart Open/Close ──
function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ── Add / Remove / Update ──
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const existing = cart.find(i => i.id === id);
    if (existing) existing.quantity += 1;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    updateCartUI();
    showToast(`${product.title.slice(0, 28)}... added!`);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart(); updateCartUI();
}

function updateQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) removeFromCart(id);
    else { saveCart(); updateCartUI(); }
}

// ── Render Cart UI ──
function updateCartUI() {
    const total = cart.reduce((s, i) => s + i.quantity, 0);
    cartBadge.textContent = total;

    if (!cart.length) {
        cartItemsCont.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>`;
    } else {
        cartItemsCont.innerHTML = '';
        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                    <div class="cart-item-actions">
                        <div class="quantity-controls">
                            <button class="qty-btn minus" data-id="${item.id}">−</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn plus" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsCont.appendChild(el);
        });

        cartItemsCont.querySelectorAll('.qty-btn.minus').forEach(b => b.addEventListener('click', e => updateQuantity(+e.target.dataset.id, -1)));
        cartItemsCont.querySelectorAll('.qty-btn.plus').forEach(b => b.addEventListener('click', e => updateQuantity(+e.target.dataset.id, 1)));
        cartItemsCont.querySelectorAll('.remove-item').forEach(b => b.addEventListener('click', e => removeFromCart(+e.target.dataset.id)));
    }

    const value = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
    cartTotalVal.textContent = `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

// ── Persistence ──
function saveCart() { localStorage.setItem('looto_cart', JSON.stringify(cart)); }
function loadCart() {
    const saved = localStorage.getItem('looto_cart');
    if (saved) { cart = JSON.parse(saved); updateCartUI(); }
}

// ── Toast ──
function showToast(msg = 'Added to cart!') {
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ── Run ──
init();
