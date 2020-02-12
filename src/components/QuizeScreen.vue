<template>
  <div id="quize">
    <h1 v-if="!finishFlg && !finishingAllWords">{{ motherLgOfWord }}</h1>

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
        <b-col cols="3" class="mt-2 prop">Your answer is..</b-col>
        <b-col cols="3" class="mt-2 success">{{ userAnswer }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2 prop">The answer is..</b-col>
        <b-col cols="3" class="mt-2 success">{{ word }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2">The definition is..</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col class="mt-2" style="fontweght:bold" variant="success">{{
          definitionOfWord
        }}</b-col>
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

      <b-form-invalid-feedback :state="state" style="font-size:20px"
        >check it if you think you've memorized this
        word</b-form-invalid-feedback
      >
      <b-form-valid-feedback :state="state" style="font-size:20px"
        >Yep!!</b-form-valid-feedback
      >

      <b-button size="lg" class="mt-3" v-on:click="nextQuiz">
        Next
      </b-button>
    </div>

    <div v-if="checkAnswer === false" class="answerSheet">
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2 prop">Your answer is..</b-col>
        <b-col cols="3" class="mt-2 failure">{{ userAnswer }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="3" class="mt-2 prop">The answer is..</b-col>
        <b-col cols="3" class="mt-2 success">{{ word }}</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2">The definition is..</b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="1" class="mt-2"></b-col>
        <b-col class="mt-2" style="fontweght:bold" variant="success">{{
          definitionOfWord
        }}</b-col>
        <b-col cols="1" class="mt-2"></b-col>
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

      <b-form-invalid-feedback :state="state" style="font-size:20px"
        >check it if you think you've memorized this
        word</b-form-invalid-feedback
      >
      <b-form-valid-feedback :state="state" style="font-size:20px"
        >Yep!!</b-form-valid-feedback
      >

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

    <div v-if="finishingAllWords === true" class="answerSheet">
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2"><h1>You finished all words!</h1></b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
      <b-row>
        <b-col cols="3" class="mt-2"></b-col>
        <b-col cols="6" class="mt-2"><h1>Please add more words!</h1></b-col>
        <b-col cols="3" class="mt-2"></b-col>
      </b-row>
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
        this.status = false;
        this.$store.dispatch("setFinishedWord");
      }
      this.$store.dispatch("nextQuiz");
      this.userAnswer = null;
    },
    tryAgain() {
      this.$store.dispatch("tryAgain");
    },
    setWordsOfArrayForQuiz() {
      this.$store.dispatch("setWordsOfArrayForQuiz");
    }
  },
  mounted: function() {
    this.setWordsOfArrayForQuiz();
  },
  computed: {
    wordsOfArrayForQuiz() {
      return this.$store.state.wordsOfArrayForQuiz;
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
    },
    finishingAllWords() {
      return this.$store.state.finishingAllWords;
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
.success {
  font-weight: bold;
  color: green;
  text-align: left;
}
.failure {
  font-weight: bold;
  color: red;
  text-align: left;
}
.prop {
  text-align: right;
}
</style>
