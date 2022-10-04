const connection = require('./db/connection');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result;
};

const insert = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );

  return result;
};

const updateById = async (id, name) => connection.execute(
    'UPDATE StoreManager.products SET name = (?) WHERE id = (?)',
    [name, id],
);

const deleteById = async (id) => connection.execute(
    'DELETE FROM StoreManager.products WHERE id = (?)',
    [id],
);

module.exports = {
  findAllProducts,
  findProductById,
  insert,
  updateById,
  deleteById,
};