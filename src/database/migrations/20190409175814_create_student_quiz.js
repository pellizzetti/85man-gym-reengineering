exports.up = (knex, Promise) => knex.schema.createTable('student_quiz', (table) => {
  table.increments('id').primary();
  table
    .integer('student_id')
    .references('id')
    .inTable('students')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.boolean('has_health_insurance').defaultTo(false);
  table.text('health_insurance');
  table.boolean('play_sport').defaultTo(false);
  table.text('sport');
  table.specificType('reason_for_doing', 'text[]').defaultTo('{}');
  table.text('other_reason');
  table.specificType('found_out_through', 'text[]').defaultTo('{}');
  table
    .integer('referral_id')
    .references('id')
    .inTable('students')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
});

exports.down = (knex, Promise) => knex.schema.dropTable('student_quiz');
