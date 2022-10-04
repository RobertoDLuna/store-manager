const connection = require('./db/connection');

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StorageManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insert = async (sales, newSaleId) => {
  await Promise.all(sales.map(async (sale) => {
    await connection.execute(
      'INSERT INTO storeManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?)',
      [newSaleId, sale.productId, sale.quantity],
    );
  }));
  return newSaleId;
};

module.exports = {
  insert,
  insertNewSale,
};