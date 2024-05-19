<template>
  <div id="app">
    <School></School>
    <Student></Student>
    <Believe></Believe>
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";
import Believe from "./components/Believe.vue";

export default {
  name: "App",
  components: {
    School,
    Student,
    Believe,
  }
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
