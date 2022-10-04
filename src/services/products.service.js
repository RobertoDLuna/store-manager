const productsModel = require('../models/products.model');

const getProducts = async () => {
  const result = await productsModel.findAllProducts();

  return { type: null, message: result };
};

const getProductById = async (id) => {
  const result = await productsModel.findProductById(id);

  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

module.exports = {
  getProducts,
  getProductById,
};