/* =====================================================
   CLOCOURT main.js: all site functionality
   Sections: 1 Helpers | 2 Cart | 3 Header/Footer | 4 Pages | 5 Start
   ===================================================== */

/* ---------- 1. HELPERS ---------- */
const $ = (sel) => document.querySelector(sel);
const money = (n) => "Rs " + Number(n).toLocaleString("en-PK");           // 3500 -> "Rs 3,500"
const byId = (id) => PRODUCTS.find((p) => String(p.id) === String(id));
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function toast(msg) {                                // Small confirmation message
  const t = document.createElement("div");
  t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

/* ---------- 2. CART (saved in localStorage so it survives refresh) ---------- */
const CART_KEY = "clocourt_cart";
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { return []; } }
function saveCart(cart) { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} updateBadge(); }
function addToCart(id, size, colour, qty) {
  const cart = getCart();
  const same = cart.find((i) => i.id == id && i.size == size && i.colour == colour);
  if (same) same.qty += qty; else cart.push({ id, size, colour, qty });
  saveCart(cart);
}
function cartTotal() { return getCart().reduce((sum, i) => sum + (byId(i.id) ? byId(i.id).price * i.qty : 0), 0); }
function updateBadge() {
  const n = getCart().reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll(".cart-count").forEach((el) => { el.textContent = n; el.hidden = !n; });
}

/* ---------- 3. HEADER, FOOTER, WHATSAPP BUTTON ---------- */
function buildLayout() {
  const links = [["index.html", "Home"], ["shop.html", "Shop"], ["about.html", "About"], ["contact.html", "Contact"]];
  const nav = links.map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
  $("#site-header").innerHTML = `
    <div class="banner">${CONFIG.banner}</div>
    <header class="site-header">

<a class="logo" href="index.html" aria-label="CloCourt home"><span style="color: #D4AF77;">Clo</span><span style="color: #000000;">Court</span></a>
      <nav class="nav" id="nav" aria-label="Main">${nav}</nav>
      <a class="cart-link" href="cart.html">Cart <span class="cart-count" hidden>0</span></a>
      <button class="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
    </header>`;
  $("#site-footer").innerHTML = `
    <footer class="site-footer"><div class="wrap">
      <div><h3>CloCourt</h3><p>Impression that stays.</p></div>
      <div><h3>Contact</h3>
        <a href="${waLink("Hello CloCourt")}" target="_blank" rel="noopener">WhatsApp</a><br>
        <a href="tel:${CONFIG.phone.replace(/[^+\d]/g, "")}">${CONFIG.phone}</a><br>
        <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></div>
    </div><div class="wrap"><p class="copy">© ${new Date().getFullYear()} CloCourt. All prices in PKR.</p></div></footer>
    <a class="wa-float" href="${waLink("Hello CloCourt, I have a question.")}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.800 1.2-.5.1-1 .2-3.2-.7-2.700-1.1-4.400-3.800-4.500-4-.1-.2-1.1-1.400-1.1-2.700s.7-1.900.9-2.200c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.2.1.3 0 .5l-.3.400-.4.400c-.1.2-.3.300-.1.600.2.300.8 1.3 1.700 2.1 1.2 1 2.1 1.3 2.400 1.500.3.1.4.1.6-.1l.8-1c.2-.3.400-.2.600-.1l2 1c.3.1.5.200.5.300.1.2.1.800-.1 1.400z"/></svg>
    </a>`;
  const btn = $(".menu-btn"), menu = $("#nav");
  btn.addEventListener("click", () => {              // Hamburger toggle
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });
  updateBadge();
}

/* ---------- 4. PAGE FUNCTIONS ---------- */
const productCard = (p) => `
  <a class="card" href="product.html?id=${p.id}">
    <div class="ph"><img src="${p.image}" alt="${p.alt}" width="600" height="750" loading="lazy"></div>
    <h3>${p.name}</h3><p class="price">${money(p.price)}</p>
  </a>`;

function renderGrid(selector, list) { const el = $(selector); if (el) el.innerHTML = list.map(productCard).join(""); }

/* Product page: reads ?id=1 from the address */
function initProduct() {
  const p = byId(new URLSearchParams(location.search).get("id"));
  const box = $("#product");
  if (!p) { box.innerHTML = `<p>We could not find that product. <a class="link" href="shop.html">Browse the collection</a></p>`; return; }
  document.title = `${p.name} | CloCourt`;
  const desc = `${p.name} for ${money(p.price)}. ${p.description}`;
  $('meta[name="description"]').content = desc;
  $('meta[property="og:title"]').content = document.title;
  $('meta[property="og:description"]').content = desc;
  $("#crumb").textContent = p.name;

  const options = (name, list) => `<fieldset class="opt"><legend>${name}</legend>` + list.map((v, i) =>
    `<label class="chip"><input type="radio" name="${name}" value="${v}" ${i ? "" : "checked"}><span>${v}</span></label>`).join("") + `</fieldset>`;
  const chosen = (name) => document.querySelector(`input[name="${name}"]:checked`).value;

  // Reviews: only genuine ones from products.js are shown
  const reviews = p.reviews.length
    ? p.reviews.map((r) => `<p><strong>${r.name}</strong> ${"★".repeat(r.rating)}<br>${r.text}</p>`).join("")
    : `<p>No reviews yet. Reviews from real customers will appear here.</p>`;

  box.innerHTML = `
    <div class="pdp-img"><img src="${p.image}" alt="${p.alt}" width="600" height="750"></div>
    <div>
      <h1 class="h-page">${p.name}</h1>
      <p class="price">${money(p.price)}</p>
      <p>${p.description}</p>
      ${options("Size", p.sizes)}${options("Colour", p.colours)}
      <div class="opt"><strong>Quantity</strong><br>
        <div class="qty"><button type="button" id="dec" aria-label="Decrease quantity">−</button><span id="q">1</span><button type="button" id="inc" aria-label="Increase quantity">+</button></div></div>
      <div class="actions">
        <button class="btn btn-block" id="add" type="button">Add to cart</button>
        <a class="btn btn-wa btn-block" id="order" target="_blank" rel="noopener">Order on WhatsApp</a>
      </div>
      <p class="muted">Your order is confirmed only after we reply on WhatsApp.</p
        <!-- TODO: add your city, courier, charges and delivery times -->
        <p>We confirm delivery area, charges and timing with you on WhatsApp before your order is arranged.</p></details>
      <details><summary>Reviews</summary>${reviews}</details>
    </div>`;

  let qty = 1;
  $("#inc").onclick = () => { qty = Math.min(qty + 1, 10); $("#q").textContent = qty; };
  $("#dec").onclick = () => { qty = Math.max(qty - 1, 1); $("#q").textContent = qty; };
  $("#add").onclick = () => { addToCart(p.id, chosen("Size"), chosen("Colour"), qty); toast("Added to your cart"); };
  $("#order").onmouseenter = $("#order").onfocus = $("#order").onclick = () => {   // Keeps link up to date with options
    $("#order").href = waLink(`Hello CloCourt, I'd like to order:\n${p.name}\nSize: ${chosen("Size")}\nColour: ${chosen("Colour")}\nQuantity: ${qty}\nPrice: ${money(p.price * qty)}\n\nPlease confirm availability, delivery and payment.`);
  };
  $("#order").onmouseenter();
  document.querySelectorAll(".opt input").forEach((i) => i.addEventListener("change", () => $("#order").onfocus()));
  $("#inc").addEventListener("click", () => $("#order").onfocus());
  $("#dec").addEventListener("click", () => $("#order").onfocus());
}

/* Cart + checkout page */
function renderCart() {
  saveCart(getCart().filter((i) => byId(i.id)));      // Drop items that no longer exist in products.js
  const cart = getCart(), box = $("#cart-items");
  if (!cart.length) {
    box.innerHTML = `<p>Your cart is empty. <a class="link" href="shop.html">Browse the collection</a></p>`;
    $("#checkout").hidden = true; return;
  }
  $("#checkout").hidden = false;
  box.innerHTML = cart.map((i, n) => { const p = byId(i.id); return `
    <div class="row">
      <img src="${p.image}" alt="${p.alt}" width="72" height="90">
      <div><h3>${p.name}</h3><p class="muted">Size ${i.size}, ${i.colour}</p><p class="price">${money(p.price * i.qty)}</p></div>
      <div class="row-actions">
        <div class="qty"><button data-act="dec" data-n="${n}" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-act="inc" data-n="${n}" aria-label="Increase quantity">+</button></div>
        <button class="link" data-act="rm" data-n="${n}">Remove</button>
      </div></div>`; }).join("");
  $("#total").textContent = money(cartTotal());
}

function initCart() {
  renderCart();
  $("#cart-items").addEventListener("click", (e) => {      // One listener handles + / - / remove
    const b = e.target.closest("button[data-act]"); if (!b) return;
    const cart = getCart(), item = cart[b.dataset.n];
    if (b.dataset.act === "inc") item.qty = Math.min(item.qty + 1, 10);
    if (b.dataset.act === "dec") item.qty = Math.max(item.qty - 1, 1);
    if (b.dataset.act === "rm") cart.splice(b.dataset.n, 1);
    saveCart(cart); renderCart();
  });
  $("#pay-method").textContent = CONFIG.payment.method;
  $("#pay-account").textContent = CONFIG.payment.account;
  $("#pay-qr").src = CONFIG.payment.qr;
  $("#checkout-form").addEventListener("submit", (e) => {  // Builds the WhatsApp order message
    e.preventDefault();
    const f = new FormData(e.target);
    const lines = getCart().map((i, n) => { const p = byId(i.id);
      return `${n + 1}. ${p.name} (Size ${i.size}, ${i.colour}) x${i.qty} = ${money(p.price * i.qty)}`; }).join("\n");
    const msg = `Hello CloCourt, I'd like to place an order.\n\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nAddress: ${f.get("address")}\n\nItems:\n${lines}\n\nTotal: ${money(cartTotal())}\n\nPlease confirm availability, delivery and payment.`;
    $("#wa-fallback").href = waLink(msg);
    $("#sent-note").hidden = false;
    window.open(waLink(msg), "_blank", "noopener");
  });
}

/* Contact page */
function initContact() {
  $("#c-wa").href = waLink("Hello CloCourt, I have a question.");
  $("#c-phone").textContent = CONFIG.phone; $("#c-phone").href = "tel:" + CONFIG.phone.replace(/[^+\d]/g, "");
  $("#c-email").textContent = CONFIG.email; $("#c-email").href = "mailto:" + CONFIG.email;
  $("#contact-form").addEventListener("submit", (e) => {   // Sends the enquiry to your WhatsApp
    e.preventDefault();
    const f = new FormData(e.target);
    window.open(waLink(`Hello CloCourt, this is ${f.get("name")} (${f.get("phone")}).\n\n${f.get("message")}`), "_blank", "noopener");
    $("#contact-note").hidden = false; e.target.reset();
  });
}

/* ---------- 5. START: run the right code for each page ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildLayout();
  const page = document.body.dataset.page;
  if (page === "home") renderGrid("#featured", PRODUCTS.filter((p) => p.featured));
  if (page === "shop") renderGrid("#product-grid", PRODUCTS);
  if (page === "product") initProduct();
  if (page === "cart") initCart();
  if (page === "contact") initContact();
});
