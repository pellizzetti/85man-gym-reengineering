exports.up = (knex, Promise) => knex.schema.createTable('activities', (table) => {
  table.increments('id').primary();
  table.text('description').notNullable();
  table.text('site');
  table
    .integer('instructor_id')
    .references('id')
    .inTable('instructors')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('activities');
