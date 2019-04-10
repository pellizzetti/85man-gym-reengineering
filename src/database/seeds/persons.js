const faker = require('faker');

faker.locale = 'pt_BR';

const tableName = 'persons';

async function createDummyData(knex) {
  await knex(tableName).del();

  const persons = [];
  const dataLength = 100;

  for (let i = 0; i < dataLength; i += 1) {
    persons.push({
      name: faker.name.findName(),
      birthday: faker.date.between('1945-01-01', '2000-12-31'),
      gender: faker.random.arrayElement(['F', 'M']),
      active: faker.random.boolean(),
      phone: faker.phone.phoneNumberFormat(),
      cellphone: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      zipcode: faker.address.zipCode(),
      street: faker.address.streetName(),
      number: faker.random.number(),
      district: faker.address.streetSuffix(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
    });
  }

  await knex(tableName).insert(persons);
}

exports.seed = knex => createDummyData(knex);
