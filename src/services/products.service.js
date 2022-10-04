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

const insertProduct = async (name) => {
  const newProduct = await productsModel.insert(name);
  return { type: null, message: { id: newProduct.insertId, name } };
};

module.exports = {
  getProducts,
  getProductById,
  insertProduct,
};