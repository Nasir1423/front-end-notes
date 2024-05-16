<template>
  <!-- 结构 -->
  <div>
    <School></School>
    <Student></Student>
    <Believe></Believe>
  </div>
</template>

<script>
/* 交互 */
/* import 自定义名 from 文件地址 是 ES6 模块化中默认导入语法 */
import School from "./School.vue";
import Student from "./Student.vue";
import Believe from "./Believe.vue";
/* export default 是 ES6 模块化中的默认导出语法 */
/* 这里使用了组件定义的简写方法，即以一个配置对象表示组件 */
export default {
  components: { School, Student, Believe },
};
</script>

<style lang="en">
/* 样式 */
</style>