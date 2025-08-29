function updateTotal() {
  let total = 0;
  document.querySelectorAll('.item-price').forEach(price => {
    total += parseInt(price.textContent.replace(/\D/g, '')) || 0;
  });
  document.getElementById('total-price').textContent = `Rp${total.toLocaleString('id-ID')}`;
}

function renderCart() {
  const cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  cart.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-details">
        <h3>${item.name}</h3>
        <div class="quantity">
          <button class="minus">−</button>
          <span class="qty">${item.quantity}</span>
          <button class="plus">+</button>
        </div>
        <p class="item-price" data-price="${item.price}">
          Rp${(item.price * item.quantity).toLocaleString('id-ID')}
        </p>
        <button class="remove-item">Hapus</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  setupCartEvents();
  updateTotal();
}

function setupCartEvents() {
  // Tambah qty
  document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', () => {
      const qtySpan = button.previousElementSibling;
      let qty = parseInt(qtySpan.textContent);
      qty++;
      qtySpan.textContent = qty;

      const itemPrice = button.parentElement.nextElementSibling;
      const basePrice = parseInt(itemPrice.getAttribute('data-price'));
      itemPrice.textContent = `Rp${(basePrice * qty).toLocaleString('id-ID')}`;

      // Update di localStorage
      const itemName = button.closest('.cart-item').querySelector('h3').textContent;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const target = cart.find(i => i.name === itemName);
      if (target) target.quantity = qty;
      localStorage.setItem('cart', JSON.stringify(cart));

      updateTotal();
    });
  });

  // Kurangi qty
  document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', () => {
      const qtySpan = button.nextElementSibling;
      let qty = parseInt(qtySpan.textContent);
      if (qty > 1) {
        qty--;
        qtySpan.textContent = qty;

        const itemPrice = button.parentElement.nextElementSibling;
        const basePrice = parseInt(itemPrice.getAttribute('data-price'));
        itemPrice.textContent = `Rp${(basePrice * qty).toLocaleString('id-ID')}`;

        // Update di localStorage
        const itemName = button.closest('.cart-item').querySelector('h3').textContent;
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const target = cart.find(i => i.name === itemName);
        if (target) target.quantity = qty;
        localStorage.setItem('cart', JSON.stringify(cart));

        updateTotal();
      }
    });
  });

  // Hapus item
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', () => {
      const itemElement = button.closest('.cart-item');
      const itemName = itemElement.querySelector('h3').textContent;

      // Hapus dari localStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => item.name !== itemName);
      localStorage.setItem('cart', JSON.stringify(cart));

      // Hapus dari tampilan
      itemElement.remove();
      updateTotal();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "login.html";
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    const paymentMethod = document.getElementById("payment-method").value;
    const items = cart.map(item => ({
      product: item.name,
      quantity: item.quantity,
      price: item.price
    }));
    const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    try {
      const res = await fetch("http://localhost:5000/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ items, total, paymentMethod })
      });

      const data = await res.json();
      if (res.ok) {
        // ✅ Tandai pesanan sebagai sudah dibayar
        const markRes = await fetch(`http://localhost:5000/api/purchases/${data.purchaseId}/pay`, {
          method: "PUT",
          headers: { Authorization: token }
        });

        const markData = await markRes.json();
        if (markRes.ok) {
          alert("Pembayaran berhasil!");
          localStorage.removeItem("cart");
          form.reset();
          document.querySelector(".cart-items").innerHTML = "";
          updateTotal();
          window.location.href = "home.html";
        } else {
          alert("Pesanan disimpan, tapi gagal menandai sebagai dibayar.");
        }
      } else {
        alert("Gagal menyimpan pesanan: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghubungi server.");
    }
  });
});
