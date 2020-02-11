const express = require("express");
const morgan = require("morgan");
const path = require("path");
const db = require("./knex");
const bodyParser = require("body-parser");

const app = express();

const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, access_token"
  );

  // intercept OPTIONS method
  if ("OPTIONS" === req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// Setup Logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text());

//apis
app.get("/api/words", async (req, res) => {
  try {
    const words = await db
      .select()
      .table("words")
      .where("finishedLearning", false);
    res.json(words);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error loading locations!", err);
    res.sendStatus(500);
  }
});

app.get("/api/words/finished", async (req, res) => {
  try {
    const numberOfFinishedWords = await db("words")
      .count("*")
      .where("finishedLearning", true);
    res.json(numberOfFinishedWords);
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
