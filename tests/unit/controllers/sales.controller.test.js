const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { salesMock } = require('../models/mock/sales.model.mock');

describe('testando o controller do sales', function () {
  afterEach(sinon.restore);

  it('teste da função listSales', async function () {
    const res = {};
    const req = {}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSales').resolves({ type: null, message: salesMock });

    await salesController.listSales(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(salesMock)).to.be.true;
  });

  it('teste da função listSaleById', async function () {
    const res = {};
    const req = {params: { id: 2 } }
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSaleById').resolves({ type: null, message: salesMock[2] });

    await salesController.listSaleById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(salesMock[2])).to.be.true;
  });

  it('teste da função addSales', async function () {

    const mockAddSales = [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ];
    const res = {};
    const req = { body: mockAddSales }

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insertSales').resolves({ type: null, message: {id: 3, itemsSold: mockAddSales } });

    await salesController.addSales(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith({id: 3, itemsSold: mockAddSales })).to.be.true;
  });

  it('teste da função deleteSaleById', async function () {
    const res = {};
    const req = { params: { id: 4} };
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns();

    sinon.stub(salesService, 'removeSaleById').resolves({ type: null, message: {id: 4, name: 'Martelo de Bang'} });

    await salesController.deleteSaleById(req, res);

     expect(res.status.calledWith(204)).to.be.true;

  }); 

  it('teste da função updateSaleById', async function () {
    const res = {};
    const req = { body: { name: 'Martelo de Bang' }, params: { id: 4} };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'changeSaleById').resolves({ type: null, message: {id: 4, name: 'Martelo de Bang'} });

    await salesController.updateSaleById(req, res);

    expect(res.status.calledWith(200)).to.be.true;

    expect(res.json.calledWith({id: 4, name: 'Martelo de Bang'})).to.be.true;
  });

});