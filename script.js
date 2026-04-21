// 1. Hide Loader
window.addEventListener('load', () => {
  document.getElementById('loader').style.display = 'none';
});

// 2. Render Menu Professionally
const menuContainer = document.getElementById('menu-container');

function renderMenu() {
  menuItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card fade-up';
    card.innerHTML = `
      <div class="card-img-container">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="card-info">
        <span class="badge">${item.tag}</span>
        <h3>${item.name}</h3>
        <p class="price">₹${item.price}</p>
        <button class="btn-add" onclick="addToCart(${item.id})">Add to Order</button>
      </div>
    `;
    menuContainer.appendChild(card);
  });
}

// 3. Scroll Reveal Animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

// 4. Cart Logic
// 4. Cart Logic
let cart = JSON.parse(localStorage.getItem('jaiveer_cart')) || [];

function updateCartCount() {
  const cartElement = document.getElementById('cart-count');
  if(cartElement) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartElement.innerText = totalItems;
  }
}

function addToCart(itemId) {
  // Find item in menu
  const item = menuItems.find(i => i.id === itemId);
  if(!item) return;

  // Check if already in cart
  const existingItem = cart.find(i => i.id === itemId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  // Save to local storage
  localStorage.setItem('jaiveer_cart', JSON.stringify(cart));
  
  updateCartCount();
  
  // Animate the cart icon
  const cartIcon = document.querySelector('.cart-icon');
  if(cartIcon) {
    cartIcon.style.transform = 'scale(1.3)';
    setTimeout(() => cartIcon.style.transform = 'scale(1)', 300);
  }

  // Professional Toast Notification
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
    
    // Add toast styles dynamically
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.background = 'var(--dark)';
    toast.style.color = 'var(--white)';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    toast.style.fontFamily = "'Poppins', sans-serif";
    toast.style.fontWeight = '500';
    toast.style.zIndex = '10000';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
  }
  
  toast.innerText = message;
  
  // Trigger reflow for animation
  void toast.offsetWidth;
  
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3000);
}

// 5. Navbar Change on Scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 100) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Initialize
renderMenu();
updateCartCount();
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));