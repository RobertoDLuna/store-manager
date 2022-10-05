const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { findAllProducts, findProductById, findProductByQuery } = require('../../../src/models/products.model');

const productsMock = require('./mock/products.model.mock');

describe('Teste de unidade do model do products', function () {


  it('testando se lista todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);

    const result = await findAllProducts();

    expect(result).to.deep.equal(productsMock);
  });

  it('testando se retorna o objeto com o id correto', async function () {
    sinon.stub(connection, 'execute').resolves([[productsMock[0]]]);

    const result = await findProductById(1);

    expect(result).to.deep.equal(productsMock[0]);
  });

  it('testando se um produto é adicionado', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock[0]]);

    const result = await insert('Martelo de Thor');

    expect(result).to.deep.equal(productsMock[0]);
  });
  
  it('testando função getByQuery', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock[0]]);

    const result = await findProductByQuery('Martelo de Thor');

    expect(result).to.deep.equal(productsMock[0]);
  });  

  afterEach(sinon.restore);

});