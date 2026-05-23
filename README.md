<!DOCTYPE html>
<html lang="vi">
<head>
  <link rel="manifest" href="/manifest.json">

<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#0f0f0f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>Đặt Món</title>
<script src="/socket.io/socket.io.js"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap');



  body {
    font-family: 'Be Vietnam Pro', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* ── Header ── */
header {
  position: sticky;
  top: 0;
  z-index: 999;

  background: rgba(15, 15, 15, 0.85); /* 👈 giảm opacity để thấy blur */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  border-bottom: 1px solid var(--border);

  padding: 14px 20px;
  padding-top: calc(14px + env(safe-area-inset-top));

  display: flex;
  align-items: center;
  justify-content: space-between;
}
  .m-img {
  width: 100%;
  border-radius: 8px;
  margin-bottom: 6px;
  object-fit: cover;
  height: 100px; /* hoặc tùy bạn */
}
  :root {
    --bg: #0f0f0f;
    --surface: #1a1a1a;
    --surface2: #242424;
    --border: #2e2e2e;
    --accent: #f59e0b;
    --accent2: #ef4444;
    --text: #f5f5f5;
    --muted: #737373;
    --green: #22c55e;
    --radius: 12px;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  .logo { font-size: 18px; font-weight: 700; letter-spacing: -0.5px; }
  .logo span { color: var(--accent); }
  .table-badge {
    background: var(--accent);
    color: #000;
    font-weight: 700;
    font-size: 13px;
    padding: 5px 14px;
    border-radius: 999px;
  }

  /* ── Table Select Screen ── */
  #table-screen {
    padding: 40px 20px;
    max-width: 680px; margin: 0 auto;
  }
  #table-screen h2 { font-size: 24px; font-weight: 700; margin-bottom: 8px; }
  #table-screen p { color: var(--muted); margin-bottom: 28px; }
  .tables-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
  }
  .table-btn {
    background: var(--surface);
    border: 2px solid var(--border);
    border-radius: var(--radius);
    padding: 20px 10px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    transition: all .2s;
    position: relative;
    overflow: hidden;
  }
  .table-btn:hover { border-color: var(--accent); background: var(--surface2); transform: translateY(-2px); }
  .table-btn .t-name { font-weight: 600; font-size: 15px; margin-bottom: 4px; }
  .table-btn .t-status { font-size: 11px; color: var(--muted); }
  .table-btn.occupied { border-color: #ef4444; }
  .table-btn.occupied .t-status { color: #ef4444; }
  .table-btn.occupied::after {
    content: ''; position: absolute; top: 8px; right: 8px;
    width: 8px; height: 8px; border-radius: 50%;
    background: #ef4444;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform: scale(1); }
    50% { opacity:.5; transform: scale(1.4); }
  }

  /* ── Main Layout ── */
  #main-screen { display: none; }
  .layout {
    display: flex;
    height: calc(100vh - 57px);
  }

  /* ── Menu Side ── */
  .menu-panel {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    border-right: 1px solid var(--border);
  }
  .search-bar {
    display: flex; gap: 8px; margin-bottom: 16px;
  }
  .search-bar input {
    flex: 1;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    color: var(--text);
    font-family: inherit;
    font-size: 14px;
    outline: none;
    transition: border-color .2s;
  }
  .search-bar input:focus { border-color: var(--accent); }
  .search-bar input::placeholder { color: var(--muted); }

  .cat-tabs {
    display: flex; gap: 6px;
    overflow-x: auto;
    padding-bottom: 8px;
    margin-bottom: 14px;
    scrollbar-width: none;
  }
  .cat-tabs::-webkit-scrollbar { display:none; }
  .cat-tab {
    flex-shrink: 0;
    padding: 6px 16px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--muted);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    transition: all .15s;
  }
  .cat-tab.active, .cat-tab:hover {
    background: var(--accent);
    border-color: var(--accent);
    color: #000;
    font-weight: 600;
  }

  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }
  .menu-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px;
    cursor: pointer;
    transition: all .15s;
    display: flex; flex-direction: column; gap: 6px;
    position: relative;
  }
  .menu-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.4); }
  .menu-card.unavailable { opacity: .4; pointer-events: none; }
  .menu-card .m-cat {
    font-size: 10px; color: var(--accent); font-weight: 600;
    text-transform: uppercase; letter-spacing: .5px;
  }
  .menu-card .m-name { font-size: 14px; font-weight: 600; line-height: 1.3; }
  .menu-card .m-price { font-size: 15px; font-weight: 700; color: var(--accent); margin-top: auto; }
  .menu-card .m-add {
    position: absolute; bottom: 10px; right: 10px;
    width: 28px; height: 28px;
    background: var(--accent);
    color: #000;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700;
    opacity: 0; transition: opacity .15s;
  }
  .menu-card:hover .m-add { opacity: 1; }

  /* ── Cart Side ── */
  .cart-panel {
    width: 320px;
    display: flex;
    flex-direction: column;
    background: var(--surface);
  }
  .cart-header {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    cursor: grab;
  }
  .cart-header:active {
  cursor: grabbing;
}
  .cart-header h3 { font-size: 15px; font-weight: 700; }
  .cart-count {
    background: var(--accent);
    color: #000;
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 700;
  }
  .cart-items { flex: 1; overflow-y: auto; padding: 12px; }
  .empty-cart {
    text-align: center; padding: 40px 20px;
    color: var(--muted);
  }
  .empty-cart svg { margin-bottom: 12px; opacity: .4; }
  .cart-item {
    background: var(--surface2);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 8px;
    display: flex; gap: 10px; align-items: flex-start;
    animation: slideIn .2s ease;
  }
  @keyframes slideIn {
    from { opacity:0; transform: translateX(20px); }
    to { opacity:1; transform: translateX(0); }
  }
  .ci-info { flex: 1; min-width: 0; }
  .ci-name { font-size: 13px; font-weight: 600; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ci-price { font-size: 12px; color: var(--accent); font-weight: 600; }
  .ci-note input {
    margin-top: 6px;
    width: 100%;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 5px 8px;
    font-size: 12px;
    color: var(--text);
    font-family: inherit;
    outline: none;
  }
  .ci-note input::placeholder { color: var(--muted); }
  .ci-note input:focus { border-color: var(--accent); }
  .ci-qty {
    display: flex; align-items: center; gap: 6px;
  }
  .qty-btn {
    width: 26px; height: 26px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text);
    font-size: 16px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .15s;
  }
  .qty-btn:hover { background: var(--accent); border-color: var(--accent); color: #000; }
  .qty-btn.minus:hover { background: var(--accent2); border-color: var(--accent2); }
  .qty-num { font-size: 14px; font-weight: 700; min-width: 20px; text-align: center; }

  .cart-footer { padding: 14px; border-top: 1px solid var(--border); }
  .cart-total {
    display: flex; justify-content: space-between;
    margin-bottom: 12px;
    font-size: 15px;
  }
  .cart-total .label { color: var(--muted); }
  .cart-total .amount { font-weight: 700; font-size: 18px; color: var(--accent); }

  .btn-order {
    width: 100%;
    padding: 14px;
    background: var(--accent);
    color: #000;
    border: none;
    border-radius: var(--radius);
    font-size: 15px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: all .2s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-order:hover { background: #d97706; transform: translateY(-1px); }
  .btn-order:active { transform: translateY(0); }
  .btn-order:disabled { opacity: .5; pointer-events: none; }

  /* ── Current Order ── */
  .current-order {
    margin-top: 10px;
    border-top: 1px solid var(--border);
    padding-top: 10px;
  }
  .co-title {
    font-size: 11px; font-weight: 700; text-transform: uppercase;
    letter-spacing: .6px; color: var(--muted); margin-bottom: 8px;
  }
  .co-item {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; margin-bottom: 4px;
    padding: 4px 0;
  }
  .co-item .name { color: var(--muted); max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .co-item .meta { display: flex; align-items: center; gap: 8px; }
  .badge-done {
    background: rgba(34,197,94,.15);
    color: var(--green);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: 600;
  }
  .badge-pending {
    background: rgba(245,158,11,.15);
    color: var(--accent);
    border-radius: 4px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: 600;
  }

  /* ── Toast ── */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  
  background: var(--green);
  color: #000;
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 14px;
  z-index: 9999;

  opacity: 0;
  pointer-events: none;
  transition: opacity .25s ease;
}

.toast.show {
  opacity: 1;
}

  /* ── Note Modal ── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 200;
    opacity: 0; pointer-events: none; transition: opacity .2s;
  }
  .modal-overlay.open { opacity: 1; pointer-events: all; }
  .modal {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 24px;
    width: 320px;
    transform: translateY(20px); transition: transform .2s;
  }
  .modal-overlay.open .modal { transform: translateY(0); }
  .modal h3 { font-size: 17px; margin-bottom: 16px; }
  .modal input {
    width: 100%; background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 14px;
    color: var(--text); font-family: inherit; font-size: 14px;
    outline: none; margin-bottom: 14px;
  }
  .modal input:focus { border-color: var(--accent); }
  .modal-btns { display: flex; gap: 8px; }
  .btn-sm {
    flex: 1; padding: 10px;
    border-radius: 8px; border: none;
    font-family: inherit; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all .15s;
  }
  .btn-primary { background: var(--accent); color: #000; }
  .btn-secondary { background: var(--surface); color: var(--text); border: 1px solid var(--border); }

  @media (max-width: 600px) {
    .cart-panel { width: 100%; position: fixed; bottom: 0; left: 0; height: 50vh; z-index: 50; transform: translateY(calc(100% - 52px)); transition: transform .3s ease; }
    .cart-panel.open { transform: translateY(0); }
    .menu-panel { height: calc(100vh - 57px - 52px); }
    .layout { flex-direction: column; height: auto; }
    .cart-toggle-btn { display: flex; }
  }

  .scrollbar { scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
  .scrollbar::-webkit-scrollbar { width: 4px; }
  .scrollbar::-webkit-scrollbar-track { background: transparent; }
  .scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
</style>
</head>
<body>

<header>
  <div class="logo">🍜 <span>NHÀ HÀNG</span></div>
  <div id="hdr-table" class="table-badge" style="display:none"></div>
</header>

<!-- Table Select -->
<div id="table-screen">
  <h2>Chọn bàn</h2>
  <p>Chọn bàn để bắt đầu đặt món</p>
  <div class="tables-grid" id="tables-grid"></div>
</div>

<!-- Main Order Screen -->
<div id="main-screen">
  <div class="layout">
    <!-- Menu -->
    <div class="menu-panel scrollbar">
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="🔍 Tìm món..."/>
      </div>
      <div class="cat-tabs" id="cat-tabs"></div>
      <div class="menu-grid" id="menu-grid"></div>
    </div>

    <!-- Cart -->
    <div class="cart-panel scrollbar" id="cart-panel">
      <div class="cart-header" onclick="toggleCart()" style="cursor:pointer;">
        <h3>🛒 Gọi thêm</h3>
        <span class="cart-count" id="cart-count">0 món</span>
      </div>
      <div class="cart-items scrollbar" id="cart-items">
        <div class="empty-cart">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <p>Chưa có món nào</p>
        </div>
      </div>
      <div class="cart-footer">
        <div class="cart-total">
          <span class="label">Tổng cộng</span>
          <span class="amount" id="cart-total">0đ</span>
        </div>
        <button class="btn-order" id="btn-order" onclick="submitOrder()" disabled>
          📨 Gửi yêu cầu
        </button>
           <div class="current-order" id="current-order-panel" style="display:none">
          <div class="co-title">📋 Đã gọi</div>
          <div id="current-order-items"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast"></div>

<script>
const socket = io();
let menuItems = [];
let cart = [];
let selectedTable = null;
let activeOrder = null;
let activeCat = 'Tất cả';

// ── Init ──────────────────────────────────────────────────────────────────────
async function init() {
  await loadTables();
  await loadMenu();
   setupCartTouch(); // 👈 QUAN TRỌNG
}

async function loadTables() {
  const res = await fetch('/api/tables');
  const tables = await res.json();
  const grid = document.getElementById('tables-grid');
  grid.innerHTML = '';
  tables.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'table-btn' + (t.status === 'occupied' ? ' occupied' : '');
    btn.innerHTML = `<div class="t-name">${t.name}</div><div class="t-status">${t.status === 'occupied' ? '🔴 Đang phục vụ' : '🟢 Trống'}</div>`;
    btn.onclick = () => selectTable(t);
    grid.appendChild(btn);
  });
}

async function loadMenu() {
  const res = await fetch('/api/menu');
  menuItems = await res.json();
  renderCats();
  renderMenu();
}

function renderCats() {
  const cats = ['Tất cả', ...new Set(menuItems.map(m => m.category))];
  const tabs = document.getElementById('cat-tabs');
  tabs.innerHTML = '';
  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'cat-tab' + (cat === activeCat ? ' active' : '');
    btn.textContent = cat;
    btn.onclick = () => { activeCat = cat; renderCats(); renderMenu(); };
    tabs.appendChild(btn);
  });
}


function renderMenu() {
  const search = document.getElementById('search-input').value.toLowerCase();

  let items = menuItems;

  if (activeCat !== 'Tất cả') {
    items = items.filter(m => m.category === activeCat);
  }

  if (search) {
    items = items.filter(m =>
      m.name.toLowerCase().includes(search)
    );
  }

  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';

  items.forEach(item => {

    const card = document.createElement('div');

    // 👇 Hết hàng => unavailable
    card.className =
      'menu-card' +
      (item.available && item.quantity > 0
        ? ''
        : ' unavailable');

    // 👇 Ảnh món
    let imgHtml = '';

    if (item.image) {
      imgHtml =
        `<img class="m-img"
          src="/images/${item.image}"
          alt="${item.name}">`;
    }

    card.innerHTML = `
      ${imgHtml}

      <div class="m-cat">
        ${item.category}
      </div>

      <div class="m-name">
        ${item.name}
      </div>

      <div style="font-size:11px;color:#aaa">
        Còn: ${item.quantity}
      </div>

      <div class="m-price">
        ${fmt(item.price)}
      </div>

      <div class="m-add">+</div>
    `;

    // 👇 Chỉ cho gọi khi còn hàng
    if (item.available && item.quantity > 0) {
      card.onclick = () => addToCart(item);
    }

    grid.appendChild(card);
  });
}

// ── Table Select ──────────────────────────────────────────────────────────────
async function selectTable(table) {
  selectedTable = table;
  document.getElementById('table-screen').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('hdr-table').style.display = 'block';
  document.getElementById('hdr-table').textContent = table.name;
  await loadCurrentOrder();
}

async function loadCurrentOrder() {
  const res = await fetch(`/api/orders/table/${selectedTable.id}`);
  activeOrder = await res.json();
  renderCurrentOrder();
}

function renderCurrentOrder() {
  const panel = document.getElementById('current-order-panel');
  const container = document.getElementById('current-order-items');
  if (!activeOrder || !activeOrder.items?.length) {
    panel.style.display = 'none';
    return;
  }
  panel.style.display = 'block';
  container.innerHTML = '';
  activeOrder.items.forEach(item => {
    const d = document.createElement('div');
    d.className = 'co-item';
    d.innerHTML = `
      <div class="name">${item.quantity}x ${item.name}</div>
      <div class="meta">
        <span>${fmt(item.price * item.quantity)}</span>
        <span class="${item.status === 'done' ? 'badge-done' : 'badge-pending'}">${item.status === 'done' ? '✓ Xong' : 'Chờ'}</span>
      </div>
    `;
    container.appendChild(d);
  });
}

// ── Cart ──────────────────────────────────────────────────────────────────────
function addToCart(item) {

  const existing = cart.find(c => c.menu_item_id === item.id);

  // 👇 số lượng đã chọn trong giỏ
  const currentQty = existing ? existing.quantity : 0;

  // 👇 vượt tồn kho
  if (currentQty >= item.quantity) {
    showToast(`❌ ${item.name} chỉ còn ${item.quantity} món`);
    return;
  }

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      menu_item_id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      note: ''
    });
  }

  renderCart();

  showToast(`✓ Thêm ${item.name}`);
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  const btn = document.getElementById('btn-order');

  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const count = cart.reduce((s, c) => s + c.quantity, 0);

  countEl.textContent = `${count} món`;
  totalEl.textContent = fmt(total);
  btn.disabled = cart.length === 0;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart">
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg><p>Chưa có món nào</p></div>`;
    return;
  }

  container.innerHTML = '';
  cart.forEach((item, idx) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${fmt(item.price)} × ${item.quantity} = ${fmt(item.price * item.quantity)}</div>
        <div class="ci-note">
          <input type="text" placeholder="Ghi chú (không cay, ít mỡ...)" value="${item.note}"
            oninput="cart[${idx}].note=this.value"/>
        </div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn minus" onclick="changeQty(${idx},-1)">−</button>
        <span class="qty-num">${item.quantity}</span>
        <button class="qty-btn plus" onclick="changeQty(${idx},1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function changeQty(idx, delta) {

  const item = cart[idx];

  // 👇 tìm món trong menu
  const menuItem = menuItems.find(
    m => m.id === item.menu_item_id
  );

  // 👇 nếu tăng vượt tồn kho
  if (delta > 0 && item.quantity >= menuItem.quantity) {
    showToast(`❌ ${item.name} chỉ còn ${menuItem.quantity} món`);
    return;
  }

  item.quantity += delta;

  // 👇 nếu <= 0 thì xoá khỏi giỏ
  if (item.quantity <= 0) {
    cart.splice(idx, 1);
  }

  renderCart();
}

async function submitOrder() {
  if (!cart.length) return;
  const btn = document.getElementById('btn-order');
  btn.disabled = true;
  btn.textContent = '⏳ Đang gửi...';

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table_id: selectedTable.id, items: cart })
    });

    if (res.ok) {
      cart = [];
      renderCart();

      // 🔹 Load lại đơn hàng hiện tại
      await loadCurrentOrder();

      // 🔹 Load lại menu từ server để cập nhật quantity
      await loadMenu();     
      renderMenu();

      showToast('✅ Đã gửi yêu cầu lên bếp!');
    }
  } catch(e) {
    showToast('❌ Lỗi kết nối');
  }

  btn.disabled = false;
  btn.textContent = '📨 Gửi yêu cầu';
}
function toggleCart() {
  const cart = document.getElementById('cart-panel');
  cart.classList.toggle('open');
}
function setupCartTouch() {
  const cartPanel = document.getElementById('cart-panel');
  let startY = 0;

cartPanel.addEventListener('touchstart', e => {
  startY = e.touches[0].clientY;
});

cartPanel.addEventListener('touchmove', e => {
  let currentY = e.touches[0].clientY;
  let diff = startY - currentY;

  // Vuốt lên → mở
  if (diff > 50) {
    cartPanel.classList.add('open');
  }

  // Vuốt xuống → đóng
  if (diff < -50) {
    cartPanel.classList.remove('open');
  }
});
}

// ── Socket ────────────────────────────────────────────────────────────────────
socket.on('order_updated', async () => {

  await loadTables();

  if (selectedTable) {
    await loadCurrentOrder();
  }

});

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(n) {
  return Number(n).toLocaleString('vi-VN') + 'đ';
}


let toastTimer;

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;

  // reset animation
  t.classList.remove('show');

  // force browser reflow (QUAN TRỌNG)
  void t.offsetWidth;

  // set nội dung + show lại
  t.textContent = msg;
  t.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    t.classList.remove('show');
  }, 2000);
}

function getTableFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('table');
}
let tablesData = []; // 👈 thêm dòng này

async function loadTables() {
  const res = await fetch('/api/tables');
  const tables = await res.json();
  tablesData = tables;

  const grid = document.getElementById('tables-grid');
  grid.innerHTML = '';

  tables.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'table-btn' + (t.status === 'occupied' ? ' occupied' : '');
    btn.innerHTML = `<div class="t-name">${t.name}</div>
                     <div class="t-status">${t.status === 'occupied' ? '🔴 Đang phục vụ' : '🟢 Trống'}</div>`;
    btn.onclick = () => selectTable(t);
    grid.appendChild(btn);
  });
}
async function init() {
  await loadTables();
  await loadMenu();
  setupCartTouch();

  // 👇 auto chọn bàn đầu tiên
  const table = tablesData[0];

  if (table) {
    selectTable(table);
  }
}

init();
</script>
</body>
</html>
