const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  //send a text and store the order

  static async createOrder({ quantity }) {
    //send text
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}`
    );

    //store the order
    const order = await Order.insert({ quantity });

    return order;
  }

  static async getAllOrders() {
    //send text
    await sendSms(process.env.ORDER_HANDLER_NUMBER, 'Recieved all orders');

    const order = await Order.getAll();

    return order;
  }

  static async getById(id) {
    //send text
    await sendSms(process.env.ORDER_HANDLER_NUMBER, `Recieved order ${id}`);

    const order = await Order.getById(id);

    return order;
  }
};
