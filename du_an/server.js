const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql2/promise');
const path = require('path');



//bật khi kết nối máy in
/* 
const printKitchen = require('./kitchen-print'); */
/* const { printBill } = require('./bill');
 */
//bật khi chưa có máy in
const printKitchen = async () => {};
const printBill = async () => {};




const app = express();
const server = http.createServer(app);
const io = new Server(server);
 

app.use(express.json());

// Serve folder images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const multer = require('multer');

// Cấu hình Multer: lưu trong /uploads, giữ tên gốc
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, path.join(__dirname, 'public/images')); // Lưu thẳng vào folder images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });


app.use(express.static(path.join(__dirname, 'public')));

// ─── MySQL Connection Pool ────────────────────────────────────────────────────
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Anhlong123',          // ← đổi thành password MySQL của bạn
  database: 'nhahang',
  waitForConnections: true,
  connectionLimit: 10,
});

// ─── Database Init ────────────────────────────────────────────────────────────
async function initDB() {
  const conn = await pool.getConnection();
  try {
    
    // Bảng bàn
    await conn.query(`
      CREATE TABLE IF NOT EXISTS tables_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        status ENUM('empty','occupied','reserved') DEFAULT 'empty'
      )
    `);

    // Bảng món ăn
  await conn.query(`
  CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'Khác',
    price DECIMAL(10,0) NOT NULL,
    quantity INT DEFAULT 0,
    available TINYINT(1) DEFAULT 1,
    image VARCHAR(255) DEFAULT NULL
  )
`);

    // Bảng đơn hàng
    await conn.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        table_id INT NOT NULL,
        status ENUM('pending','done','paid') DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
// Bảng chi tiết đơn hàng
await conn.query(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,0) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    note TEXT,
    status ENUM('pending','done') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
   try {
  await conn.query(`
    ALTER TABLE menu_items
    ADD COLUMN quantity INT DEFAULT 0
  `);
} catch (e) {}

    // Bảng settings
    await conn.query(`
      CREATE TABLE IF NOT EXISTS settings (
        key_name VARCHAR(50) PRIMARY KEY,
        value TEXT
      )
    `);

    // Default PIN admin
    const [pins] = await conn.query(`SELECT * FROM settings WHERE key_name='admin_pin'`);
    if (pins.length === 0) {
      await conn.query(`INSERT INTO settings (key_name, value) VALUES ('admin_pin','1234')`);
    }

    // Default bill PIN
    const [billPin] = await conn.query(`SELECT * FROM settings WHERE key_name='bill_pin'`);
    if (billPin.length === 0) {
      await conn.query(`INSERT INTO settings (key_name, value) VALUES ('bill_pin','0000')`);
    }

    // Default tables nếu trống
    const [tables] = await conn.query(`SELECT COUNT(*) as c FROM tables_list`);
    if (tables[0].c === 0) {
      for (let i = 1; i <= 10; i++) {
        await conn.query(`INSERT INTO tables_list (name) VALUES (?)`, [`Bàn ${i}`]);
      }
    }

    // Default menu nếu trống
    const [items] = await conn.query(`SELECT COUNT(*) as c FROM menu_items`);
    if (items[0].c === 0) {
      const defaults = [
        ['Phở Bò', 'Món chính', 65000],
        ['Bún Bò', 'Món chính', 60000],
        ['Cơm Sườn', 'Món chính', 55000],
        ['Cơm Gà', 'Món chính', 55000],
        ['Gỏi Cuốn', 'Khai vị', 35000],
        ['Chả Giò', 'Khai vị', 40000],
        ['Bia Saigon', 'Đồ uống', 25000],
        ['Nước Ngọt', 'Đồ uống', 15000],
        ['Cà Phê Sữa', 'Đồ uống', 30000],
        ['Trà Đá', 'Đồ uống', 10000],
      ];
      for (const [name, cat, price] of defaults) {
        await conn.query(`INSERT INTO menu_items (name, category, price) VALUES (?,?,?)`, [name, cat, price]);
      }
    }

    console.log('✅ Database initialized');
  } finally {
    conn.release();
  }
}
// ─── REST API ─────────────────────────────────────────────────────────────────

// Tables
app.get('/api/tables', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tables_list ORDER BY id');
  res.json(rows);
});

app.post('/api/tables', async (req, res) => {
  const { name } = req.body;
  const [result] = await pool.query('INSERT INTO tables_list (name) VALUES (?)', [name]);
  res.json({ id: result.insertId, name, status: 'empty' });
});

app.put('/api/tables/:id', async (req, res) => {
  const { name } = req.body;
  await pool.query('UPDATE tables_list SET name=? WHERE id=?', [name, req.params.id]);
  res.json({ ok: true });
});

app.delete('/api/tables/:id', async (req, res) => {
  await pool.query('DELETE FROM tables_list WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});

// Menu
app.get('/api/menu', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM menu_items ORDER BY category, name');
  res.json(rows);
});

app.post('/api/menu', async (req, res) => {
const { name, category, price, quantity, image } = req.body;
  const [result] = await pool.query(
   'INSERT INTO menu_items (name, category, price, quantity, image) VALUES (?,?,?,?,?)',
[name, category, price, quantity || 0, image ?? null]
  );
 res.json({
  id: result.insertId,
  name,
  category,
  price,
  quantity,
  available: 1,
  image
});
});

app.put('/api/menu/:id', async (req, res) => {
  const { name, category, price, quantity, available, image } = req.body;
  await pool.query(
    'UPDATE menu_items SET name=?, category=?, price=?, quantity=?, available=?, image=? WHERE id=?',
[
  name,
  category,
  price,
  quantity || 0,
  available ?? 1,
  image ?? null,
  req.params.id
]
  );
  res.json({ ok: true });
});

app.delete('/api/menu/:id', async (req, res) => {
  await pool.query('DELETE FROM menu_items WHERE id=?', [req.params.id]);
  res.json({ ok: true });
});
// Thêm món với ảnh
app.post('/api/menu/upload', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const image = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      'INSERT INTO menu_items (name, category, price, quantity, image) VALUES (?,?,?,?,?)',
      [name, category, price, quantity || 0, image]
    );

    res.json({
      ok: true,
      id: result.insertId,
      name,
      category,
      price,
      quantity,
      image
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Orders
app.get('/api/orders', async (req, res) => {
  const [orders] = await pool.query(
    `SELECT o.*, t.name as table_name FROM orders o
     LEFT JOIN tables_list t ON o.table_id = t.id
     WHERE o.status != 'paid' ORDER BY o.created_at DESC`
  );
  for (const order of orders) {
    const [items] = await pool.query(
      'SELECT * FROM order_items WHERE order_id=?', [order.id]
    );
    order.items = items;
  }
  res.json(orders);
});

app.get('/api/orders/table/:tableId', async (req, res) => {
  const [orders] = await pool.query(
    `SELECT * FROM orders WHERE table_id=? AND status!='paid' ORDER BY created_at DESC LIMIT 1`,
    [req.params.tableId]
  );
  if (orders.length === 0) return res.json(null);
  const order = orders[0];
  const [items] = await pool.query('SELECT * FROM order_items WHERE order_id=?', [order.id]);
  order.items = items;
  res.json(order);
});

app.post('/api/orders', async (req, res) => {

  const { table_id, items } = req.body;

  const conn = await pool.getConnection();

  try {

    await conn.beginTransaction();

    // tìm order pending của bàn
    let [existing] = await conn.query(
      `SELECT id FROM orders
       WHERE table_id=? AND status='pending'`,
      [table_id]
    );

    let orderId;

    // chưa có order → tạo mới
    if (existing.length > 0) {

      orderId = existing[0].id;

    } else {

      const [result] = await conn.query(
        'INSERT INTO orders (table_id) VALUES (?)',
        [table_id]
      );

      orderId = result.insertId;

      // đổi trạng thái bàn
      await conn.query(
        'UPDATE tables_list SET status="occupied" WHERE id=?',
        [table_id]
      );
    }

    // thêm món
    for (const item of items) {

      // check tồn kho
      const [menu] = await conn.query(
        'SELECT quantity FROM menu_items WHERE id=?',
        [item.menu_item_id]
      );

      if (!menu.length) {
        throw new Error('Món không tồn tại');
      }

      const currentQty = menu[0].quantity || 0;

      if (currentQty < item.quantity) {
        throw new Error(`${item.name} không đủ số lượng`);
      }

      // thêm order item
      await conn.query(
        `INSERT INTO order_items
        (order_id, menu_item_id, name, price, quantity, note)
        VALUES (?,?,?,?,?,?)`,
        [
          orderId,
          item.menu_item_id,
          item.name,
          item.price,
          item.quantity,
          item.note || ''
        ]
      );

      // trừ kho
      await conn.query(
        'UPDATE menu_items SET quantity = quantity - ? WHERE id=?',
        [item.quantity, item.menu_item_id]
      );

      // auto unavailable nếu hết
      await conn.query(`
        UPDATE menu_items
        SET available =
          CASE
            WHEN quantity <= 0 THEN 0
            ELSE 1
          END
        WHERE id=?
      `, [item.menu_item_id]);

    }

    // commit DB trước
    await conn.commit();

    // in bếp
  try {

  await printKitchen({
    table: `Bàn ${table_id}`,
    items
  });

} catch (err) {

  console.log('❌ Lỗi in bếp:', err.message);

}

    // realtime
    io.emit('order_updated', {
      table_id
    });

    res.json({
      ok: true,
      order_id: orderId
    });

  } catch (e) {

    await conn.rollback();

    res.status(500).json({
      error: e.message
    });

  } finally {

    conn.release();

  }

});

app.put('/api/orders/:id/pay', async (req, res) => {

  const [order] = await pool.query(
    'SELECT * FROM orders WHERE id=?',
    [req.params.id]
  );

  if (!order.length) {
    return res.status(404).json({ error: 'Not found' });
  }

  // lấy món
  const [items] = await pool.query(
    'SELECT * FROM order_items WHERE order_id=?',
    [req.params.id]
  );

  order[0].items = items;

  // update paid
  await pool.query(
    `UPDATE orders SET status='paid' WHERE id=?`,
    [req.params.id]
  );

  // trả bàn trống
  await pool.query(
    `UPDATE tables_list SET status='empty' WHERE id=?`,
    [order[0].table_id]
  );

  // lấy tên bàn
  const [table] = await pool.query(
    'SELECT * FROM tables_list WHERE id=?',
    [order[0].table_id]
  );

  // AUTO IN BILL
  await printBill(order[0], table[0].name);

  io.emit('order_updated', {
    table_id: order[0].table_id
  });

  res.json({ ok: true });

});
// Stats — doanh thu theo ngày
app.get('/api/stats', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ error: 'Missing from/to' });

  try {
    const [rows] = await pool.query(`
      SELECT
        DATE(o.created_at) AS date,
        COUNT(DISTINCT o.id) AS order_count,
        SUM(oi.price * oi.quantity) AS subtotal,
        ROUND(SUM(oi.price * oi.quantity) * 0.1) AS vat,
        ROUND(SUM(oi.price * oi.quantity) * 1.1) AS total
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      WHERE o.status = 'paid'
        AND DATE(o.created_at) BETWEEN ? AND ?
      GROUP BY DATE(o.created_at)
      ORDER BY date ASC
    `, [from, to]);

    res.json(rows);
  } catch (e) {
    console.error('Stats error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// Export — chi tiết từng món để xuất Excel
app.get('/api/export', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ error: 'Missing from/to' });
  try {
    const [rows] = await pool.query(`
      SELECT
        o.id AS order_id,
        t.name AS table_name,
        oi.name AS item_name,
        oi.quantity,
        oi.price,
        oi.note,
        o.created_at
      FROM orders o
      JOIN order_items oi ON oi.order_id = o.id
      JOIN tables_list t ON t.id = o.table_id
      WHERE o.status = 'paid'
        AND DATE(o.created_at) BETWEEN ? AND ?
      ORDER BY o.created_at ASC
    `, [from, to]);
    res.json(rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Verify admin PIN
app.post('/api/verify-pin', async (req, res) => {
  const { pin } = req.body;

  const [rows] = await pool.query(`
    SELECT value
    FROM settings
    WHERE key_name='admin_pin'
  `);

  res.json({
    ok: rows[0]?.value === pin
  });
});

// Verify bill PIN
app.post('/api/verify-bill-pin', async (req, res) => {
  const { pin } = req.body;

  const [rows] = await pool.query(`
    SELECT value
    FROM settings
    WHERE key_name='bill_pin'
  `);

  res.json({
    ok: rows[0]?.value === pin
  });
});


// Save admin PIN
app.post('/api/settings/admin-pin', async (req, res) => {
  try {
    const { pin } = req.body;

    await pool.query(`
      UPDATE settings
      SET value=?
      WHERE key_name='admin_pin'
    `, [pin]);

    res.json({ ok: true });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Save bill PIN
app.post('/api/settings/bill-pin', async (req, res) => {
  try {
    const { pin } = req.body;

    await pool.query(`
      UPDATE settings
      SET value=?
      WHERE key_name='bill_pin'
    `, [pin]);

    res.json({ ok: true });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// ─── Socket.io ────────────────────────────────────────────────────────────────
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// DONE món
app.put('/api/order-items/:id/done', async (req, res) => {
  try {

    await pool.query(
      `UPDATE order_items
       SET status='done'
       WHERE id=?`,
      [req.params.id]
    );

    io.emit('order_updated');

    res.json({ ok: true });

  } catch (e) {

    res.status(500).json({
      error: e.message
    });

  }
});

// XOÁ món
app.delete('/api/order-items/:id', async (req, res) => {
  try {

    // lấy item trước
    const [items] = await pool.query(
      `SELECT *
       FROM order_items
       WHERE id=?`,
      [req.params.id]
    );

    if (!items.length) {
      return res.status(404).json({
        error: 'Không tìm thấy món'
      });
    }

    const item = items[0];

    // trả lại kho
    await pool.query(
      `UPDATE menu_items
       SET quantity = quantity + ?
       WHERE id=?`,
      [item.quantity, item.menu_item_id]
    );

    // xoá item
    await pool.query(
      `DELETE FROM order_items
       WHERE id=?`,
      [req.params.id]
    );

    io.emit('order_updated');

    res.json({ ok: true });

  } catch (e) {

    res.status(500).json({
      error: e.message
    });

  }
});


app.put('/api/orders/:id/move', async (req, res) => {

  try {

    const newTableId =
      req.body.new_table_id || req.body.table_id;

    if (!newTableId) {
      return res.status(400).json({
        error: 'Thiếu table id'
      });
    }

    const [orders] = await pool.query(
      'SELECT * FROM orders WHERE id=?',
      [req.params.id]
    );

    if (!orders.length) {
      return res.status(404).json({
        error: 'Order not found'
      });
    }

    const order = orders[0];

    // bàn cũ -> empty
    await pool.query(
      'UPDATE tables_list SET status="empty" WHERE id=?',
      [order.table_id]
    );

    // update order
    await pool.query(
      'UPDATE orders SET table_id=? WHERE id=?',
      [newTableId, req.params.id]
    );

    // bàn mới -> occupied
    await pool.query(
      'UPDATE tables_list SET status="occupied" WHERE id=?',
      [newTableId]
    );

    io.emit('order_updated', {
      table_id: newTableId
    });

    res.json({ ok: true });

  } catch (e) {

    console.log(e);

    res.status(500).json({
      error: e.message
    });

  }

});

// ─── Start ────────────────────────────────────────────────────────────────────
const PORT = 3000;
initDB().then(() => {
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
}).catch(err => {
  console.error('❌ DB init failed:', err.message);
  process.exit(1);
});

