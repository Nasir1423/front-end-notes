<template>
  <!-- 结构 -->
  <div>
    <h2>{{ name }}-{{ age }}-{{ gender }}, student in this school</h2>
  </div>
</template>

<script>
/* 交互 */
/* export default 是 ES6 模块化中的默认导出语法 */
/* 这里使用了组件定义的简写方法，即以一个配置对象表示组件 */
export default {
  data() {
    return {
      name: "chuanYiTu",
      age: 22,
      gender: "male",
    };
  }
};
</script>

<style scoped>
/* 样式 */
h2 {
  background-color: aqua;
}
</style>