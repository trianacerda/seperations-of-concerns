/* eslint-disable space-before-function-paren */
/* eslint-disable keyword-spacing */
const { Router } = require('express');
// const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.createOrder(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const order = await OrderService.getAllOrders();
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await OrderService.getById(id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const quantity = req.body.quantity;
      const order = await OrderService.patchById(id, quantity);
      res.send(order);
    } catch (err) {
      next(err);
    }
  });

// .delete('/:id', (req, res, next) => {});
