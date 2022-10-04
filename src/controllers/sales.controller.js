const salesService = require('../services/sales.service');

const addSales = async (req, res) => {
  const sales = req.body;
  console.log('sales:', sales);

  const { type, message } = await salesService.insertSales(sales);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  addSales,
};