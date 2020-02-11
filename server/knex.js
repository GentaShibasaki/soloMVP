const knex = require("knex");

const db = knex({
  client: "pg",
  connection:
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@127.0.0.1:5432/solomvp`,
  migrations: {
    tablename: "knex_migrations",
    directory: "./migrations"
  },
  seeds: {
    directory: "./data"
  },
  searchPath: "public"
});

module.exports = db;
