<template>
  <div id="app">
    <Toppage v-if="topPageFlg === 'topPage'" />

    <QuizeScreen v-if="topPageFlg === 'quiz'" />

    <AddWords v-if="topPageFlg === 'addWords'" />

    <!-- <div class="imageCell" v-if="topPageFlg === 'deleteWords'">
      <DeleteWords
        v-for="word in wordsOfArray"
        :key="word.id"
        :word="word.word"
        :definition="word.definition"
        :selectOnePhoto="word.wordOfMotherLanguage"
      />
      <b-button size="lg" class="mt-3" v-on:click="backToHome"
        >Go Home</b-button
      >
    </div> -->
  </div>
</template>

<script>
import Toppage from "./components/Toppage";
import QuizeScreen from "./components/QuizeScreen";
import AddWords from "./components/AddWords";

export default {
  name: "App",
  components: {
    Toppage,
    QuizeScreen,
    AddWords
  },
  computed: {
    topPageFlg() {
      return this.$store.state.topPageFlg;
    },
    wordsOfArray() {
      return this.$store.state.wordsOfArray;
    }
  },
  mounted: function() {
    this.$store.dispatch("getWordsData");
  },
  methods: {
    backToHome() {
      this.$store.commit("goToTop");
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
