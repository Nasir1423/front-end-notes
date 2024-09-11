<template>
  <slot name="welcome"></slot>
  <h1>页面启动时间为 {{ launchTime }}</h1>
  <h1>当前时间为 {{ currentTime }}</h1>
  <h2>
    当前正位于 {{ address.district }}- {{ address.city }} -
    {{ address.province }} , {{ address.country }}
  </h2>
  <button @click="updateCurrentTime">更新当前时间</button> <br /><br />
  <button @click="logRef">控制台输出 ref(基本数据类型) 的 RefImpl 对象</button>
  <br /><br />
  <button @click="logReactive">
    控制台输出 reactive(对象数据类型) 的 Proxy 对象
  </button>
  <br /><br />
  <button @click="sayHi">点击触发 Demo 组件身上的 hi 事件</button>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  name: "Demo",
  props: ["school"],
  emits: ["hi"],
  beforeCreate() {
    console.log("生命周期 beforeCreate 调用了");
  },
  // setup 第一种用法 —— 返回对象
  setup(props, context) {
    console.log("setup 函数调用了");
    console.log(props);
    console.log(context);
    // console.log(props.school);
    /* 这里使用 ref 对数据做了响应式处理 */
    // 基本数据类型
    let launchTime = ref(new Date().toTimeString());
    let currentTime = ref(new Date().toTimeString());

    /* 这里使用 reactive 对数据做了响应式处理 */
    // 对象数据类型
    let address = reactive({
      district: "长安区",
      city: "西安",
      province: "陕西",
      country: "中国",
    });

    function updateCurrentTime() {
      currentTime.value = new Date().toTimeString();
    }

    function logRef() {
      console.log(this);
      console.log("基本数据类型 RefImpl", launchTime);
    }

    function logReactive() {
      console.log("对象数据类型 Proxy", address);
    }

    function sayHi() {
      context.emit("hi");
    }

    return {
      launchTime,
      currentTime,
      address,
      updateCurrentTime,
      logRef,
      logReactive,
      sayHi,
    };
  },
};
</script>

<style>
</style>