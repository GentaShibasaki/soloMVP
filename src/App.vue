<template>
  <div id="app">
    <Toppage v-if="topPageFlg" />

    <QuizeScreen v-if="!topPageFlg" />
  </div>
</template>

<script>
import Toppage from "./components/Toppage";
import QuizeScreen from "./components/QuizeScreen";

export default {
  name: "App",
  components: {
    Toppage,
    QuizeScreen
  },
  computed: {
    topPageFlg() {
      return this.$store.state.topPageFlg;
    }
  },
  mounted: function() {
    this.$store.dispatch("getWordsData");
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
