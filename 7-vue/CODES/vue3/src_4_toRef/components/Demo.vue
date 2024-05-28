<template>
  <h1>name: {{ name }}</h1>
  <h1>age: {{ age }}</h1>
  <h2>height: {{ height }}</h2>
  <h2>weight: {{ weight }}</h2>
</template>

<script>
import {  reactive, toRef } from "vue";

export default {
  name: "Demo",
  setup() {
    const person = reactive({
      name: "chuanyitu",
      age: 19,
      otherInfo: {
        height: 170,
        weight: 70,
      },
    });

    return {
      name: toRef(person, "name"),
      age: toRef(person, "age"),
      height: toRef(person.otherInfo, "height"),
      weight: toRef(person.otherInfo, "weight"),
    };
  },
};
</script>

<style>
</style>