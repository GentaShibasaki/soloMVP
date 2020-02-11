const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex");

const app = express();

// Setup Logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));

//apis
app.get("/api/words", async (req, res) => {
  try {
    const words = await db.select().table("words");
    res.json(words);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.patch("/api/words", async (req, res) => {
  try {
    await db("words")
      .where("word", req.body.word)
      .update({ finishedLearning: true });
    res.sendStatus(200);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

// Always return the main index.html, since we are developing a single page application
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "index.html"));
});

module.exports = app;
