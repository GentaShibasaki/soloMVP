import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topPageFlg: true,

    //for quiz page
    wordsOfArray: [],
    numberOfWords: 0,
    numberOfFinishedWords: 0,
    word: "",
    motherLgOfWord: "",
    definitionOfWord: "",
    answerFlg: false,
    finishFlg: false,
    checkAnswer: null,
    answeredWordsCount: 0
  },
  mutations: {
    goToQuize(state) {
      state.topPageFlg = false;
    },
    backToHome(state) {
      state.topPageFlg = true;
    },

    //get words data
    setWordsOfArray(state, wordsInf) {
      state.wordsOfArray = wordsInf;
    },
    shuffleWordsOfArray(state) {
      for (let i = state.wordsOfArray.length - 1; i > 0; i--) {
        let r = Math.floor(Math.random() * (i + 1));
        let tmp = state.wordsOfArray[i];
        state.wordsOfArray[i] = state.wordsOfArray[r];
        state.wordsOfArray[r] = tmp;
      }
    },
    setNumberOfWords(state) {
      state.numberOfWords = state.wordsOfArray.length;
    },

    setNumberOfFinishedWords(state, count) {
      console.log("count", count);
      state.numberOfFinishedWords = count;
      console.log("state.numberOfFinishedWords", state.numberOfFinishedWords);
    },

    //quiz page
    answered(state) {
      state.answerFlg = true;
    },
    backToAnswer(state) {
      state.answerFlg = false;
    },
    answerIsCorrect(state) {
      state.checkAnswer = true;
    },
    answerIsWrong(state) {
      state.checkAnswer = false;
    },
    answerCheckClear(state) {
      state.checkAnswer = null;
    },
    wordsLearningFinish(state) {
      state.finishFlg = true;
    },
    wordsLearningAgain(state) {
      state.finishFlg = false;
    },
    addAnsweredWordsCount(state) {
      state.answeredWordsCount = state.answeredWordsCount + 1;
    },
    resetAnsweredWordsCount(state) {
      state.answeredWordsCount = 0;
    },
    setWord(state) {
      state.word = state.wordsOfArray[state.answeredWordsCount].word;
    },
    setMotherLgOfWord(state) {
      state.motherLgOfWord =
        state.wordsOfArray[state.answeredWordsCount].wordOfMotherLanguage;
    },
    setDefinitionOfWord(state) {
      state.definitionOfWord =
        state.wordsOfArray[state.answeredWordsCount].definition;
    }
  },
  actions: {
    async getWordsData({ commit }) {
      const { data: wordsInf } = await axios.get("/api/words");
      commit("setWordsOfArray", wordsInf);
      commit("setNumberOfWords");
    },
    async setFinishedWord({ commit }) {
      await axios.patch("/api/words", {
        word: this.state.word
      });
      const { data: finishedWords } = await axios.get("/api/words/finished");
      console.log(finishedWords);
      commit("setNumberOfFinishedWords", +finishedWords[0].count);
    },
    answerCheck({ commit }, userAnswer) {
      if (userAnswer === this.state.word) {
        commit("answerIsCorrect");
      } else {
        commit("answerIsWrong");
      }
      commit("answered");
      //pending to save the record
    },
    nextQuiz({ commit }) {
      //count up the number of words
      commit("addAnsweredWordsCount");

      if (this.state.answeredWordsCount === this.state.wordsOfArray.length) {
        commit("answered");
        commit("answerCheckClear");
        commit("wordsLearningFinish");
      } else {
        commit("answerCheckClear");
        commit("backToAnswer");
        this._actions.setWordData[0]();
      }
    },
    setWordData({ commit }) {
      //set all data
      commit("setWord");
      commit("setMotherLgOfWord");
      commit("setDefinitionOfWord");
    },
    tryAgain({ commit }) {
      commit("resetAnsweredWordsCount");
      commit("shuffleWordsOfArray");
      this._actions.setWordData[0]();
      commit("backToAnswer");
      commit("wordsLearningAgain");
    },
    clear({ commit }) {
      commit("resetAnsweredWordsCount");
      commit("backToAnswer");
      commit("answerCheckClear");
      commit("backToHome");
    }
  }
});
