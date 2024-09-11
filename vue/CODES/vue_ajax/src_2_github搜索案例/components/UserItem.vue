<template>
  <div class="card">
    <a :href="user.href" target="_blank">
      <img :src="user.src" style="width: 100px" />
    </a>
    <p class="card-text">{{ user.name }}</p>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  props: ["user"],
};
</script>

<style scoped>
.album {
  min-height: 50rem; /* Can be removed; just added for demo purposes */
  padding-top: 3rem;
  padding-bottom: 3rem;
  background-color: #f7f7f7;
}

.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>