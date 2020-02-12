<template>
  <div id="buttons">
    <b-row>
      <b-col cols="3" class="mt-3"> </b-col>
      <b-col cols="6" class="mt-3">
        <b-button size="lg" v-on:click="goToQuize">Start learning</b-button>
      </b-col>
      <b-col cols="3" class="mt-3"> </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" class="mt-3"> </b-col>
      <b-col cols="4" class="mt-3">
        <b-button size="lg" v-on:click="goToAddWords">Add words</b-button>
      </b-col>
      <b-col cols="4" class="mt-3">
        <b-button size="lg">Delete word</b-button>
      </b-col>
      <b-col cols="2" class="mt-3"> </b-col>
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
    },
    goToAddWords(){
      this.$store.commit("goToAddWords");
    }
  }
};
</script>

<style scoped>
#buttons {
}
</style>
