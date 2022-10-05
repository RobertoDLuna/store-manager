const { expect } = require('chai');
const sinon = require('sinon');

const productModel = require('../../../src/models/products.model');
const productService = require('../../../src/services/products.service');

const modelMock = require('../models/mock/products.model.mock');

describe('Testando a camada service do products', function () {
  it('testando a função getProducts', async function () {
    sinon.stub(productModel, 'findAllProducts').resolves(modelMock);

    const products = await productService.getProducts();

    expect(products.message).to.deep.equal(modelMock);
  });

  it('testando a função getProductById', async function () {
    sinon.stub(productModel, 'findProductById').resolves(modelMock[0]);

    const products = await productService.getProductById(1);

    expect(products.message).to.deep.equal(modelMock[0]);
  });

  it('testando a função retorna um erro com id inválido', async function () {
    sinon.stub(productModel, 'findProductById').resolves('Product not found');

    const products = await productService.getProductById(8);

    expect(products.message).to.deep.equal('Product not found');
  });

  it('testando a função insertProduct', async function () {
    sinon.stub(productModel, 'insert').resolves({insertId: 4});

    const products = await productService.insertProduct("ProdutoX");

    expect(products).to.deep.equal({ type: null, message: {id: 4, name: "ProdutoX"} });
  });

  it('testando a função changeProductById', async function () {
    sinon.stub(productModel, 'updateById').resolves({ insertId: 4 });
    sinon.stub(productModel, 'findProductById').resolves({id: 4, name: "ProdutoX"});

    const products = await productService.changeProductById( 4, "ProdutoX");

    expect(products).to.deep.equal({ type: null, message: {id: 4, name: "ProdutoX"} });
  });

  it('testando a função removeProductById', async function () {
    sinon.stub(productModel, 'findProductById').resolves({ id: 4, name: "ProdutoX" });
    sinon.stub(productModel, 'deleteById').resolves({id: 4, name: "ProdutoX"});

    const products = await productService.removeProductById(4);

    expect(productModel.deleteById.calledWith(4)).to.be.true;

  });

   it('testando a função getProductByQuery', async function () {
    sinon.stub(productModel, 'findProductByQuery').resolves(modelMock[0]);

    const products = await productService.getProductByQuery("Martelo");

    expect(products.message).to.deep.equal(modelMock[0]);
  });

  afterEach(function () {
    sinon.restore();
  });
})