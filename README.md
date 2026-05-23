<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta name="theme-color" content="#0d0d0d">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>Order – Khách Hàng</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{
  --bg:#0d0d0d;
  --surface:#161616;
  --surface2:#1e1e1e;
  --surface3:#252525;
  --border:#2a2a2a;
  --gold:#c8922a;
  --gold2:#e8b84b;
  --gold-glow:rgba(200,146,42,.18);
  --text:#f0ece4;
  --muted:#7a7060;
  --red:#e05252;
  --green:#4caf7d;
  --radius:14px;
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden}
body{font-family:'Be Vietnam Pro',sans-serif;background:var(--bg);color:var(--text);display:flex;flex-direction:column;}

/* ── HEADER ── */
header{
  display:flex;align-items:center;gap:14px;
  padding:14px 20px;
  padding-top:calc(14px + env(safe-area-inset-top));
  background:var(--surface);border-bottom:1px solid var(--border);
  position:relative;z-index:100;flex-shrink:0;
}
.logo-area{display:flex;align-items:center;gap:10px;flex:1}
.logo-icon{width:34px;height:34px;background:var(--gold);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo-text{font-family:'Playfair Display',serif;font-size:15px;color:var(--gold2);letter-spacing:.3px}
.logo-sub{font-size:11px;color:var(--muted);margin-top:1px}
.table-pill{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#000;font-weight:700;font-size:12px;padding:5px 14px;border-radius:999px;white-space:nowrap;}
.btn-staff{
  display:flex;align-items:center;gap:7px;
  background:transparent;border:1px solid var(--gold);color:var(--gold2);
  padding:8px 14px;border-radius:8px;
  font-family:inherit;font-size:13px;font-weight:600;
  cursor:pointer;transition:all .2s;white-space:nowrap;
}
.btn-staff:hover{background:var(--gold-glow);border-color:var(--gold2)}

/* ── APP BODY ── */
.app-body{display:flex;flex:1;overflow:hidden;}

/* ── TABLE SCREEN ── */
#table-screen{width:100%;padding:40px 24px;overflow-y:auto;}
#table-screen h2{font-family:'Playfair Display',serif;font-size:26px;color:var(--gold2);margin-bottom:8px;}
#table-screen p{color:var(--muted);margin-bottom:28px;font-size:14px}
.tables-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px;max-width:700px;}
.table-btn{
  background:var(--surface2);border:2px solid var(--border);border-radius:var(--radius);
  padding:22px 12px;color:var(--text);text-align:center;cursor:pointer;
  transition:all .2s;position:relative;overflow:hidden;
}
.table-btn:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 8px 24px rgba(200,146,42,.12)}
.table-btn .t-icon{display:flex;justify-content:center;margin-bottom:10px;color:var(--muted)}
.table-btn .t-name{font-weight:700;font-size:14px;margin-bottom:4px}
.table-btn .t-status{font-size:11px;color:var(--muted)}
.table-btn.occupied{border-color:var(--red)}
.table-btn.occupied .t-status{color:var(--red)}
.table-btn.occupied .t-dot{display:block!important}
.t-dot{display:none;position:absolute;top:10px;right:10px;width:8px;height:8px;border-radius:50%;background:var(--red);animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.5)}}

/* ── MAIN ── */
#main-screen{display:none;width:100%;overflow:hidden}
.main-layout{display:flex;height:100%;overflow:hidden}

/* ── MENU PANEL ── */
.menu-panel{flex:1;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid var(--border);}
.menu-top{padding:14px 16px 0;flex-shrink:0;}
.search-wrap{position:relative;margin-bottom:12px;}
.search-wrap .s-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted);pointer-events:none;}
#search-input{
  width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:10px;
  padding:10px 14px 10px 38px;color:var(--text);font-family:inherit;font-size:14px;
  outline:none;transition:border-color .2s;
}
#search-input:focus{border-color:var(--gold)}
#search-input::placeholder{color:var(--muted)}
.cat-tabs{display:flex;gap:6px;overflow-x:auto;padding-bottom:12px;scrollbar-width:none;}
.cat-tabs::-webkit-scrollbar{display:none}
.cat-tab{flex-shrink:0;padding:7px 18px;border-radius:999px;border:1px solid var(--border);background:var(--surface2);color:var(--muted);font-size:13px;font-family:inherit;cursor:pointer;transition:all .15s;white-space:nowrap;}
.cat-tab.active,.cat-tab:hover{background:var(--gold);border-color:var(--gold);color:#000;font-weight:700;}
.menu-scroll{flex:1;overflow-y:auto;padding:0 16px 16px;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
.menu-scroll::-webkit-scrollbar{width:4px}
.menu-scroll::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.menu-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px;}

/* ── MENU CARD ── */
.menu-card{background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;cursor:pointer;transition:all .18s;display:flex;flex-direction:column;position:relative;}
.menu-card:hover{border-color:var(--gold);transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,.5)}
.menu-card.unavailable{opacity:.35;pointer-events:none}
.card-thumb{width:100%;height:120px;background:var(--surface3);display:flex;align-items:center;justify-content:center;}
.card-thumb svg{color:var(--border)}
.card-body{padding:10px 12px 12px}
.card-cat{font-size:10px;color:var(--gold);font-weight:700;text-transform:uppercase;letter-spacing:.6px;margin-bottom:4px}
.card-name{font-size:13px;font-weight:600;line-height:1.35;margin-bottom:5px}
.card-stock{font-size:10px;color:var(--muted);margin-bottom:8px;display:flex;align-items:center;gap:4px}
.card-footer{display:flex;align-items:center;justify-content:space-between}
.card-price{font-size:14px;font-weight:700;color:var(--gold2)}
.card-add{width:30px;height:30px;background:var(--gold);color:#000;border-radius:8px;border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s;flex-shrink:0;}
.card-add:hover{background:var(--gold2);transform:scale(1.1)}
.card-add svg{pointer-events:none}

/* ── ORDER PANEL ── */
.order-panel{width:300px;display:flex;flex-direction:column;background:var(--surface);flex-shrink:0;}
.order-tabs{display:flex;border-bottom:1px solid var(--border);flex-shrink:0;}
.o-tab{flex:1;padding:14px 8px;text-align:center;font-size:12px;font-weight:600;color:var(--muted);cursor:pointer;border:none;background:none;font-family:inherit;transition:all .15s;border-bottom:2px solid transparent;display:flex;align-items:center;justify-content:center;gap:6px;}
.o-tab.active{color:var(--gold2);border-bottom-color:var(--gold)}
.o-tab svg{flex-shrink:0}

/* ── CART VIEW ── */
#cart-view{flex:1;display:flex;flex-direction:column;overflow:hidden}
.cart-scroll{flex:1;overflow-y:auto;padding:12px;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
.cart-scroll::-webkit-scrollbar{width:4px}
.cart-scroll::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.empty-state{text-align:center;padding:48px 20px;color:var(--muted);}
.empty-state .e-icon{display:flex;justify-content:center;margin-bottom:12px;opacity:.35;}
.empty-state p{font-size:13px;line-height:1.6}
.cart-item{background:var(--surface2);border-radius:10px;padding:10px;margin-bottom:8px;display:flex;gap:8px;align-items:flex-start;animation:fadeUp .2s ease;}
@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.ci-info{flex:1;min-width:0}
.ci-name{font-size:12px;font-weight:600;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ci-unit{font-size:11px;color:var(--muted)}
.ci-subtotal{font-size:12px;color:var(--gold2);font-weight:700;margin-top:3px}
.ci-note input{margin-top:5px;width:100%;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:11px;color:var(--text);font-family:inherit;outline:none;}
.ci-note input::placeholder{color:var(--muted)}
.ci-note input:focus{border-color:var(--gold)}
.ci-actions{display:flex;flex-direction:column;align-items:center;gap:4px}
.qty-btn{width:24px;height:24px;border-radius:6px;border:1px solid var(--border);background:var(--surface);color:var(--text);font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
.qty-btn:hover{background:var(--gold);border-color:var(--gold);color:#000}
.qty-btn.minus:hover{background:var(--red);border-color:var(--red);color:#fff}
.qty-num{font-size:13px;font-weight:700}
.ci-del{background:none;border:none;color:var(--muted);cursor:pointer;padding:2px;transition:color .15s;display:flex;align-items:center;justify-content:center;}
.ci-del:hover{color:var(--red)}
.cart-footer{padding:12px;border-top:1px solid var(--border);flex-shrink:0;}
.summary-row{display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px;}
.summary-row .lbl{color:var(--muted)}
.summary-total{display:flex;justify-content:space-between;font-size:15px;font-weight:700;margin-bottom:12px;padding-top:8px;border-top:1px solid var(--border);}
.summary-total .amt{color:var(--gold2);font-size:17px}
.btn-send{width:100%;padding:13px;background:linear-gradient(135deg,var(--gold),var(--gold2));color:#000;border:none;border-radius:10px;font-size:14px;font-weight:700;font-family:inherit;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;}
.btn-send:hover{transform:translateY(-1px);box-shadow:0 8px 24px var(--gold-glow)}
.btn-send:disabled{opacity:.4;pointer-events:none}
.btn-history{width:100%;margin-top:8px;padding:10px;background:transparent;border:1px solid var(--border);color:var(--muted);border-radius:10px;font-size:13px;font-family:inherit;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px;}
.btn-history:hover{border-color:var(--gold);color:var(--gold2)}

/* ── HISTORY VIEW ── */
#history-view{flex:1;display:none;flex-direction:column;overflow:hidden}
.history-scroll{flex:1;overflow-y:auto;padding:12px;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
.history-scroll::-webkit-scrollbar{width:4px}
.history-scroll::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.order-group{background:var(--surface2);border-radius:10px;margin-bottom:10px;overflow:hidden;}
.og-header{padding:10px 12px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
.og-time{font-size:11px;color:var(--muted);display:flex;align-items:center;gap:5px;}
.og-total{font-size:12px;font-weight:700;color:var(--gold2)}
.og-item{padding:8px 12px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,.03);}
.og-item:last-child{border-bottom:none}
.og-name{font-size:12px;color:var(--text)}
.og-meta{display:flex;align-items:center;gap:8px;font-size:11px}
.og-price{color:var(--muted)}
.badge{padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700;display:flex;align-items:center;gap:3px;}
.badge-done{background:rgba(76,175,125,.15);color:var(--green)}
.badge-pending{background:rgba(200,146,42,.15);color:var(--gold)}
.history-total{padding:12px;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-weight:700;font-size:14px;flex-shrink:0;}
.history-total span:last-child{color:var(--gold2)}

/* ── STAFF MODAL ── */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;z-index:500;opacity:0;pointer-events:none;transition:opacity .2s;}
.modal-overlay.open{opacity:1;pointer-events:all}
.modal{background:var(--surface2);border:1px solid var(--border);border-radius:20px;padding:28px 24px;width:min(340px,90vw);transform:scale(.95) translateY(10px);transition:transform .2s;}
.modal-overlay.open .modal{transform:scale(1) translateY(0)}
.modal-header{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.modal-header-icon{width:38px;height:38px;background:var(--gold-glow);border:1px solid var(--gold);border-radius:10px;display:flex;align-items:center;justify-content:center;color:var(--gold2);flex-shrink:0;}
.modal h3{font-family:'Playfair Display',serif;font-size:18px;color:var(--gold2);}
.modal-desc{font-size:13px;color:var(--muted);margin-bottom:18px;line-height:1.5}
.reason-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;}
.reason-btn{padding:11px 8px;background:var(--surface3);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:inherit;font-size:12px;font-weight:600;cursor:pointer;text-align:center;transition:all .15s;display:flex;flex-direction:column;align-items:center;gap:6px;}
.reason-btn .r-icon{width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--muted);transition:color .15s;}
.reason-btn:hover,.reason-btn.selected{border-color:var(--gold);background:var(--gold-glow);color:var(--gold2);}
.reason-btn:hover .r-icon,.reason-btn.selected .r-icon{color:var(--gold2)}
.modal-note{margin-bottom:14px;}
.modal-note input{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:9px 13px;color:var(--text);font-family:inherit;font-size:13px;outline:none;}
.modal-note input:focus{border-color:var(--gold)}
.modal-btns{display:flex;gap:8px;}
.btn-cancel{flex:1;padding:11px;border-radius:9px;background:var(--surface);border:1px solid var(--border);color:var(--muted);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;}
.btn-cancel:hover{color:var(--text)}
.btn-confirm{flex:1;padding:11px;border-radius:9px;background:var(--gold);border:none;color:#000;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:all .15s;}
.btn-confirm:hover{background:var(--gold2)}

/* ── SUCCESS OVERLAY ── */
.success-overlay{position:fixed;inset:0;z-index:600;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s;}
.success-overlay.show{opacity:1}
.success-box{background:var(--surface2);border:1px solid var(--green);border-radius:20px;padding:32px 28px;text-align:center;transform:scale(.9);transition:transform .3s;min-width:220px;}
.success-overlay.show .success-box{transform:scale(1)}
.s-icon-wrap{display:flex;justify-content:center;margin-bottom:14px;}
.s-icon-wrap .s-circle{width:56px;height:56px;border-radius:50%;background:rgba(76,175,125,.15);border:1px solid var(--green);display:flex;align-items:center;justify-content:center;color:var(--green);}
.success-box h3{font-size:17px;font-weight:700;color:var(--green);margin-bottom:6px}
.success-box p{font-size:13px;color:var(--muted)}

/* ── TOAST ── */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%);padding:11px 22px;border-radius:999px;font-weight:600;font-size:13px;z-index:9999;opacity:0;pointer-events:none;transition:opacity .25s;white-space:nowrap;}
.toast.gold{background:var(--gold);color:#000}
.toast.green{background:var(--green);color:#000}
.toast.red{background:var(--red);color:#fff}
.toast.show{opacity:1}

/* ── MOBILE ── */
@media(max-width:640px){
  .order-panel{position:fixed;bottom:0;left:0;right:0;width:100%;height:56vh;z-index:200;transform:translateY(calc(100% - 50px));transition:transform .3s ease;border-top:1px solid var(--border);border-radius:20px 20px 0 0;}
  .order-panel.open{transform:translateY(0)}
  .menu-panel{height:calc(100vh - 57px - 50px)}
  .main-layout{flex-direction:column;height:calc(100vh - 57px)}
  .btn-staff span{display:none}
}
#table-screen{
  display:flex;
  flex-direction:column;
  align-items:center;
}

</style>
</head>
<body>

<header>
  <div class="logo-area">
    <div class="logo-icon">
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#000" stroke-width="2.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    </div>
    <div>
      <div class="logo-text">ORDER (KHÁCH HÀNG)</div>
      <div class="logo-sub" id="hdr-sub">Chọn bàn để bắt đầu</div>
    </div>
  </div>
  <div id="hdr-table" class="table-pill" style="display:none"></div>
  <button class="btn-staff" id="btn-call-staff" onclick="openStaffModal()" style="display:none">
    <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
    </svg>
    <span>Gọi nhân viên</span>
  </button>
</header>

<div class="app-body">

<!-- TABLE SCREEN -->
<div id="table-screen">
  <h2>Chọn bàn của bạn</h2>
  <p>Nhấn vào bàn để bắt đầu đặt món</p>
  <div class="tables-grid" id="tables-grid"></div>
</div>

<!-- MAIN SCREEN -->
<div id="main-screen">
  <div class="main-layout">

    <!-- Menu -->
    <div class="menu-panel">
      <div class="menu-top">
        <div class="search-wrap">
          <svg class="s-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" id="search-input" placeholder="Tìm món..."/>
        </div>
        <div class="cat-tabs" id="cat-tabs"></div>
      </div>
      <div class="menu-scroll">
        <div class="menu-grid" id="menu-grid"></div>
      </div>
    </div>

    <!-- Order Panel -->
    <div class="order-panel" id="order-panel">
      <div class="order-tabs" id="order-tabs">
        <button class="o-tab active" data-tab="cart">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          Đơn hàng
        </button>
        <button class="o-tab" data-tab="history">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          Lịch sử
        </button>
      </div>

      <!-- Cart -->
      <div id="cart-view">
        <div class="cart-scroll" id="cart-scroll">
          <div class="empty-state">
            <div class="e-icon">
              <svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <p>Chưa có món nào<br>Thêm món từ thực đơn nhé!</p>
          </div>
        </div>
        <div class="cart-footer">
          <div id="summary-rows"></div>
          <div class="summary-total">
            <span>Tổng cộng</span>
            <span class="amt" id="grand-total">0đ</span>
          </div>
          <button class="btn-send" id="btn-send" disabled onclick="submitOrder()">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
            </svg>
            Gửi lên bếp
          </button>
          <button class="btn-history" onclick="switchTab('history')">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Lịch sử đơn hàng
          </button>
        </div>
      </div>

      <!-- History -->
      <div id="history-view">
        <div class="history-scroll" id="history-scroll"></div>
        <div class="history-total">
          <span>Tổng đã gọi</span>
          <span id="history-grand">0đ</span>
        </div>
      </div>
    </div>

  </div>
</div>
</div><!-- app-body -->

<!-- STAFF MODAL -->
<div class="modal-overlay" id="staff-modal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-header-icon">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
        </svg>
      </div>
      <h3>Gọi nhân viên</h3>
    </div>
    <p class="modal-desc">Chọn lý do để nhân viên hỗ trợ bạn nhanh hơn</p>
    <div class="reason-grid" id="reason-grid"></div>
    <div class="modal-note">
      <input type="text" id="staff-note" placeholder="Ghi chú thêm (nếu có)..."/>
    </div>
    <div class="modal-btns">
      <button class="btn-cancel" onclick="closeStaffModal()">Huỷ</button>
      <button class="btn-confirm" onclick="confirmCallStaff()">Gọi ngay</button>
    </div>
  </div>
</div>

<!-- SUCCESS OVERLAY -->
<div class="success-overlay" id="success-overlay">
  <div class="success-box">
    <div class="s-icon-wrap"><div class="s-circle" id="success-icon-wrap"></div></div>
    <h3 id="success-title">Đã gửi thành công!</h3>
    <p id="success-msg">Nhân viên sẽ xử lý ngay</p>
  </div>
</div>

<!-- TOAST -->
<div class="toast" id="toast"></div>

<script>
// ── SVG helpers ──
const SVG = {
  chair:`<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12v7m14-7v7m-9 0h4"/></svg>`,
  vip:`<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>`,
  plate:`<svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  clock:`<svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" d="M12 6v6l4 2"/></svg>`,
  check:`<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>`,
  send:`<svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>`,
  bell:`<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/></svg>`,
  trash:`<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>`,
  paper:`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg>`,
  utensils:`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>`,
  card:`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/></svg>`,
  warn:`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>`,
  chat:`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/></svg>`,
  dots:`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>`,
  food:`<svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M6 13.121v4.129a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 17.25v-4.129M6 13.121a2.25 2.25 0 01-2.25-2.25V9.75A2.25 2.25 0 016 7.5h12A2.25 2.25 0 0120.25 9.75v1.121A2.25 2.25 0 0118 13.12"/></svg>`,
};

// ══════════════════════════════════════════════════════
// MOCK DATA
// ══════════════════════════════════════════════════════
const TABLES = [
  {id:1,name:'Bàn 1',vip:false,status:'free'},
  {id:2,name:'Bàn 2',vip:false,status:'occupied'},
  {id:3,name:'Bàn 3',vip:false,status:'free'},
  {id:4,name:'Bàn 4',vip:false,status:'free'},
  {id:5,name:'Bàn 5',vip:false,status:'occupied'},
  {id:6,name:'Bàn 6',vip:false,status:'free'},
  {id:7,name:'VIP 1',vip:true,status:'free'},
  {id:8,name:'VIP 2',vip:true,status:'occupied'},
];

const MENU = [
  {id:1,name:'Chả giò',cat:'Khai vị',price:40000,qty:20,avail:true},
  {id:2,name:'Gỏi cuốn',cat:'Khai vị',price:35000,qty:15,avail:true},
  {id:3,name:'Cháo gà',cat:'Khai vị',price:45000,qty:10,avail:true},
  {id:4,name:'Sườn nướng',cat:'Món chính',price:120000,qty:8,avail:true},
  {id:5,name:'Bò lúc lắc',cat:'Món chính',price:120000,qty:6,avail:true},
  {id:6,name:'Cá hồi nướng',cat:'Món chính',price:150000,qty:5,avail:true},
  {id:7,name:'Phở bò',cat:'Món chính',price:75000,qty:20,avail:true},
  {id:8,name:'Bún riêu',cat:'Món chính',price:68000,qty:0,avail:false},
  {id:9,name:'Nước cam',cat:'Đồ uống',price:25000,qty:99,avail:true},
  {id:10,name:'Trà sữa',cat:'Đồ uống',price:30000,qty:30,avail:true},
  {id:11,name:'Bia Hà Nội',cat:'Đồ uống',price:30000,qty:40,avail:true},
  {id:12,name:'Trà đá',cat:'Đồ uống',price:10000,qty:99,avail:true},
  {id:13,name:'Chè ba màu',cat:'Tráng miệng',price:35000,qty:15,avail:true},
  {id:14,name:'Kem dừa',cat:'Tráng miệng',price:40000,qty:12,avail:true},
];

const STAFF_REASONS = [
  {svg:SVG.paper,label:'Thêm khăn giấy'},
  {svg:SVG.utensils,label:'Thêm dụng cụ'},
  {svg:SVG.card,label:'Thanh toán'},
  {svg:SVG.warn,label:'Vấn đề món ăn'},
  {svg:SVG.chat,label:'Tư vấn menu'},
  {svg:SVG.dots,label:'Khác'},
];

const HISTORY_DATA = {
  2:[
    {time:'18:32',items:[{name:'Phở bò',qty:2,price:75000,status:'done'},{name:'Trà đá',qty:2,price:10000,status:'done'}]},
    {time:'18:55',items:[{name:'Bia Hà Nội',qty:3,price:30000,status:'pending'}]},
  ],
  5:[{time:'19:10',items:[{name:'Sườn nướng',qty:1,price:120000,status:'done'},{name:'Nước cam',qty:2,price:25000,status:'pending'}]}],
  8:[{time:'17:45',items:[{name:'Bò lúc lắc',qty:2,price:120000,status:'done'},{name:'Bia Hà Nội',qty:4,price:30000,status:'done'}]}],
};

// ══════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════
let menuItems = MENU.map(m=>({...m}));
let cart=[], history=[], selectedTable=null, activeCat='Tất cả', selectedReason=null, toastTimer;

// ══════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════
function init(){
  renderTables();
  document.getElementById('search-input').addEventListener('input',renderMenu);
  document.getElementById('order-tabs').addEventListener('click',e=>{
    const tab=e.target.closest('.o-tab');
    if(tab){ switchTab(tab.dataset.tab); document.getElementById('order-panel').classList.add('open'); }
  });
  document.getElementById('staff-modal').addEventListener('click',e=>{
    if(e.target===e.currentTarget) closeStaffModal();
  });
}

// ══════════════════════════════════════════════════════
// TABLES
// ══════════════════════════════════════════════════════
function renderTables(){
  const grid=document.getElementById('tables-grid');
  grid.innerHTML='';
  TABLES.forEach(t=>{
    const btn=document.createElement('button');
    btn.className='table-btn'+(t.status==='occupied'?' occupied':'');
    btn.innerHTML=`
      <div class="t-icon" style="color:${t.vip?'var(--gold)':'var(--muted)'}">${t.vip?SVG.vip:SVG.chair}</div>
      <div class="t-name">${t.name}</div>
      <div class="t-status">${t.status==='occupied'?'Đang phục vụ':'Trống'}</div>
      <div class="t-dot"></div>`;
    btn.onclick=()=>selectTable(t);
    grid.appendChild(btn);
  });
}

function selectTable(t){
  selectedTable=t; history=[...(HISTORY_DATA[t.id]||[])]; cart=[];
  document.getElementById('table-screen').style.display='none';
  document.getElementById('main-screen').style.display='block';
  document.getElementById('hdr-table').style.display='block';
  document.getElementById('hdr-table').textContent=t.name;
  document.getElementById('hdr-sub').textContent=t.name+' • Đang phục vụ';
  document.getElementById('btn-call-staff').style.display='flex';
  renderCats(); renderMenu(); renderCart(); renderHistory(); switchTab('cart');
}

// ══════════════════════════════════════════════════════
// MENU
// ══════════════════════════════════════════════════════
function renderCats(){
  const cats=['Tất cả',...new Set(menuItems.map(m=>m.cat))];
  const tabs=document.getElementById('cat-tabs');
  tabs.innerHTML='';
  cats.forEach(cat=>{
    const btn=document.createElement('button');
    btn.className='cat-tab'+(cat===activeCat?' active':'');
    btn.textContent=cat;
    btn.onclick=()=>{activeCat=cat;renderCats();renderMenu();};
    tabs.appendChild(btn);
  });
}

function renderMenu(){
  const q=document.getElementById('search-input').value.toLowerCase();
  let items=menuItems;
  if(activeCat!=='Tất cả') items=items.filter(m=>m.cat===activeCat);
  if(q) items=items.filter(m=>m.name.toLowerCase().includes(q));
  const grid=document.getElementById('menu-grid');
  grid.innerHTML='';
  items.forEach(item=>{
    const avail=item.avail&&item.qty>0;
    const card=document.createElement('div');
    card.className='menu-card'+(avail?'':' unavailable');
    card.innerHTML=`
      <div class="card-thumb">${SVG.food}</div>
      <div class="card-body">
        <div class="card-cat">${item.cat}</div>
        <div class="card-name">${item.name}</div>
        <div class="card-stock">
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            ${item.qty>0?'<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>':'<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'}
          </svg>
          ${item.qty>0?'Còn '+item.qty+' phần':'Hết món'}
        </div>
        <div class="card-footer">
          <span class="card-price">${fmt(item.price)}</span>
          ${avail?`<button class="card-add" onclick="addToCart(event,${item.id})">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
            </svg>
          </button>`:''}
        </div>
      </div>`;
    if(avail) card.onclick=e=>{if(!e.target.closest('.card-add'))addToCart(e,item.id);};
    grid.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
// CART
// ══════════════════════════════════════════════════════
function addToCart(e,id){
  e&&e.stopPropagation&&e.stopPropagation();
  const item=menuItems.find(m=>m.id===id);
  const existing=cart.find(c=>c.id===id);
  const curQty=existing?existing.qty:0;
  if(curQty>=item.qty){showToast('Chỉ còn '+item.qty+' phần','red');return;}
  if(existing){existing.qty++;}
  else{cart.push({id:item.id,name:item.name,price:item.price,qty:1,note:''});}
  document.getElementById('order-panel').classList.add('open');
  renderCart();
  showToast('Đã thêm '+item.name,'gold');
}

function changeQty(idx,delta){
  const c=cart[idx];
  const m=menuItems.find(m=>m.id===c.id);
  if(delta>0&&c.qty>=m.qty){showToast('Chỉ còn '+m.qty+' phần','red');return;}
  c.qty+=delta;
  if(c.qty<=0) cart.splice(idx,1);
  renderCart();
}

function removeItem(idx){cart.splice(idx,1);renderCart();}

function renderCart(){
  const scroll=document.getElementById('cart-scroll');
  const btn=document.getElementById('btn-send');
  const grandEl=document.getElementById('grand-total');
  const sumEl=document.getElementById('summary-rows');
  const count=cart.reduce((s,c)=>s+c.qty,0);
  const total=cart.reduce((s,c)=>s+c.price*c.qty,0);
  grandEl.textContent=fmt(total);
  btn.disabled=cart.length===0;
  sumEl.innerHTML=cart.length?`<div class="summary-row"><span class="lbl">Số lượng</span><span>${count} phần</span></div>`:'';
  if(!cart.length){
    scroll.innerHTML=`<div class="empty-state">
      <div class="e-icon"><svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg></div>
      <p>Chưa có món nào<br>Thêm món từ thực đơn nhé!</p>
    </div>`;
    return;
  }
  scroll.innerHTML='';
  cart.forEach((item,idx)=>{
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-unit">${fmt(item.price)} / phần</div>
        <div class="ci-subtotal">${fmt(item.price*item.qty)}</div>
        <div class="ci-note"><input type="text" placeholder="Ghi chú (ít cay, không hành...)" value="${item.note}" oninput="cart[${idx}].note=this.value"/></div>
      </div>
      <div class="ci-actions">
        <button class="ci-del" onclick="removeItem(${idx})" title="Xoá">${SVG.trash}</button>
        <button class="qty-btn" onclick="changeQty(${idx},1)">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        </button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn minus" onclick="changeQty(${idx},-1)">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"/></svg>
        </button>
      </div>`;
    scroll.appendChild(div);
  });
}

function submitOrder(){
  if(!cart.length)return;
  const btn=document.getElementById('btn-send');
  btn.disabled=true;
  btn.innerHTML=`<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="animation:spin .8s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg> Đang gửi...`;
  cart.forEach(c=>{const m=menuItems.find(m=>m.id===c.id);if(m)m.qty=Math.max(0,m.qty-c.qty);});
  const now=new Date();
  const t=`${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
  history.push({time:t,items:cart.map(c=>({name:c.name,qty:c.qty,price:c.price,note:c.note,status:'pending'}))});
  setTimeout(()=>{
    cart=[];renderCart();renderMenu();renderHistory();
    showSuccess(SVG.check,'Đã gửi lên bếp!','Vui lòng đợi trong giây lát');
    btn.disabled=false;
    btn.innerHTML=`${SVG.send.replace('width="22"','width="16"').replace('height="22"','height="16"')} Gửi lên bếp`;
  },700);
}

// ══════════════════════════════════════════════════════
// HISTORY
// ══════════════════════════════════════════════════════
function renderHistory(){
  const scroll=document.getElementById('history-scroll');
  const grandEl=document.getElementById('history-grand');
  if(!history.length){
    scroll.innerHTML=`<div class="empty-state">
      <div class="e-icon"><svg width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
      </svg></div>
      <p>Chưa có đơn nào<br>được gọi cho bàn này</p>
    </div>`;
    grandEl.textContent='0đ'; return;
  }
  scroll.innerHTML='';let grand=0;
  history.forEach(group=>{
    const gt=group.items.reduce((s,i)=>s+i.price*i.qty,0);grand+=gt;
    const div=document.createElement('div');div.className='order-group';
    div.innerHTML=`
      <div class="og-header">
        <span class="og-time">${SVG.clock} ${group.time}</span>
        <span class="og-total">${fmt(gt)}</span>
      </div>
      ${group.items.map(i=>`
        <div class="og-item">
          <span class="og-name">${i.qty}× ${i.name}${i.note?` <em style="color:var(--muted);font-size:10px">(${i.note})</em>`:''}</span>
          <div class="og-meta">
            <span class="og-price">${fmt(i.price*i.qty)}</span>
            <span class="badge ${i.status==='done'?'badge-done':'badge-pending'}">
              ${i.status==='done'?SVG.check+'Xong':'Đang chờ'}
            </span>
          </div>
        </div>`).join('')}`;
    scroll.appendChild(div);
  });
  grandEl.textContent=fmt(grand);
}

// ══════════════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════════════
function switchTab(tab){
  document.querySelectorAll('.o-tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===tab));
  document.getElementById('cart-view').style.display=tab==='cart'?'flex':'none';
  document.getElementById('history-view').style.display=tab==='history'?'flex':'none';
  if(tab==='history') renderHistory();
}

// ══════════════════════════════════════════════════════
// STAFF MODAL
// ══════════════════════════════════════════════════════
function openStaffModal(){
  selectedReason=null;
  document.getElementById('staff-note').value='';
  const grid=document.getElementById('reason-grid');
  grid.innerHTML='';
  STAFF_REASONS.forEach((r,i)=>{
    const btn=document.createElement('button');
    btn.className='reason-btn';
    btn.innerHTML=`<span class="r-icon">${r.svg}</span>${r.label}`;
    btn.onclick=()=>{selectedReason=i;document.querySelectorAll('.reason-btn').forEach((b,j)=>b.classList.toggle('selected',j===i));};
    grid.appendChild(btn);
  });
  document.getElementById('staff-modal').classList.add('open');
}
function closeStaffModal(){document.getElementById('staff-modal').classList.remove('open');}
function confirmCallStaff(){
  closeStaffModal();
  const reason=selectedReason!==null?STAFF_REASONS[selectedReason].label:'';
  const note=document.getElementById('staff-note').value;
  showSuccess(SVG.bell,'Nhân viên đang đến!',reason+(note?' – '+note:''));
}

// ══════════════════════════════════════════════════════
// SUCCESS / TOAST
// ══════════════════════════════════════════════════════
function showSuccess(iconSvg,title,msg){
  const o=document.getElementById('success-overlay');
  document.getElementById('success-icon-wrap').innerHTML=iconSvg;
  document.getElementById('success-title').textContent=title;
  document.getElementById('success-msg').textContent=msg||'';
  o.classList.add('show');
  setTimeout(()=>o.classList.remove('show'),2200);
}

function fmt(n){return Number(n).toLocaleString('vi-VN')+'đ';}

function showToast(msg,type='green'){
  const t=document.getElementById('toast');
  t.className=`toast ${type}`;void t.offsetWidth;
  t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2000);
}

// spin animation for loading
const style=document.createElement('style');
style.textContent='@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}';
document.head.appendChild(style);

init();
</script>
</body>
</html>