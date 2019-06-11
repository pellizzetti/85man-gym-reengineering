const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Product extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.ManyToManyRelation,
        modelClass: `${__dirname}/Order`,
        join: {
          from: 'products.id',
          through: {
            from: 'orders_items.product_id',
            to: 'orders_items.order_id',
          },
          to: 'orders.id',
        },
      },
    };
  }
}

module.exports = Product;
