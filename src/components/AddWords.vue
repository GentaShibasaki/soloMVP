<template>
  <div id="addwords">
    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="9" class="mt-3 name">
        <p>Word</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="7" class="mt-3">
        <b-form-input
          class="form"
          v-model="word"
          placeholder="Enter your word"
        ></b-form-input>
      </b-col>
      <b-col cols="2" class="mt-3"> </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="9" class="mt-3 name">
        <p>Definition</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="7" class="mt-3">
        <b-form-input
          class="form"
          v-model="definition"
          placeholder="Enter the definition of word"
        ></b-form-input>
      </b-col>
      <b-col cols="2" class="mt-3"> </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="9" class="mt-3 name">
        <p>WordOfMotherLanguage</p>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="7" class="mt-3">
        <b-form-input
          class="form"
          v-model="wordOfMotherLanguage"
          placeholder="Enter the definition of word in your mother language"
        ></b-form-input>
      </b-col>
      <b-col cols="2" class="mt-3"> </b-col>
    </b-row>

    <b-button
      size="lg"
      class="mt-3"
      v-on:click="register(word, definition, wordOfMotherLanguage)"
      >Register</b-button
    >
    <br />

    <b-button size="lg" class="mt-3" v-on:click="backToHome">Go Home</b-button>
  </div>
</template>

<script>
export default {
  name: "AddWords",
  components: {},
  data: () => ({
    word: null,
    definition: null,
    wordOfMotherLanguage: null
  }),
  methods: {
    register(word, definition, wordOfMotherLanguage) {
      this.$store.dispatch("wordRegister", [
        word,
        definition,
        wordOfMotherLanguage
      ]);
    },
    backToHome() {
      this.$store.commit("goToTop");
    }
  }
};
</script>

<style scoped>
.form {
  width: 80%;
}
.name {
  text-align: left;
}
</style>
