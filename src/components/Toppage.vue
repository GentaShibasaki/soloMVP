<template>
  <div>
    <h1>Learning words!!!</h1>
    <Progress />
    <Buttons />
  </div>
</template>

<script>
import Progress from "./Progress";
import Buttons from "./Buttons";

export default {
  name: "App",
  components: {
    Progress,
    Buttons
  }
};
</script>
