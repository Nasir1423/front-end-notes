<template>
  <div>
    <ul>
      <li>消息编号：{{ $route.query.id || $route.params.id }}</li>
      <li>消息标题：{{ $route.query.title || $route.params.id }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Detail",
};
</script>

<style>
</style>