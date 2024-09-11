<template>
  <div id="app">
    <button @click="getStudents">获取学生信息</button>
    <br />
    <br />
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  methods: {
    getStudents() {
      axios
        .get("http://localhost:8080/demo/students")
        .then((res) => {
          console.log("请求成功 ", res.data);
        })
        .catch((err) => {
          console.log("请求失败 ", err.message);
        });
    },
    getCars() {
      axios
        .get("http://localhost:8080/api/cars")
        .then((res) => {
          console.log("请求成功 ", res.data);
        })
        .catch((err) => {
          console.log("请求失败 ", err.message);
        });
    },
  },
};
</script>
