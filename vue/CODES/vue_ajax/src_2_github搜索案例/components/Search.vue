<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="keyword"
      />&nbsp;
      <button @click="getSearchResult">Search</button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    getSearchResult() {
      this.$bus.$emit("getSearchResult", this.keyword);
    },
  },
};
</script>

<style>
</style>