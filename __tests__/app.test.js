/* eslint-disable space-before-function-paren */
const pool = require('../lib/utils/pool');
// const twilio = require('twilio');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('separation-of-concerns routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('should GET all orders', async () => {
    await request(app).post('/api/v1/orders').send({ quantity: 10 });
    return request(app)
      .get('/api/v1/orders')
      .then((res) => {
        expect(res.body).toEqual([
          {
            id: '1',
            quantity: 10,
          },
        ]);
      });
  });

  it('should GET order by id', async () => {
    await request(app).post('/api/v1/orders').send({
      id: '1',
      quantity: 10,
    });
    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });

  it('should PATCH an order by id', async () => {
    await request(app).post('/api/v1/orders').send({
      id: '1',
      quantity: 10,
    });
    await request(app).patch('/api/v1/orders/1').send({
      quantity: 24,
    });
    return request(app)
      .get('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 24,
        });
      });
  });

  it('should DELETE an order by id', async () => {
    await request(app).post('/api/v1/orders').send({
      id: '1',
      quantity: 10,
    });
    return request(app)
      .delete('/api/v1/orders/1')
      .then((res) => {
        expect(res.body).toEqual({
          id: '1',
          quantity: 10,
        });
      });
  });
});
