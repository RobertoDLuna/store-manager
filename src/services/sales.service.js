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
  console.log('service sales');
  const result = await hasProductInDb(sales);
  if (result) return result;

  const newSaleId = await salesModel.insertNewSale();
  await salesModel.insert(sales, newSaleId);

  return { type: null, message: { id: newSaleId, itemsSold: sales } }; // precisa retornar certo
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

const removeSaleById = async (id) => {
  const result = await salesModel.findSaleById(id);

  if (result.length < 1) return { type: 404, message: 'Sale not found' };

  return salesModel.deleteById(id);
};

module.exports = {
  insertSales,
  getSales,
  getSaleById,
  removeSaleById,
};