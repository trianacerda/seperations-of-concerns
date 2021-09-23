const pool = require('../utils/pool');

module.exports = class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }

  static async insert({ quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *',
      [quantity]
    );
    return new Order(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM orders');
    console.log('rows', rows);

    return rows.map((row) => new Order(row));
  }
};
