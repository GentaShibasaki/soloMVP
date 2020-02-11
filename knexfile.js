const db = require("./server/knex");

module.exports = {
  development: {
    client: "pg",
    connection: db.connection().client.config.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./data"
    }
  },

  staging: {
    client: "pg",
    connection: db.connection().client.config.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./data"
    }
  },

  production: {
    client: "pg",
    connection: db.connection().client.config.connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: "knex_migrations",
      directory: "./migrations"
    },
    seeds: {
      directory: "./data"
    }
  }
};
