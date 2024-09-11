<template>
  <!-- 结构 -->
  <div>
    <h2>Welcome to {{name}}, located in {{position.district}}, {{position.city}}, {{position.province}}</h2>
  </div>
</template>

<script>
/* 交互 */
/* export default 是 ES6 模块化中的默认导出语法 */
/* 这里使用了组件定义的简写方法，即以一个配置对象表示组件 */
export default {
  data() {
    return {
      name: "XDU",
      position: {
        province: "Shaanxi",
        city: "Xi'an",
        district: "Chang'an",
      },
    };
  }
};
</script>

<style scoped>
/* 样式 */
h2 {
  background-color: skyblue;
}
</style>