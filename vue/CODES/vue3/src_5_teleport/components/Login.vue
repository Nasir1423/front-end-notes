<template>
  <button @click="isShowLogin = true">点击登录</button>
  <teleport to="body">
    <div class="modal" v-show="isShowLogin">
      <h4>这里是登录页面，请输入用户名和密码，然后确认</h4>
      <button @click="isShowLogin = false">确认登录</button>
    </div>
  </teleport>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Login",
  setup() {
    let isShowLogin = ref(false);

    return { isShowLogin };
  },
};
</script>

<style scoped>
.modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    width: 300px;
    height: 300px;
    background-color: aqua;
    z-index: 999;
}
</style>