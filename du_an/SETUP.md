# 🍜 Hướng dẫn cài đặt & chạy hệ thống nhà hàng

## Yêu cầu
- Windows 10/11
- Node.js (v18 trở lên)
- MySQL (v8 trở lên)

---

## Bước 1 — Cài Node.js

1. Truy cập: https://nodejs.org
2. Tải bản **LTS** (bên trái) → chạy file `.msi` → Next → Next → Finish
3. Mở **Command Prompt** (Win+R → gõ `cmd` → Enter), kiểm tra:
   ```
   node -v
   npm -v
   ```
   Nếu hiện số phiên bản là thành công ✅

---

## Bước 2 — Cài MySQL

1. Truy cập: https://dev.mysql.com/downloads/installer/
2. Tải **MySQL Installer for Windows** → chạy
3. Chọn **Developer Default** → Execute → Next → Next
4. Đặt **root password** (nhớ password này!)
5. Hoàn tất cài đặt

### Tạo database
Mở **MySQL Workbench** hoặc **MySQL Command Line**, chạy:
```sql
CREATE DATABASE restaurant CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

## Bước 3 — Cấu hình server.js

Mở file `server.js`, tìm đoạn:
```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',        // ← đổi thành password MySQL của bạn
  database: 'restaurant',
```
Thay `''` bằng password MySQL bạn đặt ở Bước 2.

---

## Bước 4 — Cài dependencies

Mở Command Prompt, `cd` vào thư mục chứa file:
```
cd C:\Users\TenBan\Desktop\restaurant-system
```

Cài các thư viện cần thiết:
```
npm init -y
npm install express socket.io mysql2
```

---

## Bước 5 — Chạy server

```
node server.js
```

Nếu thấy:
```
✅ Database initialized
🚀 Server running at http://localhost:3000
```
Là thành công! ✅

---

## Bước 6 — Mở các trang

Mở trình duyệt, truy cập:

| Trang | URL | Dùng cho |
|-------|-----|----------|
| Đặt món | http://localhost:3000/order.html | Nhân viên phục vụ / khách |
| Thu ngân | http://localhost:3000/bill.html | Thu ngân |
| Quản lý | http://localhost:3000/admin.html | Quản lý (PIN mặc định: **1234**) |

---

## Cấu trúc file

```
restaurant-system/
├── server.js       ← Backend (Node.js + Express + Socket.io + MySQL)
├── order.html      ← Trang đặt món
├── bill.html       ← Trang thu ngân
├── admin.html      ← Trang quản lý
├── package.json    ← (tự tạo sau npm init)
└── SETUP.md        ← File này
```

---

## Chạy tự động khi bật máy (tuỳ chọn)

Cài **PM2** để server tự khởi động:
```
npm install -g pm2
pm2 start server.js --name restaurant
pm2 startup
pm2 save
```

---

## Lỗi thường gặp

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `ECONNREFUSED 3306` | MySQL chưa chạy | Mở Services → Start MySQL |
| `Access denied for user 'root'` | Sai password | Kiểm tra lại password trong server.js |
| `Cannot find module 'express'` | Chưa cài npm | Chạy lại `npm install express socket.io mysql2` |
| Port 3000 bị chiếm | App khác dùng port | Đổi `const PORT = 3001` trong server.js |
| Trang trắng / lỗi 404 | Sai URL | Kiểm tra lại URL, đảm bảo server đang chạy |

---

## Đổi port (nếu cần)

Trong `server.js`, dòng cuối:
```js
const PORT = 3000;  // ← đổi thành 3001, 8080, v.v.
```

---

> 💡 **Tip:** Mở nhiều tab trình duyệt cùng lúc — `order.html` cho nhân viên, `bill.html` cho thu ngân, `admin.html` để quản lý. Các trang **tự động cập nhật realtime** qua Socket.io!
