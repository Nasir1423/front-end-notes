<template>
  <!-- 结构 -->
  <div>
    <h2>
      {{ name }}-{{ age }}-{{ gender }}, student in this school
      <button @click="sendStudentInfo">发送学生信息给学校组件</button>
    </h2>
  </div>
</template>

<script>
/* 交互 */
/* export default 是 ES6 模块化中的默认导出语法 */
/* 这里使用了组件定义的简写方法，即以一个配置对象表示组件 */
import pubsub from "pubsub-js";
export default {
  data() {
    return {
      name: "chuanYiTu",
      age: 22,
      gender: "male",
    };
  },
  methods: {
    sendStudentInfo() {
      // 发布消息
      pubsub.publish(
        "StudentInfo",
        `name: ${this.name}, age: ${this.age}, gender: ${this.gender}`
      );
    },
  },
  mounted() {
    // 订阅消息
    this.pid = pubsub.subscribe("SchoolInfo", (msgName, info) => {
      alert("学生组件接收到学校信息为 " + info);
    });
  },
  beforeDestroy() {
    // 取消订阅
    pubsub.unsubscribe(this.pid);
  },
};
</script>

<style scoped>
/* 样式 */
h2 {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: aqua; /* 背景颜色 */
  padding: 10px; /* 内边距 */
}
</style>