const moment = require('moment');
const IntlPolyfill = require('intl');

const { Order } = require('../models');

class OrderController {
  async index(req, res) {
    const { currentPage = 0, search = '', showAll = false } = req.query;

    let orders = [];
    if (showAll) {
      orders = await Order.query()
        .eager('[student, items]')
        .modifyEager('student', (builder) => {
          builder.where('name', 'ILIKE', `%${search}%`).select('name');
        })

        .orderBy('created_at');
    } else {
      orders = await Order.query()
        .eager('[student, items]')
        .modifyEager('student', (builder) => {
          builder.where('name', 'ILIKE', `%${search}%`).select('name');
        })
        .orderBy('created_at')
        .page(currentPage, 10);
    }

    orders.results.forEach((order) => {
      order.quantity_total = 0;
      order.amount_total = 0;
      order.total = 0;

      order.items.forEach((product) => {
        order.quantity_total += product.quantity;
        order.amount_total += parseFloat(product.amount);
        order.total += product.quantity * parseFloat(product.amount);
      });
    });

    return res.json(orders);
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.query()
      .eager('[student, items]')
      .findById(id);

    order.order_total = 0;

    order.items = order.items.map(product => ({
      ...product,
      amount: new IntlPolyfill.NumberFormat('pt-BR', {
        style: 'decimal',
        currency: 'BRL',
      }).format(product.amount),
    }));

    order.order_date = order.order_date && moment(order.order_date, 'YYYY-MM-DD').format('DD/MM/YYYY');

    return res.json(order);
  }

  async store(req, res) {
    const { values } = req.body;

    values.order_date = values.order_date && moment(values.order_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    values.items = values.items
      && values.items.map(item => ({
        ...item,
        amount: String(item.amount).replace(/,/g, '.'),
      }));

    const order = await Order.query().insertGraph(
      { ...values },
      { relate: true, unrelate: true, noDelete: true },
    );

    return res.json(order);
  }

  async update(req, res) {
    const { id } = req.params;
    const { values } = req.body;

    values.order_date = values.order_date && moment(values.order_date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    values.items = values.items
      && values.items.map(item => ({
        ...item,
        amount: String(item.amount).replace(/,/g, '.'),
      }));

    const order = await Order.query()
      .findById(id)
      .upsertGraph({ ...values }, { relate: true, noInsert: true, noDelete: true });

    return res.json(order);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const order = await Order.query().deleteById(id);

    return res.json(order);
  }
}

module.exports = new OrderController();
