const escpos = require('escpos');
escpos.Network = require('escpos-network');

// IP máy in bếp
const PRINTER_IP = '192.168.1.50';

async function printKitchen(order) {

  return new Promise((resolve, reject) => {

    const device = new escpos.Network(PRINTER_IP);

    device.open((err) => {

      if (err) {
        console.log('❌ Không kết nối được máy in:', err.message);
        return reject(err);
      }

      const printer = new escpos.Printer(device);

      printer
        .align('CT')
        .style('B')
        .size(2, 2)
        .text('ORDER BẾP')

        .size(1, 1)
        .text('--------------------------')

        .align('LT')
        .text(`Bàn: ${order.table}`)
        .text(`Giờ: ${new Date().toLocaleTimeString('vi-VN')}`)
        .text('');

      order.items.forEach((item) => {

        printer.text(`${item.quantity}x ${item.name}`);

        if (item.note) {
          printer.text(`   * ${item.note}`);
        }

      });

      printer
        .text('')
        .text('--------------------------')
        .align('CT')
        .text('GOOD LUCK')
        .feed(3)
        .cut()
        .close(() => {

          console.log('✅ Đã in bếp');

          resolve();

        });

    });

  });

}

module.exports = printKitchen;