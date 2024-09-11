<template>
  <!-- 结构 -->
  <div>
    <h2>
      Welcome to {{ name }}, located in {{ position.district }},
      {{ position.city }}, {{ position.province }}
      <button @click="sendSchoolInfo">发送学校信息给学生组件</button>
    </h2>
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
  },
  methods: {
    sendSchoolInfo() {
      this.$bus.$emit(
        "getSchoolInfo",
        `${this.name}, located in ${this.position.district} ${this.position.city} ${this.position.province}`
      );
    },
  },
  mounted() {
    this.$bus.$on("getStudentInfo", (info) => {
      alert("学校组件接收到一个学生信息为 " + info);
    });
  },
  beforeDestroy() {
    this.$bus.$off("getStudentInfo");
  },
};
</script>

<style scoped>
/* 样式 */
h2 {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: #87ceeb; /* 背景颜色 */
  padding: 10px; /* 内边距 */
}
</style>