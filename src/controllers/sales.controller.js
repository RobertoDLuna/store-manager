const salesService = require('../services/sales.service');

const addSales = async (req, res) => {
  const sales = req.body;
  console.log(sales);

  const { type, message } = await salesService.insertSales(sales);

  if (type) return res.status(type).json({ message });

  return res.status(201).json(message);
};

const listSales = async (req, res) => {
  const { type, message } = await salesService.getSales();

  if (type) return res.status(type).json(message);

  return res.status(200).json(message);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(200).json(message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.removeSaleById(id);

  if (type) return res.status(type).json(message);

  return res.status(204).end();
};

module.exports = {
  addSales,
  listSales,
  listSaleById,
  deleteSaleById,
};