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

module.exports = {
  insertSales,
};