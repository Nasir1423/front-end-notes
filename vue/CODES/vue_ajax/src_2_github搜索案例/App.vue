<template>
  <div class="container">
    <Search />
    <UserList />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import UserList from "./components/UserList.vue";

export default {
  name: "App",
  components: { Search, UserList },
};
</script>