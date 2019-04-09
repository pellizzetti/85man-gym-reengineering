exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('persons', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.date('birthday');
    table.string('gender', 1).defaultTo('F');
    table.boolean('active').defaultTo(true);
    table.string('phone');
    table.string('cellphone');
    table.string('email');
    table.string('zipcode');
    table.string('street');
    table.string('number');
    table.string('district');
    table.string('city');
    table.string('state');
    table.timestamps(true, true);
  }),
]);

exports.down = (knex, Promise) => Promise.all([knex.schema.dropTable('persons')]);
