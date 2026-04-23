// 1. Hide Loader
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});

// 2. Scroll Reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1 });

// 3. Render Category Filters
let activeCategory = 'All';
function renderFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;
  container.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === activeCategory ? 'active' : ''}" onclick="filterMenu('${cat}')">${cat}</button>
  `).join('');
}

function filterMenu(cat) {
  activeCategory = cat;
  renderFilters();
  renderMenu();
}

// 4. Render Menu
function renderMenu() {
  const menuContainer = document.getElementById('menu-container');
  if (!menuContainer) return;
  const filtered = activeCategory === 'All' ? menuItems : menuItems.filter(i => i.category === activeCategory);
  menuContainer.innerHTML = '';
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card fade-up';
    card.innerHTML = `
      <div class="card-img-container">
        <img src="${item.img}" alt="${item.name}" loading="lazy">
        <span class="veg-badge"><i class="fa-solid fa-circle" style="color:#28a745; font-size:0.6rem;"></i></span>
      </div>
      <div class="card-info">
        <span class="badge">${item.tag}</span>
        <h3>${item.name}</h3>
        <p class="item-weight">${item.weight}</p>
        <p class="item-desc">${item.desc}</p>
        <div class="card-footer">
          <p class="price">₹${item.price}</p>
          <button class="btn-add" onclick="addToCart(${item.id})"><i class="fa-solid fa-plus"></i> Add</button>
        </div>
      </div>
    `;
    menuContainer.appendChild(card);
    observer.observe(card);
  });
}

// 5. Render Reviews
function renderReviews() {
  const container = document.getElementById('reviews-container');
  if (!container) return;
  container.innerHTML = reviews.map(r => `
    <div class="review-card fade-up">
      <div class="review-stars">${'<i class="fa-solid fa-star"></i>'.repeat(r.stars)}</div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.name.charAt(0)}</div>
        <div>
          <strong>${r.name}</strong>
          <span>${r.date}</span>
        </div>
      </div>
    </div>
  `).join('');
  container.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// 6. Cart Logic
let cart = JSON.parse(localStorage.getItem('jaiveer_cart')) || [];

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) el.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function addToCart(itemId) {
  const item = menuItems.find(i => i.id === itemId);
  if (!item) return;
  const existing = cart.find(i => i.id === itemId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem('jaiveer_cart', JSON.stringify(cart));
  updateCartCount();
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    cartIcon.style.transform = 'scale(1.3)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 300);
  }
  showToast(`Added ${item.name} to your order!`);
}

function toggleCart() {
  window.location.href = 'cart.html';
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
    Object.assign(toast.style, {
      position: 'fixed', bottom: '30px', right: '30px',
      background: 'var(--dark)', color: 'var(--white)',
      padding: '14px 24px', borderRadius: '10px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      fontFamily: "'Poppins', sans-serif", fontWeight: '500',
      zIndex: '10000', opacity: '0', transform: 'translateY(20px)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
      display: 'flex', alignItems: 'center', gap: '10px'
    });
  }
  toast.innerHTML = `<i class="fa-solid fa-bag-shopping" style="color:var(--primary)"></i> ${message}`;
  void toast.offsetWidth;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(20px)'; }, 3000);
}

// 7. Navbar scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Init
renderFilters();
renderMenu();
renderReviews();
updateCartCount();