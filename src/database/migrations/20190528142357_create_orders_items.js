exports.up = (knex, Promise) => knex.schema.createTable('orders_items', (table) => {
  table.increments('id').primary();
  table
    .integer('order_id')
    .references('id')
    .inTable('orders')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table
    .integer('item_id')
    .references('id')
    .inTable('products')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.integer('quantity');
  table.decimal('amount', 15, 2);
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('orders_items');
