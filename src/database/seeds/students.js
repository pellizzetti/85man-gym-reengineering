const faker = require('faker');

faker.locale = 'pt_BR';

const tableName = 'students';

async function createDummyData(knex) {
  await knex(tableName).del();

  const students = [];
  const dataLength = 100;

  for (let i = 0; i < dataLength; i += 1) {
    students.push({
      name: faker.name.findName(),
      birthday: faker.date.between('1945-01-01', '2000-12-31'),
      gender: faker.random.arrayElement(['Feminino', 'Masculino']),
      active: faker.random.boolean(),
      phone: faker.phone.phoneNumberFormat(),
      cellphone: faker.phone.phoneNumberFormat(),
      email: faker.internet.email(),
      postal_code: faker.address.zipCode(),
      street: faker.address.streetName(),
      number: faker.random.number(),
      neighborhood: faker.address.streetSuffix(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
    });
  }

  const insertedIds = await knex(tableName)
    .insert(students)
    .returning('id');

  const studentQuizzes = insertedIds.map(id => ({ student_id: id }));

  await knex('student_quiz').insert(studentQuizzes);
}

exports.seed = knex => createDummyData(knex);
