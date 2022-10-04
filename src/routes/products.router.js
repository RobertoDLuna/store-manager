const express = require('express');
const productsController = require('../controllers/products.controller');

const productsRouter = express.Router();

productsRouter.get('/', productsController.listProducts);
productsRouter.get('/:id', productsController.listProductsById);
productsRouter.post('/', productsController.addProduct);

module.exports = productsRouter;