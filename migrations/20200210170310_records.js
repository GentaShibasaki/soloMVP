exports.up = function(knex) {
  return knex.schema.createTable("records", table => {
    table.increments().index();

    table.date("date");

    table.text("nameOfWord");

    table.integer("score");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("records");
};
