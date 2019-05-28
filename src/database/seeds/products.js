const faker = require('faker');

faker.locale = 'pt_BR';

const tableName = 'products';

async function createDummyData(knex) {
  await knex(tableName).del();

  const products = [];
  const dataLength = 100;

  for (let i = 0; i < dataLength; i += 1) {
    products.push({
      description: faker.commerce.productName(),
      quantity: faker.random.number(7000),
      amount: faker.random.number({ min: 0, max: 1000, precision: 0.01 }),
    });
  }
  await knex(tableName).insert(products);
}

exports.seed = knex => createDummyData(knex);
