<template>
  <div>
    <h1>current sum：{{ $store.state.sum }}</h1>
    <h4>sum multiplied by ten: {{ $store.getters.sumMultipliedBy10 }}</h4>
    <select v-model.number="baseNumber">
      <option value="1">Δ=1</option>
      <option value="2">Δ=2</option>
      <option value="3">Δ=3</option>
    </select>
    <button @click="increaseDelta">+Δ</button>
    <button @click="decreaseDelta">-Δ</button>
    <button @click="increaseDeltaWhenOdd">+Δ(if odd)</button>
    <button @click="increaseDeltaAfterWait">+Δ(after wait)</button>
  </div>
</template>

<script>
export default {
  name: "CountNumber",
  data() {
    return { baseNumber: 0 };
  },
  methods: {
    increaseDelta() {
      this.$store.dispatch("incr_d", this.baseNumber);
      /* this.$store.commit("incr_d", this.baseNumber) // 用户也可以略过 actions，直接提交操作，实现共享数据的更新 */
    },
    decreaseDelta() {
      this.$store.dispatch("decr_d", this.baseNumber);
    },
    increaseDeltaWhenOdd() {
      this.$store.dispatch("incr_d_when_odd", this.baseNumber);
    },
    increaseDeltaAfterWait() {
      this.$store.dispatch("incr_d_after_wait", this.baseNumber);
    },
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
h4 {
  color: cornflowerblue;
}
</style>