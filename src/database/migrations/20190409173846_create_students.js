exports.up = (knex, Promise) => knex.schema.createTable('students', (table) => {
  table.increments('id').primary();
  table.text('name').notNullable();
  table.date('birthday');
  table.text('gender').defaultTo('Feminino');
  table.boolean('active').defaultTo(true);
  table.text('phone');
  table.text('cellphone');
  table.text('email');
  table.text('postal_code');
  table.text('street');
  table.text('number');
  table.text('neighborhood');
  table.text('city');
  table.text('state');
  table.timestamps(true, true);
});

exports.down = (knex, Promise) => knex.schema.dropTable('students');
