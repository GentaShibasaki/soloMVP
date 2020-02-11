<template>
  <div id="buttons">
    <b-row>
      <b-col cols="6" class="mt-3">
        <b-button size="lg">Your Records</b-button>
      </b-col>
      <b-col cols="6" class="mt-3">
        <b-button size="lg" v-on:click="goToQuize">Start learning</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Buttons",
  components: {},
  methods: {
    goToQuize() {
      this.$store.commit("goToQuize");
    }
  }
};
</script>

<style scoped>
#buttons {
}
</style>
