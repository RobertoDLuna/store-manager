const validationName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: '"name" is required' });

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

const validateProductId = (req, res, next) => {
  const sales = req.body;

  const hasProductId = sales.every(({ productId }) => productId);
  if (!hasProductId) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const validateQuantity = (req, res, next) => {
  const sales = req.body;

  const hasQuantity = sales.every(({ quantity }) => quantity !== undefined && quantity !== null);

  if (!hasQuantity) return res.status(400).json({ message: '"quantity" is required' });

  const value = sales.every(({ quantity }) => quantity > 0);
  if (!value) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  validationName,
  validateProductId,
  validateQuantity,
};