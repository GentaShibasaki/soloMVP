const fs = require("fs");
const db = require("../server/knex.js");

exports.seed = async () => {
  try {
    const words = JSON.parse(fs.readFileSync("./data/wordsData.json"));
    for (const wordInf of words) {
      const word = wordInf.word;
      const definition = wordInf.definition;
      const wordOfMotherLanguage = wordInf.wordOfMotherLanguage;
      const finishedLearning = wordInf.finishedLearning;

      const result = await db("words").insert({
        word,
        definition,
        wordOfMotherLanguage,
        finishedLearning
      });
      console.log(result);
    }
  } catch (err) {
    console.error("Error inserting records", err);
  }
};
