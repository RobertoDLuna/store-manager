const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/db/connection');
const { findAllSales,findSaleById, insert, insertNewSale } = require('../../../src/models/sales.model');

const salesMock = require('./mock/sales.model.mock');

describe('Teste de unidade do model do sales', function () {


  it('testa se lista todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);

    const result = await findAllSales();

    expect(result).to.deep.equal(salesMock);
  });

  it('testa se retorna o sale com o id correto', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock[2]]);

    const result = await findSaleById(2);

    expect(result).to.deep.equal(salesMock[2]);
  });

  it('testa se uma sale é adicionado', async function () {
    const mockInsertSale = {
      "productId": 1,
      "quantity": 1
    };

    sinon.stub(connection, 'execute').resolves(3);

    const result = await insert([mockInsertSale], 3);

    expect(result).to.deep.equal(3);
  });

  it('testa funcionamento de insertNewSale', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const result = await insertNewSale();

    expect(result).to.deep.equal(5);
  });

  afterEach(sinon.restore);

});