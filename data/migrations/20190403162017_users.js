exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .string('username', 64)
      .notNullable()
      .unique();
    table.string('password', 128).notNullable();
    table.string('department', 64).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
