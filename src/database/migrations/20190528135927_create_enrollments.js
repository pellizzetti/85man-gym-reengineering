exports.up = (knex, Promise) => knex.schema.createTable('enrollments', (table) => {
  table.increments('id').primary();
  table
    .integer('student_id')
    .references('id')
    .inTable('students')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
  table.integer('payment_terms');
  table.decimal('registration_fee', 15, 2);
  table.decimal('monthly_payment', 15, 2);
  table.decimal('registration_fee_discount', 3, 2);
  table.decimal('monthly_payment_discount', 3, 2);
  table.date('examination_date');
  table.date('enrollment_date');
  table.text('contract_length');
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('enrollments');
