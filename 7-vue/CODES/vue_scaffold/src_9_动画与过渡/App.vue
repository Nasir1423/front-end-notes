<template>
  <div id="app">
    <Test1 />
    <Test2 />
    <Test3 />
  </div>
</template>

<script>
import Test1 from "./components/Test1.vue";
import Test2 from "./components/Test2.vue";
import Test3 from "./components/Test3.vue";

export default {
  name: "App",
  components: { Test1, Test2, Test3 },
};
</script>
