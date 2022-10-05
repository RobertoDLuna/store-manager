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

const changeProductById = async (id, name) => {
  const hasId = await productsModel.findProductById(id);

  if (!hasId) return { type: 404, message: 'Product not found' };

  await productsModel.updateById(id, name);

  const result = await productsModel.findProductById(id);
  return { type: null, message: result };
};

const removeProductById = async (id) => {
  const hasId = await productsModel.findProductById(id);

  if (!hasId) return { type: 404, message: 'Product not found' };

  return productsModel.deleteById(id);
};

const getProductByQuery = async (q) => {
  const result = await productsModel.findProductByQuery(q);
  return { type: null, message: result };
};

module.exports = {
  getProducts,
  getProductById,
  insertProduct,
  changeProductById,
  removeProductById,
  getProductByQuery,
};