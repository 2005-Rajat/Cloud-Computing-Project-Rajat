let cart = JSON.parse(localStorage.getItem('jaiveer_cart')) || [];
const container = document.getElementById('cart-items-container');
const subtotalEl = document.getElementById('subtotal');
const taxesEl = document.getElementById('taxes');
const totalEl = document.getElementById('total');
const modalAmountEl = document.getElementById('modal-amount');

function renderCart() {
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 0;">
        <i class="fa-solid fa-cart-arrow-down" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
        <p style="color: #888; font-size: 1.1rem;">Your cart is empty.</p>
        <a href="index.html" style="display: inline-block; margin-top: 20px; color: var(--primary); font-weight: 600; text-decoration: none;">Browse Menu</a>
      </div>
    `;
    updateTotals();
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.style = "display: flex; align-items: center; gap: 20px; padding: 20px 0; border-bottom: 1px solid #eee;";
    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 12px;">
      <div style="flex-grow: 1;">
        <h4 style="font-size: 1.1rem; color: var(--dark); margin-bottom: 5px;">${item.name}</h4>
        <p style="color: var(--primary); font-weight: 600;">₹${item.price}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 15px; background: #f9f9f9; padding: 8px 15px; border-radius: 30px;">
        <i class="fa-solid fa-minus" style="cursor: pointer; color: #888; font-size: 0.9rem;" onclick="updateQuantity(${index}, -1)"></i>
        <span style="font-weight: 600; color: var(--dark); width: 20px; text-align: center;">${item.quantity}</span>
        <i class="fa-solid fa-plus" style="cursor: pointer; color: #888; font-size: 0.9rem;" onclick="updateQuantity(${index}, 1)"></i>
      </div>
      <i class="fa-solid fa-trash" style="cursor: pointer; color: #ff4d4d; font-size: 1.2rem; padding: 10px;" onclick="removeItem(${index})"></i>
    `;
    container.appendChild(itemEl);
  });

  updateTotals();
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveAndRender();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('jaiveer_cart', JSON.stringify(cart));
  renderCart();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const total = subtotal + taxes;

  subtotalEl.innerText = `₹${subtotal}`;
  taxesEl.innerText = `₹${taxes}`;
  totalEl.innerText = `₹${total}`;
  modalAmountEl.innerText = `₹${total}`;
}

// Payment Modal Logic
const modal = document.getElementById('payment-modal');
const modalContent = document.getElementById('modal-content');
const qrSection = document.getElementById('qr-section');

function openPaymentModal() {
  if (cart.length === 0) return alert("Your cart is empty!");
  modal.style.display = 'flex';
  setTimeout(() => {
    modalContent.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
  }, 10);

  // Reset states
  qrSection.style.display = 'none';
  document.querySelectorAll('.pay-method-btn').forEach(btn => {
    btn.style.borderColor = '#eee';
    btn.style.background = 'transparent';
  });
}

function closePaymentModal() {
  modalContent.style.opacity = '0';
  modalContent.style.transform = 'scale(0.9)';
  setTimeout(() => modal.style.display = 'none', 300);
}

function selectPayment(method) {
  const btns = document.querySelectorAll('.pay-method-btn');
  btns.forEach(btn => {
    btn.style.borderColor = '#eee';
    btn.style.background = 'transparent';
  });

  if (method === 'qr') {
    btns[0].style.borderColor = 'var(--primary)';
    btns[0].style.background = '#fff8ef';
    qrSection.style.display = 'block';
  } else {
    btns[1].style.borderColor = '#28a745';
    btns[1].style.background = '#eafbf0';
    qrSection.style.display = 'none';

    // Simulate cash selection processing
    setTimeout(processOrder, 800);
  }
}

function processOrder() {
  closePaymentModal();

  // Show Success Modal
  setTimeout(() => {
    const successModal = document.getElementById('success-modal');
    const tokenEl = document.getElementById('token-number');

    // Generate Random Token Number (1 to 99)
    const token = Math.floor(Math.random() * 99) + 1;
    tokenEl.innerText = token.toString().padStart(2, '0');

    successModal.style.display = 'flex';

    // Clear cart
    localStorage.removeItem('jaiveer_cart');
    cart = [];
  }, 300);
}

// Init
renderCart();
