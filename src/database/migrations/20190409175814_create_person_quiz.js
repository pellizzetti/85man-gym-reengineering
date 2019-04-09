exports.up = (knex, Promise) => knex.schema.createTable('person_quiz', (table) => {
  table.increments('id').primary();
  table
    .integer('person_id')
    .references('id')
    .inTable('persons')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.boolean('has_health_insurance');
  table.string('health_insurance');
  table.boolean('play_sport');
  table.string('sport');
  table.string('reason_for_doing');
  table.string('learned_through');
  table
    .integer('referral_id')
    .references('id')
    .inTable('persons')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
});

exports.down = (knex, Promise) => knex.schema.dropTable('person_quiz');
