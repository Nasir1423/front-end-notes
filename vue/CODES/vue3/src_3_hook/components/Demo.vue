<template>
  <h2>当前鼠标点坐标为 ({{ point.x }}, {{ point.y }})</h2>
</template>

<script>
import usePoint from "../hooks/usePoint";
export default {
  name: "Demo",

  setup() {
    const point = usePoint();

    return { point };
  },
};
</script>

<style>
</style>