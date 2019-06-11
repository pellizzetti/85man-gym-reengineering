const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    return {
      student: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Student`,
        join: {
          from: 'orders.student_id',
          to: 'students.id',
        },
      },
      items: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Product`,
        join: {
          from: 'orders.id',
          through: {
            from: 'orders_items.order_id',
            to: 'orders_items.product_id',
            extra: ['quantity', 'amount'],
          },
          to: 'products.id',
        },
      },
    };
  }
}

module.exports = Order;
