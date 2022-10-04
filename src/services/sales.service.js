const productsModel = require('../models/products.model');
const salesModel = require('../models/sales.model');

const hasProductInDb = async (sales) => {
  const findId = await Promise.all(
    sales.map(({ productId }) => productsModel.findProductById(productId)),
  );

  if (findId.some((id) => id === undefined)) {
    return { type: 404, message: 'Product not found' };
  }
};

const insertSales = async (sales) => {
  console.log('teste');
  const result = await hasProductInDb(sales);
  console.log(result);
  if (result) return result;

  const newSaleId = await salesModel.insertNewSale(sales);
  await salesModel.insert(sales, newSaleId);

  return { type: null, message: { id: newSaleId, itemSold: sales } };
};

const getSales = async () => {
  const result = await salesModel.findAllSales();

  return { type: null, message: result };
};

const getSaleById = async (id) => {
  const result = await salesModel.findSaleById(id);

  if (result.length < 1) return { type: 404, message: 'Sale not found' };
  return { type: null, message: result };
};

module.exports = {
  insertSales,
  getSales,
  getSaleById,
};