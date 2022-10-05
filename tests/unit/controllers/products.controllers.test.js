const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const productService = require('../../../src/services/products.service');
const mockModel = require('../models/mock/products.model.mock');
const productsController = require('../../../src/controllers/products.controller');

describe('tesete do controller do products', function () {
  afterEach(sinon.restore);

  it('teste da função listProducts', async function () {
    const res = {};
    const req = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProducts').resolves({ type: null, message: mockModel });

    await productsController.listProducts(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(mockModel)).to.be.true;
  });

  it('teste da função listProductsById', async function () {
    const res = {};
    const req = { params: { id: 1 } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductById').resolves({ type: null, message: mockModel[0] });

    await productsController.listProductsById(req, res);

    expect(res.status.calledWith(200)).to.be.true;

    expect(res.json.calledWith(mockModel[0])).to.be.true;
  });

  it('Teste da função addProduct', async function () {
    const res = {};
    const req = { body: { name: 'Martelo de Bang' } };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'insertProduct').resolves({ type: null, message: {id: 4, name: 'Martelo de Bang'} });

    await productsController.addProduct(req, res);

    expect(res.status.calledWith(201)).to.be.true;

    expect(res.json.calledWith({id: 4, name: 'Martelo de Bang'})).to.be.true;
  });

  it('Teste da função updateProductById', async function () {
    const res = {};
    const req = { body: { name: 'Martelo de Bang' }, params: { id: 4} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'changeProductById').resolves({ type: null, message: {id: 4, name: 'Martelo de Bang'} });

    await productsController.updateProductById(req, res);

    expect(res.status.calledWith(200)).to.be.true;

    expect(res.json.calledWith({id: 4, name: 'Martelo de Bang'})).to.be.true;
  });

  it('Teste da função deleteProductById', async function () {
    const res = {};
    const req = { params: { id: 4} };
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(productService, 'removeProductById').resolves({ type: null, message: {id: 4, name: 'Martelo de Bang'} });

    await productsController.deleteProductById(req, res);

     expect(res.status.calledWith(204)).to.be.true;

  });
  
  it('Testae da função listProductsByQuery', async function () {
    const res = {};
    const req = { query: { q: 'Bang'} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getProductByQuery').resolves({ type: null, message: {id: 4, name: 'Martelo de Bang'} });

    await productsController.listProductsByQuery(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({id: 4, name: 'Martelo de Bang'})).to.be.true;

  });
});