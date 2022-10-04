const express = require('express');
const productsController = require('../controllers/products.controller');
const { validationName } = require('../middlewares/validationMiddleware');

const productsRouter = express.Router();

productsRouter.get('/', productsController.listProducts);
productsRouter.get('/:id', productsController.listProductsById);
productsRouter.post('/', validationName, productsController.addProduct);

module.exports = productsRouter;