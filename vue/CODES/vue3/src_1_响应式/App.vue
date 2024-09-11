<template>
  <Demo @hi="greeting" school="XDU">
    <template v-slot:welcome>
      <h1>欢迎学习前端</h1>
    </template>
  </Demo>
</template>

<script>
import Demo from "./components/Demo.vue";
export default {
  name: "App",
  components: { Demo },
  setup(props, context) {
    function greeting() {
      alert("欢迎学习 Vue");
    }

    return { greeting };
  },
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
