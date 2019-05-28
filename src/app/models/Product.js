const Knex = require('knex');
const { Model } = require('objection');
const connection = require('../../../knexfile');

const knexConnection = Knex(connection);

Model.knex(knexConnection);

class Product extends Model {
  static get tableName() {
    return 'products';
  }
}

module.exports = Product;
