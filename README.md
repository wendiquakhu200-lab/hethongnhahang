<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#0f0f0f">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>Đặt Món – Nhà Hàng</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
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
* { margin:0; padding:0; box-sizing:border-box; }
body {
  font-family:'Be Vietnam Pro',sans-serif;
  background:var(--bg);
  color:var(--text);
  min-height:100vh;
  overflow-x:hidden;
}

/* ── Header ── */
header {
  position:sticky; top:0; z-index:999;
  background:rgba(15,15,15,0.88);
  backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);
  border-bottom:1px solid var(--border);
  padding:14px 20px;
  padding-top:calc(14px + env(safe-area-inset-top));
  display:flex; align-items:center; justify-content:space-between;
}
.logo { font-size:18px; font-weight:700; letter-spacing:-0.5px; }
.logo span { color:var(--accent); }
.table-badge {
  background:var(--accent); color:#000;
  font-weight:700; font-size:13px;
  padding:5px 14px; border-radius:999px;
}

/* ── Table Screen ── */
#table-screen { padding:40px 20px; max-width:680px; margin:0 auto; }
#table-screen h2 { font-size:24px; font-weight:700; margin-bottom:8px; }
#table-screen p { color:var(--muted); margin-bottom:28px; }
.tables-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(120px,1fr));
  gap:12px;
}
.table-btn {
  background:var(--surface);
  border:2px solid var(--border);
  border-radius:var(--radius);
  padding:20px 10px;
  color:#fff;
  text-align:center;
  cursor:pointer;
  transition:all .2s;
  position:relative; overflow:hidden;
}
.table-btn:hover { border-color:var(--accent); background:var(--surface2); transform:translateY(-2px); }
.table-btn .t-name { font-weight:600; font-size:15px; margin-bottom:4px; }
.table-btn .t-status { font-size:11px; color:var(--muted); }
.table-btn.occupied { border-color:#ef4444; }
.table-btn.occupied .t-status { color:#ef4444; }
.table-btn.occupied::after {
  content:''; position:absolute; top:8px; right:8px;
  width:8px; height:8px; border-radius:50%;
  background:#ef4444; animation:pulse 2s infinite;
}
@keyframes pulse {
  0%,100%{opacity:1;transform:scale(1)}
  50%{opacity:.5;transform:scale(1.4)}
}

/* ── Main Layout ── */
#main-screen { display:none; }
.layout { display:flex; height:calc(100vh - 57px); }

/* ── Menu Panel ── */
.menu-panel { flex:1; overflow-y:auto; padding:16px; border-right:1px solid var(--border); }
.search-bar { display:flex; gap:8px; margin-bottom:16px; }
.search-bar input {
  flex:1; background:var(--surface);
  border:1px solid var(--border); border-radius:8px;
  padding:10px 14px; color:var(--text);
  font-family:inherit; font-size:14px;
  outline:none; transition:border-color .2s;
}
.search-bar input:focus { border-color:var(--accent); }
.search-bar input::placeholder { color:var(--muted); }

.cat-tabs {
  display:flex; gap:6px; overflow-x:auto;
  padding-bottom:8px; margin-bottom:14px; scrollbar-width:none;
}
.cat-tabs::-webkit-scrollbar { display:none; }
.cat-tab {
  flex-shrink:0; padding:6px 16px; border-radius:999px;
  border:1px solid var(--border); background:var(--surface);
  color:var(--muted); font-size:13px; font-family:inherit;
  cursor:pointer; transition:all .15s;
}
.cat-tab.active,.cat-tab:hover {
  background:var(--accent); border-color:var(--accent);
  color:#000; font-weight:600;
}

.menu-grid {
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(150px,1fr));
  gap:10px;
}
.menu-card {
  background:var(--surface); border:1px solid var(--border);
  border-radius:var(--radius); padding:14px;
  cursor:pointer; transition:all .15s;
  display:flex; flex-direction:column; gap:6px;
  position:relative;
}
.menu-card:hover { border-color:var(--accent); transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.4); }
.menu-card.unavailable { opacity:.4; pointer-events:none; }
.menu-card .m-cat { font-size:10px; color:var(--accent); font-weight:600; text-transform:uppercase; letter-spacing:.5px; }
.menu-card .m-name { font-size:14px; font-weight:600; line-height:1.3; }
.menu-card .m-price { font-size:15px; font-weight:700; color:var(--accent); margin-top:auto; }
.menu-card .m-add {
  position:absolute; bottom:10px; right:10px;
  width:28px; height:28px; background:var(--accent);
  color:#000; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  font-size:18px; font-weight:700;
  opacity:0; transition:opacity .15s;
}
.menu-card:hover .m-add { opacity:1; }
.m-img { width:100%; border-radius:8px; margin-bottom:6px; object-fit:cover; height:100px; background:var(--surface2); }

/* ── Cart Panel ── */
.cart-panel {
  width:320px; display:flex; flex-direction:column; background:var(--surface);
}
.cart-header {
  padding:16px; border-bottom:1px solid var(--border);
  display:flex; align-items:center; justify-content:space-between;
  cursor:pointer;
}
.cart-header h3 { font-size:15px; font-weight:700; }
.cart-count {
  background:var(--accent); color:#000;
  border-radius:999px; padding:2px 10px;
  font-size:12px; font-weight:700;
}
.cart-items { flex:1; overflow-y:auto; padding:12px; }
.empty-cart { text-align:center; padding:40px 20px; color:var(--muted); }
.empty-cart svg { margin-bottom:12px; opacity:.4; }
.cart-item {
  background:var(--surface2); border-radius:10px;
  padding:12px; margin-bottom:8px;
  display:flex; gap:10px; align-items:flex-start;
  animation:slideIn .2s ease;
}
@keyframes slideIn {
  from{opacity:0;transform:translateX(20px)}
  to{opacity:1;transform:translateX(0)}
}
.ci-info { flex:1; min-width:0; }
.ci-name { font-size:13px; font-weight:600; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.ci-price { font-size:12px; color:var(--accent); font-weight:600; }
.ci-note input {
  margin-top:6px; width:100%;
  background:var(--surface); border:1px solid var(--border);
  border-radius:6px; padding:5px 8px;
  font-size:12px; color:var(--text); font-family:inherit; outline:none;
}
.ci-note input::placeholder { color:var(--muted); }
.ci-note input:focus { border-color:var(--accent); }
.ci-qty { display:flex; align-items:center; gap:6px; }
.qty-btn {
  width:26px; height:26px; border-radius:50%;
  border:1px solid var(--border); background:var(--surface);
  color:var(--text); font-size:16px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  transition:all .15s;
}
.qty-btn:hover { background:var(--accent); border-color:var(--accent); color:#000; }
.qty-btn.minus:hover { background:var(--accent2); border-color:var(--accent2); }
.qty-num { font-size:14px; font-weight:700; min-width:20px; text-align:center; }

.cart-footer { padding:14px; border-top:1px solid var(--border); }
.cart-total { display:flex; justify-content:space-between; margin-bottom:12px; font-size:15px; }
.cart-total .label { color:var(--muted); }
.cart-total .amount { font-weight:700; font-size:18px; color:var(--accent); }
.btn-order {
  width:100%; padding:14px;
  background:var(--accent); color:#000;
  border:none; border-radius:var(--radius);
  font-size:15px; font-weight:700; font-family:inherit;
  cursor:pointer; transition:all .2s;
  display:flex; align-items:center; justify-content:center; gap:8px;
}
.btn-order:hover { background:#d97706; transform:translateY(-1px); }
.btn-order:active { transform:translateY(0); }
.btn-order:disabled { opacity:.5; pointer-events:none; }

/* ── Current Order ── */
.current-order { margin-top:10px; border-top:1px solid var(--border); padding-top:10px; }
.co-title { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.6px; color:var(--muted); margin-bottom:8px; }
.co-item { display:flex; justify-content:space-between; align-items:center; font-size:12px; margin-bottom:4px; padding:4px 0; }
.co-item .name { color:var(--muted); max-width:150px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.co-item .meta { display:flex; align-items:center; gap:8px; }
.badge-done { background:rgba(34,197,94,.15); color:var(--green); border-radius:4px; padding:1px 6px; font-size:10px; font-weight:600; }
.badge-pending { background:rgba(245,158,11,.15); color:var(--accent); border-radius:4px; padding:1px 6px; font-size:10px; font-weight:600; }

/* ── Toast ── */
.toast {
  position:fixed; bottom:24px; left:50%;
  transform:translateX(-50%);
  background:var(--green); color:#000;
  padding:12px 24px; border-radius:999px;
  font-weight:600; font-size:14px; z-index:9999;
  opacity:0; pointer-events:none; transition:opacity .25s ease;
  white-space:nowrap;
}
.toast.show { opacity:1; }

/* ── Scrollbar ── */
.scrollbar { scrollbar-width:thin; scrollbar-color:var(--border) transparent; }
.scrollbar::-webkit-scrollbar { width:4px; }
.scrollbar::-webkit-scrollbar-thumb { background:var(--border); border-radius:2px; }

/* ── Mobile ── */
@media(max-width:600px){
  .cart-panel {
    width:100%; position:fixed; bottom:0; left:0;
    height:55vh; z-index:50;
    transform:translateY(calc(100% - 52px));
    transition:transform .3s ease;
  }
  .cart-panel.open { transform:translateY(0); }
  .menu-panel { height:calc(100vh - 57px - 52px); }
  .layout { flex-direction:column; height:auto; }
}

/* ── Demo badge ── */
.demo-notice {
  position:fixed; top:70px; right:12px;
  background:#1e293b; border:1px solid #334155;
  color:#94a3b8; font-size:11px; padding:5px 10px;
  border-radius:6px; z-index:998;
}
</style>
</head>
<body>

<header>
  <div class="logo">🍜 <span>NHÀ HÀNG</span></div>
  <div id="hdr-table" class="table-badge" style="display:none"></div>
</header>

<div class="demo-notice">🧪 Demo (dữ liệu mẫu)</div>

<!-- Table Select -->
<div id="table-screen">
  <h2>Chọn bàn</h2>
  <p>Chọn bàn để bắt đầu đặt món</p>
  <div class="tables-grid" id="tables-grid"></div>
</div>

<!-- Main Order Screen -->
<div id="main-screen">
  <div class="layout">
    <div class="menu-panel scrollbar">
      <div class="search-bar">
        <input type="text" id="search-input" placeholder="🔍 Tìm món..."/>
      </div>
      <div class="cat-tabs" id="cat-tabs"></div>
      <div class="menu-grid" id="menu-grid"></div>
    </div>

    <div class="cart-panel scrollbar" id="cart-panel">
      <div class="cart-header" onclick="toggleCart()">
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

<div class="toast" id="toast"></div>

<script>
// ══════════════════════════════════════════════════════
//  MOCK DATA  (thay đổi dữ liệu tại đây)
// ══════════════════════════════════════════════════════
const MOCK_TABLES = [
  { id:1, name:'Bàn 1', status:'free' },
  { id:2, name:'Bàn 2', status:'occupied' },
  { id:3, name:'Bàn 3', status:'free' },
  { id:4, name:'Bàn 4', status:'free' },
  { id:5, name:'Bàn 5', status:'occupied' },
  { id:6, name:'Bàn 6', status:'free' },
  { id:7, name:'Bàn VIP 1', status:'free' },
  { id:8, name:'Bàn VIP 2', status:'occupied' },
];

const MOCK_MENU = [
  // Khai vị
  { id:1,  name:'Gỏi cuốn tôm thịt',   category:'Khai vị',  price:45000,  quantity:20, available:true  },
  { id:2,  name:'Chả giò rế',           category:'Khai vị',  price:55000,  quantity:15, available:true  },
  { id:3,  name:'Bánh tôm Hồ Tây',      category:'Khai vị',  price:60000,  quantity:10, available:true  },
  // Món chính
  { id:4,  name:'Phở bò tái chín',      category:'Món chính',price:75000,  quantity:30, available:true  },
  { id:5,  name:'Bún bò Huế',           category:'Món chính',price:70000,  quantity:25, available:true  },
  { id:6,  name:'Cơm tấm sườn bì',      category:'Món chính',price:65000,  quantity:20, available:true  },
  { id:7,  name:'Mì Quảng',             category:'Món chính',price:65000,  quantity:18, available:true  },
  { id:8,  name:'Bún riêu cua',         category:'Món chính',price:68000,  quantity:0,  available:false },
  // Lẩu
  { id:9,  name:'Lẩu thái hải sản',     category:'Lẩu',      price:320000, quantity:10, available:true  },
  { id:10, name:'Lẩu bò nhúng dấm',     category:'Lẩu',      price:280000, quantity:8,  available:true  },
  { id:11, name:'Lẩu nấm chay',         category:'Lẩu',      price:240000, quantity:5,  available:true  },
  // Đồ uống
  { id:12, name:'Trà đá',               category:'Đồ uống',  price:10000,  quantity:99, available:true  },
  { id:13, name:'Nước ngọt lon',         category:'Đồ uống',  price:20000,  quantity:50, available:true  },
  { id:14, name:'Sinh tố xoài',          category:'Đồ uống',  price:45000,  quantity:20, available:true  },
  { id:15, name:'Bia Hà Nội',            category:'Đồ uống',  price:30000,  quantity:40, available:true  },
  // Tráng miệng
  { id:16, name:'Chè ba màu',            category:'Tráng miệng',price:35000,quantity:15, available:true  },
  { id:17, name:'Kem dừa',               category:'Tráng miệng',price:40000,quantity:12, available:true  },
];

// Mock "đã gọi" cho bàn đang phục vụ
const MOCK_ACTIVE_ORDERS = {
  2: { items:[ { name:'Phở bò tái chín', quantity:2, price:75000, status:'done' }, { name:'Trà đá', quantity:2, price:10000, status:'pending' } ] },
  5: { items:[ { name:'Lẩu thái hải sản', quantity:1, price:320000, status:'pending' }, { name:'Bia Hà Nội', quantity:3, price:30000, status:'done' } ] },
  8: { items:[ { name:'Bún bò Huế', quantity:2, price:70000, status:'done' } ] },
};

// ══════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════
let menuItems  = [...MOCK_MENU];
let tablesData = [...MOCK_TABLES];
let cart = [];
let selectedTable = null;
let activeOrder = null;
let activeCat = 'Tất cả';
let toastTimer;

// ══════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════
function init() {
  renderTables();
  setupSearch();
  setupCartTouch();
}

// ══════════════════════════════════════════════════════
//  TABLES
// ══════════════════════════════════════════════════════
function renderTables() {
  const grid = document.getElementById('tables-grid');
  grid.innerHTML = '';
  tablesData.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'table-btn' + (t.status === 'occupied' ? ' occupied' : '');
    btn.innerHTML = `<div class="t-name">${t.name}</div>
      <div class="t-status">${t.status==='occupied' ? '🔴 Đang phục vụ' : '🟢 Trống'}</div>`;
    btn.onclick = () => selectTable(t);
    grid.appendChild(btn);
  });
}

function selectTable(table) {
  selectedTable = table;
  document.getElementById('table-screen').style.display = 'none';
  document.getElementById('main-screen').style.display = 'block';
  document.getElementById('hdr-table').style.display = 'block';
  document.getElementById('hdr-table').textContent = table.name;
  activeOrder = MOCK_ACTIVE_ORDERS[table.id] || null;
  renderCurrentOrder();
  renderCats();
  renderMenu();
  cart = [];
  renderCart();
}

// ══════════════════════════════════════════════════════
//  MENU
// ══════════════════════════════════════════════════════
function setupSearch() {
  document.getElementById('search-input').addEventListener('input', renderMenu);
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
  if (activeCat !== 'Tất cả') items = items.filter(m => m.category === activeCat);
  if (search) items = items.filter(m => m.name.toLowerCase().includes(search));

  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    const avail = item.available && item.quantity > 0;
    card.className = 'menu-card' + (avail ? '' : ' unavailable');
    card.innerHTML = `
      <div class="m-cat">${item.category}</div>
      <div class="m-name">${item.name}</div>
      <div style="font-size:11px;color:#aaa">Còn: ${item.quantity > 0 ? item.quantity : '❌ Hết'}</div>
      <div class="m-price">${fmt(item.price)}</div>
      <div class="m-add">+</div>
    `;
    if (avail) card.onclick = () => addToCart(item);
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
//  CART
// ══════════════════════════════════════════════════════
function addToCart(item) {
  const existing = cart.find(c => c.menu_item_id === item.id);
  const currentQty = existing ? existing.quantity : 0;
  if (currentQty >= item.quantity) {
    showToast(`❌ ${item.name} chỉ còn ${item.quantity} món`);
    return;
  }
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ menu_item_id:item.id, name:item.name, price:item.price, quantity:1, note:'' });
  }
  renderCart();
  showToast(`✓ Thêm ${item.name}`);
}

function changeQty(idx, delta) {
  const item = cart[idx];
  const menuItem = menuItems.find(m => m.id === item.menu_item_id);
  if (delta > 0 && item.quantity >= menuItem.quantity) {
    showToast(`❌ ${item.name} chỉ còn ${menuItem.quantity} món`);
    return;
  }
  item.quantity += delta;
  if (item.quantity <= 0) cart.splice(idx, 1);
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  const countEl   = document.getElementById('cart-count');
  const totalEl   = document.getElementById('cart-total');
  const btn       = document.getElementById('btn-order');

  const total = cart.reduce((s,c) => s + c.price * c.quantity, 0);
  const count = cart.reduce((s,c) => s + c.quantity, 0);
  countEl.textContent = `${count} món`;
  totalEl.textContent = fmt(total);
  btn.disabled = cart.length === 0;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart">
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
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
        <div class="ci-price">${fmt(item.price)} × ${item.quantity} = ${fmt(item.price*item.quantity)}</div>
        <div class="ci-note">
          <input type="text" placeholder="Ghi chú (không cay, ít mỡ...)" value="${item.note}"
            oninput="cart[${idx}].note=this.value"/>
        </div>
      </div>
      <div class="ci-qty">
        <button class="qty-btn minus" onclick="changeQty(${idx},-1)">−</button>
        <span class="qty-num">${item.quantity}</span>
        <button class="qty-btn plus" onclick="changeQty(${idx},1)">+</button>
      </div>`;
    container.appendChild(div);
  });
}

// ── Submit (mock) ──
function submitOrder() {
  if (!cart.length) return;
  const btn = document.getElementById('btn-order');
  btn.disabled = true;
  btn.textContent = '⏳ Đang gửi...';

  // Giảm tồn kho trong mock data
  cart.forEach(c => {
    const m = menuItems.find(m => m.id === c.menu_item_id);
    if (m) m.quantity = Math.max(0, m.quantity - c.quantity);
  });

  // Thêm vào "đã gọi"
  const newItems = cart.map(c => ({
    name: c.name, quantity: c.quantity, price: c.price, status: 'pending'
  }));
  if (!activeOrder) {
    activeOrder = { items: [] };
  }
  activeOrder.items.push(...newItems);

  // Đánh dấu bàn "occupied"
  const t = tablesData.find(t => t.id === selectedTable.id);
  if (t) t.status = 'occupied';

  setTimeout(() => {
    cart = [];
    renderCart();
    renderCurrentOrder();
    renderMenu();
    btn.disabled = false;
    btn.textContent = '📨 Gửi yêu cầu';
    showToast('✅ Đã gửi yêu cầu lên bếp!');
  }, 800);
}

// ══════════════════════════════════════════════════════
//  CURRENT ORDER
// ══════════════════════════════════════════════════════
function renderCurrentOrder() {
  const panel     = document.getElementById('current-order-panel');
  const container = document.getElementById('current-order-items');
  if (!activeOrder || !activeOrder.items?.length) {
    panel.style.display = 'none'; return;
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
        <span class="${item.status==='done'?'badge-done':'badge-pending'}">${item.status==='done'?'✓ Xong':'Chờ'}</span>
      </div>`;
    container.appendChild(d);
  });
}

// ══════════════════════════════════════════════════════
//  UI HELPERS
// ══════════════════════════════════════════════════════
function toggleCart() {
  document.getElementById('cart-panel').classList.toggle('open');
}

function setupCartTouch() {
  const panel = document.getElementById('cart-panel');
  let startY = 0;
  panel.addEventListener('touchstart', e => { startY = e.touches[0].clientY; });
  panel.addEventListener('touchmove', e => {
    const diff = startY - e.touches[0].clientY;
    if (diff > 50) panel.classList.add('open');
    if (diff < -50) panel.classList.remove('open');
  });
}

function fmt(n) { return Number(n).toLocaleString('vi-VN') + 'đ'; }

function showToast(msg) {
  const t = document.getElementById('toast');
  t.classList.remove('show');
  void t.offsetWidth;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2000);
}

init();
</script>
</body>
</html>