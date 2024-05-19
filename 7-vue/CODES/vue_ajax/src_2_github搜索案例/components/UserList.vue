<template>
  <div>
    <!-- 当用户列表存在数据再进行渲染 -->
    <div class="row" v-show="users.length">
      <UserItem v-for="user in users" :key="user.id" :user="user" />
    </div>
    <!-- 当用户首次登入页面，显示欢迎词 -->
    <h1 v-show="state.isFirst">Welcome to use</h1>
    <!-- 当正在加载用户列表，显示加载中 -->
    <h1 v-show="state.isLoading">Loading...</h1>
    <!-- 当用户列表请求失败，显示失败信息 -->
    <h1 v-show="state.errMsg">Error: {{ state.errMsg }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import UserItem from "./UserItem.vue";
export default {
  name: "UserList",
  data() {
    return {
      users: [],
      state: { isFirst: true, isLoading: false, errMsg: "" },
    };
  },
  components: { UserItem },
  mounted() {
    this.$bus.$on("getSearchResult", (keyword) => {
      this.state.isFirst = false; // 当用户搜索后，触发 getSearchResult 事件，修改页面状态信息为已使用
      this.state.isLoading = true; // 紧接着页面状态信息为加载中
      this.state.errMsg = "";
      this.users = [];

      axios
        .get(`https://api.github.com/search/users?q=${keyword || " "}`)
        .then((response) => {
          this.state.isLoading = false; // Ajax 请求执行完毕后，修改页面状态信息为加载完毕
          console.log("请求成功!");
          this.users = response.data.items.map((item) => ({
            href: item["html_url"],
            src: item["avatar_url"],
            name: item.login,
            pid: item.id,
          }));
        })
        .catch((error) => {
          this.state.isLoading = false; // Ajax 请求执行完毕后，修改页面状态信息为加载完毕
          this.state.errMsg = error.response.data.message;
          console.error("请求失败 " + error.response.data.message);
        });
    });
  },
  beforeDestroy() {
    this.$bus.$off("getSearchResult");
  },
};
</script>
