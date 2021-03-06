//this is using to start your server!!!
const app = require("./app");
const db = require("./knex");

const PORT = process.env.PORT || 9000;

(async () => {
  try {
    await db.migrate
      .latest()
      .then(() => db.seed.run())
      .then(() => console.log("seed step finished"));

    console.log("Starting express");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
