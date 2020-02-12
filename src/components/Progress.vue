<template>
  <div id="progress">
    <b-row>
      <b-col cols="5" class="mt-2"></b-col>
      <b-col cols="2" class="mt-2">
        <radial-progress-bar
          :diameter="200"
          :completedSteps="numberOfFinishedWords"
          :totalSteps="numberOfWords"
          :timingFunc="ease"
          :animateSpeed="1000"
          :fps="60"
        >
          <p>Total words: {{ numberOfWords }}</p>
          <p>Completed words: {{ numberOfFinishedWords }}</p>
        </radial-progress-bar>
      </b-col>
      <b-col cols="5" class="mt-2"></b-col>
    </b-row>
  </div>
</template>

<script>
import RadialProgressBar from "vue-radial-progress";
export default {
  name: "Progress",
  components: {
    RadialProgressBar
  },
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
