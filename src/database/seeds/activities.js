const faker = require('faker');

faker.locale = 'pt_BR';

const tableName = 'activities';

async function createDummyData(knex) {
  await knex(tableName).del();

  const [[onizukaId], [boyId]] = await Promise.all([
    knex('instructors')
      .insert({ name: 'Sensei Onizuka', doc: '092.232.123-45' })
      .returning('id'),
    knex('instructors')
      .insert({ name: 'Golden Boy', doc: '480.909.520-70' })
      .returning('id'),
  ]);

  const activities = [
    {
      description: 'Jiu-jitsu',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: onizukaId,
    },
    {
      description: 'Kung Fu',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: onizukaId,
    },
    {
      description: 'Muay Thai',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: onizukaId,
    },
    {
      description: 'Karate',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: onizukaId,
    },
    {
      description: 'Capoeira',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: onizukaId,
    },
    {
      description: 'Judô',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: onizukaId,
    },
    {
      description: 'Tae Kwon Do',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: boyId,
    },
    {
      description: 'Boxe',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: boyId,
    },
    {
      description: 'Ninjutsu',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: boyId,
    },
    {
      description: 'Artes Marciais Mistas',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: boyId,
    },
    {
      description: 'Funcional',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: boyId,
    },
    {
      description: 'Crossfit',
      site: `Ringue ${faker.random.number(7)}`,
      instructor_id: boyId,
    },
  ];

  await knex(tableName).insert(activities);
}

exports.seed = knex => createDummyData(knex);
