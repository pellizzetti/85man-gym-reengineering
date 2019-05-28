exports.up = (knex, Promise) => knex.schema.createTable('orders', (table) => {
  table.increments('id').primary();
  table
    .integer('student_id')
    .references('id')
    .inTable('students')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.boolean('student');
  table.integer('payment_terms');
  table.text('type');
  table.date('order_date');
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('orders');
