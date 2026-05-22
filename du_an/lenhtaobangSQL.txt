-- ─── Database: nhahang ──────────────────────────────────────────────────────
CREATE DATABASE IF NOT EXISTS nhahang;
USE nhahang;

-- ─── Bảng bàn ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tables_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  status ENUM('empty','occupied','reserved') DEFAULT 'empty'
);

-- Thêm bàn mặc định nếu trống
INSERT INTO tables_list (name)
SELECT 'Bàn 1' UNION ALL
SELECT 'Bàn 2' UNION ALL
SELECT 'Bàn 3' UNION ALL
SELECT 'Bàn 4' UNION ALL
SELECT 'Bàn 5' UNION ALL
SELECT 'Bàn 6' UNION ALL
SELECT 'Bàn 7' UNION ALL
SELECT 'Bàn 8' UNION ALL
SELECT 'Bàn 9' UNION ALL
SELECT 'Bàn 10'
WHERE NOT EXISTS (SELECT 1 FROM tables_list);

-- ─── Bảng món ăn ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) DEFAULT 'Khác',
  price DECIMAL(10,0) NOT NULL,
  quantity INT DEFAULT 0,
  available TINYINT(1) DEFAULT 1,
  image VARCHAR(255) DEFAULT NULL
);

-- Thêm món mặc định nếu trống
INSERT INTO menu_items (name, category, price)
SELECT 'Phở Bò', 'Món chính', 65000 UNION ALL
SELECT 'Bún Bò', 'Món chính', 60000 UNION ALL
SELECT 'Cơm Sườn', 'Món chính', 55000 UNION ALL
SELECT 'Cơm Gà', 'Món chính', 55000 UNION ALL
SELECT 'Gỏi Cuốn', 'Khai vị', 35000 UNION ALL
SELECT 'Chả Giò', 'Khai vị', 40000 UNION ALL
SELECT 'Bia Saigon', 'Đồ uống', 25000 UNION ALL
SELECT 'Nước Ngọt', 'Đồ uống', 15000 UNION ALL
SELECT 'Cà Phê Sữa', 'Đồ uống', 30000 UNION ALL
SELECT 'Trà Đá', 'Đồ uống', 10000
WHERE NOT EXISTS (SELECT 1 FROM menu_items);

-- ─── Bảng đơn hàng ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_id INT NOT NULL,
  status ENUM('pending','done','paid') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (table_id) REFERENCES tables_list(id)
);

-- ─── Bảng chi tiết đơn hàng ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  menu_item_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,0) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  note TEXT,
  status ENUM('pending','done') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (menu_item_id) REFERENCES menu_items(id)
);

-- ─── Bảng settings ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  key_name VARCHAR(50) PRIMARY KEY,
  value TEXT
);

-- Thêm admin PIN nếu chưa tồn tại
INSERT INTO settings (key_name, value)
SELECT 'admin_pin', '1234'
WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key_name='admin_pin');

-- Thêm bill PIN nếu chưa tồn tại
INSERT INTO settings (key_name, value)
SELECT 'bill_pin', '0000'
WHERE NOT EXISTS (SELECT 1 FROM settings WHERE key_name='bill_pin');