<template>
  <div class="main-container">
    <main-map></main-map>
  </div>
</template>

<script>
import mainMap from "./MainMap";
export default {
  name: "mainContainer",
  components: {
    mainMap
  },
  data() {
    return {

    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
