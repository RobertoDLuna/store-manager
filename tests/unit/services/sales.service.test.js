const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../src/models/sales.model');
const salesService = require('../../../src/services/sales.service');

const modelMock = require('../models/mock/sales.model.mock');

describe('Testando a camada service do products', function () {
  
  it('testando a função removeProductById', async function () {
    sinon.stub(productModel, 'findProductById').resolves({ id: 4, name: "ProdutoX" });
    sinon.stub(productModel, 'deleteById').resolves({id: 4, name: "ProdutoX"});

    const products = await productService.removeProductById(4);

    expect(productModel.deleteById.calledWith(4)).to.be.true;

  });

  afterEach(function () {
    sinon.restore();
  });
})