exports.up = (knex, Promise) => knex.schema.createTable('student_quiz', (table) => {
  table.increments('id').primary();
  table
    .integer('student_id')
    .references('id')
    .inTable('students')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.boolean('has_health_insurance');
  table.text('health_insurance');
  table.boolean('play_sport');
  table.text('sport');
  table.text('reason_for_doing');
  table.text('learned_through');
  table
    .integer('referral_id')
    .references('id')
    .inTable('students')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
});

exports.down = (knex, Promise) => knex.schema.dropTable('student_quiz');
