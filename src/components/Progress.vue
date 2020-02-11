<template>
  <div id="progress">
    <b-row>
      <b-col cols="2" class="mt-2"></b-col>
      <b-col cols="2" class="mt-2">Total words</b-col>
      <b-col cols="6" class="mt-2">
        <b-progress
          height="2rem"
          :value="numberOfWords"
          :max="numberOfWords"
          show-value
          animated
        ></b-progress>
      </b-col>
      <b-col cols="2" class="mt-2"></b-col>
    </b-row>

    <b-row>
      <b-col cols="2" class="mt-2"></b-col>
      <b-col cols="2" class="mt-2">Finished words</b-col>
      <b-col cols="6" class="mt-2">
        <b-progress
          height="2rem"
          :value="numberOfFinishedWords"
          :max="numberOfWords"
          show-value
          animated
          variant="danger"
        ></b-progress>
      </b-col>
      <b-col cols="2" class="mt-2"></b-col>
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
    },
    numberOfFinishedWords() {
      return this.$store.state.numberOfFinishedWords;
    }
  }
};
</script>

<style scoped></style>
