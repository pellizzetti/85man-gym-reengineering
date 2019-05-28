exports.up = (knex, Promise) => knex.schema.createTable('products', (table) => {
  table.increments('id').primary();
  table.text('description').notNullable();
  table.integer('quantity').defaultTo(0);
  table.decimal('amount', 15, 2);
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('products');
