const chai = require('chai')
const sinon = require('sinon')

const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { salesMock } = require('../models/mock/sales.model.mock');
const { number } = require('joi');

describe('teste do controller do sales', function () {
  afterEach(sinon.restore);

  it('teste da função listSales', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.createStubInstance(salesService, 'getSales').resolves({ type: null, message: salesMock });

    await salesController.listSales(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(salesMock)).to.be.true
  });

  it('teste da função listSalesByID', async function () {
    const res = {};
    const req = {params : { id: 2 }};
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
        'productId': 1,
        'quantity': 1
      },
      {
        'productId': 2,
        'quantity': 2
      }
    ];
    const res = {};
    const req = { body: mockAddSales }
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insertSales').resolves({ type: null, message: { id: 3, itemsSold: mockAddSales } })
    
    salesController.addSales(req, res);

    expect(res.status.calledWith(204)).to.be.true;
  });
})