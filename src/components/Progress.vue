<template>
  <div id="progress">
    <b-row>
      <b-col cols="3" class="mt-2">The number of words</b-col>
      <b-col cols="8" class="mt-2">
        <b-progress
          :value="numberOfWords"
          :max="numberOfWords"
          show-value
          animated
        ></b-progress>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-2">You've finished learning</b-col>
      <b-col cols="8" class="mt-2">
        <b-progress
          :value="0"
          :max="numberOfWords"
          show-value
          animated
        ></b-progress>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="3" class="mt-2"
        >Today's number of times you've tried learnning</b-col
      >
      <b-col cols="8" class="mt-2">  </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Progress",
  components: {},
  computed: {
    numberOfWords() {
      return this.$store.state.numberOfWords;
    }
  }
};
</script>

<style scoped></style>
