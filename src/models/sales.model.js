const connection = require('./db/connection');

const insertNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUE (NOW())',
  );
  return insertId;
};

const insert = async (sales, newSaleId) => {
  await Promise.all(sales.map(async (sale) => {
    await connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id,product_id, quantity) VALUES (?, ?, ?)',
      [newSaleId, sale.productId, sale.quantity],
    );
  }));

  return newSaleId;
};

const findAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sa.id as saleId, sa.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales as sa
    INNER JOIN StoreManager.sales_products as sp on sa.id = sp.sale_id
    ORDER BY sa.id ASC, sp.product_id ASC;`,
  );

  console.log(result);
  return result;
};

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id as productId, sp.quantity
    FROM StoreManager.sales as sa
    INNER JOIN StoreManager.sales_products as sp on sa.id = sp.sale_id
    WHERE sa.id = (?) ORDER BY sa.id ASC, sp.product_id ASC;`,
    [id],
  );

  console.log(result);

  return result;
};

module.exports = {
  insert,
  insertNewSale,
  findAllSales,
  findSaleById,
};