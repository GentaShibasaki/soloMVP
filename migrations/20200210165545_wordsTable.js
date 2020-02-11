exports.up = function(knex) {
  return knex.schema.createTable("words", table => {
    table.increments().index();

    table.string("word").notNullable();

    table.text("definition");

    table.text("wordOfMotherLanguage").notNullable();

    table.boolean("finishedLearning").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("words");
};
