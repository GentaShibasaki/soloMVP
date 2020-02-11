<template>
  <div id="quize">
    <h1 v-if="!finishFlg">{{ motherLgOfWord }}</h1>

    <div v-if="!answerFlg">
      <b-form-input
        class="answerForm"
        v-model="userAnswer"
        placeholder="Enter your answer"
      ></b-form-input>
      <b-button size="lg" class="mt-3" v-on:click="answerCheck(userAnswer)"
        >Answer!</b-button
      >
    </div>

    <div v-if="checkAnswer === true" class="answerSheet">
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2">Your answer is..</b-col>
        <b-col cols="3" class="mt-2">{{ userAnswer }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2">The answer is..</b-col>
        <b-col cols="3" class="mt-2">{{ word }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2">The definition is..</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col class="mt-2">{{ definitionOfWord }}</b-col>
      </b-row>

      <h2 class="mt-3" style="color:green">Correct!!</h2>

      <b-form-checkbox
        size="lg"
        id="checkbox-1"
        v-model="status"
        :state="state"
        name="checkbox-1"
        unchecked-value="not_accepted"
      >
      </b-form-checkbox>

      <b-form-invalid-feedback :state="state"
        >check it if you think you've memorized this
        word</b-form-invalid-feedback
      >
      <b-form-valid-feedback :state="state">Yep!!</b-form-valid-feedback>

      <b-button size="lg" class="mt-3" v-on:click="nextQuiz">
        Next
      </b-button>
    </div>

    <div v-if="checkAnswer === false" class="answerSheet">
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2">Your answer is..</b-col>
        <b-col cols="3" class="mt-2">{{ userAnswer }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2">The answer is..</b-col>
        <b-col cols="3" class="mt-2">{{ word }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2">The definition is..</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col class="mt-2">{{ definitionOfWord }}</b-col>
      </b-row>

      <h2 class="mt-3" style="color:red">Not correct!!</h2>

      <b-form-checkbox
        size="lg"
        id="checkbox-1"
        v-model="status"
        :state="state"
        name="checkbox-1"
        unchecked-value="not_accepted"
      ></b-form-checkbox>

      <b-form-invalid-feedback :state="state"
        >check it if you think you've memorized this
        word</b-form-invalid-feedback
      >
      <b-form-valid-feedback :state="state">Yep!!</b-form-valid-feedback>

      <b-button size="lg" class="mt-3" v-on:click="nextQuiz">Next</b-button>
    </div>

    <div v-if="finishFlg === true" class="answerSheet">
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2"><h1>Congratulations!</h1></b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2"><h1>You've done all words!!</h1></b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-button size="lg" class="mt-3" v-on:click="tryAgain"
        >Try it agein</b-button
      >
    </div>

    <b-button size="lg" class="mt-3" v-on:click="backToHome">Go Home</b-button>
  </div>
</template>

<script>
export default {
  name: "QuizeScreen",
  components: {},
  data: () => ({
    userAnswer: null,
    status: false
  }),
  methods: {
    backToHome() {
      this.$store.dispatch("clear");
    },
    answerCheck(userAnswer) {
      this.$store.dispatch("answerCheck", userAnswer);
    },
    nextQuiz() {
      if (this.state) {
        console.log("aadfasdfasf");
        this.status = false;
        this.$store.dispatch("setFinishedWord");
      }
      this.$store.dispatch("nextQuiz");
      this.userAnswer = null;
    },
    shuffleData() {
      this.$store.commit("shuffleWordsOfArray");
    },
    setWordsData() {
      //retreive all data
      this.$store.dispatch("setWordData");
    },
    tryAgain() {
      this.$store.dispatch("tryAgain");
    }
  },
  mounted: function() {
    if (this.answeredWordsCount === this.wordsOfArray.length) return;
    this.shuffleData();
    this.setWordsData();
  },
  computed: {
    wordsOfArray() {
      return this.$store.state.wordsOfArray;
    },
    word() {
      return this.$store.state.word;
    },
    motherLgOfWord() {
      return this.$store.state.motherLgOfWord;
    },
    definitionOfWord() {
      return this.$store.state.definitionOfWord;
    },
    answerFlg() {
      return this.$store.state.answerFlg;
    },
    finishFlg() {
      return this.$store.state.finishFlg;
    },
    checkAnswer() {
      return this.$store.state.checkAnswer;
    },
    answeredWordsCount() {
      return this.$store.state.answeredWordsCount;
    },
    state() {
      return this.status === true;
    }
  }
};
</script>

<style scoped>
.answerForm {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
</style>
