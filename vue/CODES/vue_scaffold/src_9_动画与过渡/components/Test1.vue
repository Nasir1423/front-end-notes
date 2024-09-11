/* 动画效果实现 */
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
  name: "Test1",
  data() {
    return { isShow: true };
  },
};
</script>

<style scoped>
h1 {
  background-color: aquamarine;
}

/* 设置 demo 对应的 transition 中元素的进入过程中的动画 */
.demo-enter-active {
  /* 给元素的进入过程应用 chuanyitu 动画，设置持续时间与变换效果 */
  animation: chuanyitu 0.5s linear;
}
/* 设置 demo 对应的 transition 中元素的退出过程中的动画 */
.demo-leave-active {
  /* 给元素的进入过程应用 chuanyitu 动画，设置持续时间与变换效果 */
  animation: chuanyitu 0.5s linear reverse;
}

/* 自定义一个出现动画（元素进入） */
@keyframes chuanyitu {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>