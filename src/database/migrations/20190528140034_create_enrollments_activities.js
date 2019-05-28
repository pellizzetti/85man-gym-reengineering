exports.up = (knex, Promise) => knex.schema.createTable('enrollments_activities', (table) => {
  table.increments('id').primary();
  table
    .integer('enrollment_id')
    .references('id')
    .inTable('enrollments')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table
    .integer('activity_id')
    .references('id')
    .inTable('activities')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.specificType('weekdays', 'integer[]').defaultTo('{}');
  table.time('starts_at');
  table.time('ends_at');
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('enrollments_activities');
