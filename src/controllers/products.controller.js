const productsService = require('../services/products.service');

const listProducts = async (_req, res) => {
   const { type, message } = await productsService.getProducts();

  if (type) return res.status(type).json(message);

  res.status(200).json(message);
};

const listProductsById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const addProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.insertProduct(name);

  if (type) return res.status(type).json(message);

  res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.changeProductById(id, name);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.removeProductById(id);

  if (type) return res.status(type).json({ message });

  res.status(204).end();
};

const listProductByQuery = async (req, res) => {
  const { q } = req.query;

  const { type, message } = await productsService.getProductByQuery(q);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  listProducts,
  listProductsById,
  addProduct,
  updateProductById,
  deleteProductById,
  listProductByQuery,
};