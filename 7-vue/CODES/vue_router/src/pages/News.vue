<template>
  <div>
    <ul>
      <li v-for="news of newsList" :key="news.id">
        <router-link
          :to="{
            name: 'xinwen',
            params: {
              id: news.id,
              title: news.title,
            },
          }"
          >{{ news.title }}</router-link
        >
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      newsList: [
        { id: "001", title: "新闻 001" },
        { id: "002", title: "新闻 002" },
        { id: "003", title: "新闻 003" },
      ],
    };
  },
};
</script>

<style>
</style>