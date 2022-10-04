const express = require('express');

const salesController = require('../controllers/sales.controller');

const validations = require('../middlewares/validationMiddleware');

const salesRouter = express.Router();

salesRouter.post('/',
  validations.validateProductId,
  validations.validateQuantity,
  salesController.addSales);

salesRouter.get('/', salesController.listSales);
salesRouter.get('/:id', salesController.listSaleById);

salesRouter.delete('/:id', salesController.deleteSaleById);

module.exports = salesRouter;