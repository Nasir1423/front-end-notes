/* 第三方动画实现 */
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <transition
      appear
      name="animate__animated animate__bounce"
      enter-active-class="animate__lightSpeedInRight"
      leave-active-class="animate__fadeOutUp"
    >
      <h1 v-show="isShow">你好，世界</h1>
    </transition>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "Test3",
  data() {
    return { isShow: true };
  },
};
</script>

<style scoped>
h1 {
  background-color: aquamarine;
}
</style>