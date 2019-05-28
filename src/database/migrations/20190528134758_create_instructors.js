exports.up = (knex, Promise) => knex.schema.createTable('instructors', (table) => {
  table.increments('id').primary();
  table.text('name').notNullable();
  table.text('doc');
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('instructors');
