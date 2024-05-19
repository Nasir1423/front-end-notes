/* 过渡效果实现 */
<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- 使用 transition 标签包裹要过渡或播放动画的元素 -->
    <transition name="demo" appear>
      <h1 v-show="isShow">你好，世界</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Test2",
  data() {
    return { isShow: true };
  },
};
</script>

<style scoped>
h1 {
  background-color: aquamarine;
}

/* 设置元素进入起点和离开终点的样式 */
.demo-enter,
.demo-leave-to {
  transform: translateX(-100%);
}

/* 设置元素离开起点和进入终点的样式 */
.demo-leave,
.demo-enter-to {
  transform: translateX(0px);
}

/* 设置元素进入和离开过程的过渡效果 */
.demo-enter-active,
.demo-leave-active {
  transition: 0.5s all linear;
}
</style>