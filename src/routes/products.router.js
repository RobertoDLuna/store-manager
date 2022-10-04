const express = require('express');
const productsController = require('../controllers/products.controller');
const { validationName } = require('../middlewares/validationMiddleware');

const productsRouter = express.Router();

productsRouter.get('/', productsController.listProducts);
productsRouter.post('/', validationName, productsController.addProduct);
productsRouter.get('/:id', productsController.listProductsById);
productsRouter.put('/:id', validationName, productsController.updateProductById);
productsRouter.delete('/:id', productsController.deleteProductById);

module.exports = productsRouter;