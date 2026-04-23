let cart = JSON.parse(localStorage.getItem('jaiveer_cart')) || [];
const container = document.getElementById('cart-items-container');
const subtotalEl = document.getElementById('subtotal');
const taxesEl = document.getElementById('taxes');
const totalEl = document.getElementById('total');
const modalAmountEl = document.getElementById('modal-amount');
const qrAmountLabel = document.getElementById('qr-amount-label');

function getTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxes = Math.round(subtotal * 0.05);
  return { subtotal, taxes, total: subtotal + taxes };
}

function renderCart() {
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:50px 0;">
        <i class="fa-solid fa-cart-arrow-down" style="font-size:3.5rem;color:#ddd;margin-bottom:20px;display:block;"></i>
        <p style="color:#888;font-size:1.1rem;margin-bottom:20px;">Your cart is empty.</p>
        <a href="index.html" style="background:var(--primary);color:white;padding:12px 28px;border-radius:30px;text-decoration:none;font-weight:600;">Browse Menu</a>
      </div>`;
    updateTotals();
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="cart-item-weight">${item.weight || ''}</p>
        <p style="color:var(--primary);font-weight:600;">₹${item.price} × ${item.quantity} = <strong>₹${item.price * item.quantity}</strong></p>
      </div>
      <div class="qty-control">
        <button onclick="updateQuantity(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
        <span>${item.quantity}</span>
        <button onclick="updateQuantity(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
      </div>
      <button class="remove-btn" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
    `;
    container.appendChild(itemEl);
  });
  updateTotals();
}

function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
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
  const { subtotal, taxes, total } = getTotal();
  subtotalEl.innerText = `₹${subtotal}`;
  taxesEl.innerText = `₹${taxes}`;
  totalEl.innerText = `₹${total}`;
  if (modalAmountEl) modalAmountEl.innerText = `₹${total}`;
  if (qrAmountLabel) qrAmountLabel.innerText = `₹${total}`;
  // Update QR image with actual amount
  const qrImg = document.getElementById('qr-img');
  if (qrImg) {
    const upiData = encodeURIComponent(`upi://pay?pa=jaiveer@upi&pn=Jaiveer%20Di%20Hatti&cu=INR&am=${total}`);
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${upiData}`;
  }
}

// ===== PAYMENT MODAL =====
const modal = document.getElementById('payment-modal');
const modalContent = document.getElementById('modal-content');

function openPaymentModal() {
  if (cart.length === 0) return alert('Your cart is empty!');
  const { total } = getTotal();
  if (modalAmountEl) modalAmountEl.innerText = `₹${total}`;
  if (qrAmountLabel) qrAmountLabel.innerText = `₹${total}`;
  modal.style.display = 'flex';
  setTimeout(() => {
    modalContent.style.opacity = '1';
    modalContent.style.transform = 'scale(1)';
  }, 10);
  showStep('method');
}

function closePaymentModal() {
  modalContent.style.opacity = '0';
  modalContent.style.transform = 'scale(0.9)';
  setTimeout(() => modal.style.display = 'none', 300);
}

function showStep(step) {
  document.getElementById('step-method').style.display = step === 'method' ? 'block' : 'none';
  document.getElementById('step-qr').style.display = step === 'qr' ? 'block' : 'none';
  // Refresh QR with correct amount when showing QR step
  if (step === 'qr') {
    const { total } = getTotal();
    const qrImg = document.getElementById('qr-img');
    const upiData = encodeURIComponent(`upi://pay?pa=jaiveer@upi&pn=Jaiveer%20Di%20Hatti&cu=INR&am=${total}`);
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${upiData}`;
  }
}

function openUPIApp(app) {
  const { total } = getTotal();
  const upiId = 'jaiveer@upi';
  const name = 'Jaiveer Di Hatti';
  const note = 'Food Order';

  const urls = {
    gpay: `tez://upi/pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR&tn=${encodeURIComponent(note)}`,
    phonepe: `phonepe://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`,
    paytm: `paytmmp://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`,
    bhim: `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR&tn=${encodeURIComponent(note)}`
  };

  // Try to open app; fall back to QR
  const link = document.createElement('a');
  link.href = urls[app] || urls.bhim;
  link.click();

  // Show confirmation prompt after short delay (app may open)
  setTimeout(() => {
    if (confirm(`Did you complete your payment of ₹${total} on ${app === 'gpay' ? 'Google Pay' : app === 'phonepe' ? 'PhonePe' : app === 'paytm' ? 'Paytm' : 'BHIM'}?`)) {
      processOrder();
    }
  }, 2000);
}

function selectPayment(method) {
  if (method === 'cash') {
    setTimeout(processOrder, 500);
  }
}

function processOrder() {
  const orderItems = [...cart];
  closePaymentModal();
  setTimeout(() => {
    const successModal = document.getElementById('success-modal');
    const tokenEl = document.getElementById('token-number');
    const token = Math.floor(Math.random() * 99) + 1;
    tokenEl.innerText = token.toString().padStart(2, '0');

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('order-time').innerText = `Order placed at ${timeStr}`;

    // Show order summary in success screen
    const itemsEl = document.getElementById('success-items');
    if (itemsEl) {
      itemsEl.innerHTML = `<div class="success-order-list">${orderItems.map(i => `<span>${i.name} × ${i.quantity}</span>`).join('')}</div>`;
    }

    successModal.style.display = 'flex';
    localStorage.removeItem('jaiveer_cart');
    cart = [];
  }, 300);
}

// Close modal on overlay click
modal.addEventListener('click', (e) => {
  if (e.target === modal) closePaymentModal();
});

// Init
renderCart();