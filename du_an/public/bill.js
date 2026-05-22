const escpos = require('escpos');
escpos.Network = require('escpos-network');

// IP máy in bill
const PRINTER_IP = '192.168.1.60';

async function printBill(order, tableName) {

  const device = new escpos.Network(PRINTER_IP);

  device.open((err) => {

    if (err) {
      console.log('❌ Không kết nối máy in bill:', err);
      return;
    }

    const printer = new escpos.Printer(device);

    let total = 0;

    printer
      .align('CT')
      .style('B')
      .size(2, 2)
      .text('NHA HANG')
      .size(1, 1)
      .text('----------------------')
      .align('LT')

      .text(`Ban: ${tableName}`)
      .text(`Don: #${order.id}`)
      .text(`Gio: ${new Date().toLocaleTimeString('vi-VN')}`)
      .text('');

    order.items.forEach(i => {

      const price = i.price * i.quantity;
      total += price;

      printer.text(
        `${i.quantity}x ${i.name}   ${price.toLocaleString()}d`
      );

      if (i.note) {
        printer.text(`   * ${i.note}`);
      }
    });

    const vat = Math.round(total * 0.1);

    printer
      .text('')
      .text('----------------------')
      .text(`Tam tinh: ${total.toLocaleString()}d`)
      .text(`VAT: ${vat.toLocaleString()}d`)
      .style('B')
      .text(`Tong: ${(total + vat).toLocaleString()}d`)
      .style('NORMAL')
      .text('')
      .align('CT')
      .text('Cam on quy khach')
      .feed(3)
      .cut()
      .close();

  });
}

module.exports = {
  printBill
};