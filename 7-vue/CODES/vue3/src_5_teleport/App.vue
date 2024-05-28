<template>
  <div id="app">
    <h1>欢迎学习前端</h1>
    <Login></Login>
  </div>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",
  components: { Login },
};
</script>

<style scoped>
#app {
  padding: 20px;
  background-color: azure;
}
</style>