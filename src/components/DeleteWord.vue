<template>
  <div id="addwords">
    <b-row>
      <b-col cols="1" class="mt-3"> </b-col>
      <b-col cols="2" class="mt-3">
        <p>{{word}}</p>
      </b-col>
      <b-col cols="2" class="mt-3">
        <p>{{wordOfMotherLanguage}}</p>
      </b-col>
      <b-col cols="6" class="mt-3">
        <p>{{definition}}</p>
      </b-col>
      <b-col cols="1" class="mt-3"> </b-col>
    </b-row>
    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="6" class="mt-3">
        <p>{{word}}</p>
      </b-col>
      <b-col cols="3" class="mt-3"> </b-col>
    </b-row>

  </div>
</template>

<script>
export default {
  name: "Delete",
  components: {},
  props:["word","definition","wordOfMotherLanguage"],
  methods: {
    delete(word, definition, wordOfMotherLanguage) {
      this.$store.dispatch("wordRegister", [
        word,
        definition,
        wordOfMotherLanguage
      ]);
    },
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
