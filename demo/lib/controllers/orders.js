/* eslint-disable space-before-function-paren */
/* eslint-disable keyword-spacing */
const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.send(order);
  } catch (err) {
    next(err);
  }
});
// .get('/', (req, res, next) => {})
// .get('/:id', (req, res, next) => {});
// .patch('/:id', (req, res, next) => {});
// .delete('/:id', (req, res, next) => {});
