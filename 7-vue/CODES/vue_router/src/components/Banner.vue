<template>
  <div>
    <h2>Vue Router Demo</h2>
    <button @click="back">←</button>
    <button @click="forward">→</button>
    <input
      type="number"
      placeholder="正数前进，负数后退"
      v-model="step"
      @keydown.enter="go"
    />
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return { step: "" };
  },
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
    go(){
      this.$router.go(this.step)
    },
    debounce(func, wait) {
      let timer;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func();
        }, wait);
      };
    },
  },
  mounted(){
    this.go = this.debounce(this.go, 500)
  }
};
</script>

<style scoped>
button {
  margin-right: 15px;
}
</style>