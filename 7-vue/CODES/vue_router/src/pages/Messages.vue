<template>
  <div>
    <ul>
      <li v-for="msg of msgList" :key="msg.id">
        <router-link
          :to="{
            name: 'xiangqing',
            query: {
              id: msg.id,
              title: msg.title,
            },
          }"
          >{{ msg.title }}</router-link
        >
        <button @click="pushRead(msg)">push 查看</button>
        <button @click="replaceRead(msg)">replace 查看</button>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Messages",
  data() {
    return {
      msgList: [
        { id: "001", title: "消息 001" },
        { id: "002", title: "消息 002" },
        { id: "003", title: "消息 003" },
      ],
    };
  },
  methods: {
    pushRead(msg) {
      const target = {
        name: "xiangqing",
        query: { id: msg.id, title: msg.title },
      };
      const current = {
        name: this.$route.name,
        query: this.$route.query,
      };

      if (
        current.name !== target.name ||
        JSON.stringify(current.query) !== JSON.stringify(target.query)
      ) {
        this.$router.push(target).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.log(err);
          }
        });
      } else {
        console.log("不能重复跳转到一个路由");
      }
    },
    replaceRead(msg) {
      const target = {
        name: "xiangqing",
        query: { id: msg.id, title: msg.title },
      };
      const current = {
        name: this.$route.name,
        query: this.$route.query,
      };

      if (
        current.name !== target.name ||
        JSON.stringify(current.query) !== JSON.stringify(target.query)
      ) {
        this.$router.replace(target).catch((err) => {
          if (err.name !== "NavigationDuplicated") {
            console.log(err);
          }
        });
      } else {
        console.log("不能重复跳转到一个路由");
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>