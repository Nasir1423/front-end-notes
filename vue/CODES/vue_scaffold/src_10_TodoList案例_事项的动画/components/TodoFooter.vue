<template>
  <div class="todo-footer" v-show="all">
    <label>
      <input type="checkbox" v-model="isChecked" />
    </label>
    <span>
      <span>已完成{{ done }}</span> / 全部{{ all }}
    </span>
    <button class="btn btn-danger" @click="removeDone">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "TodoFooter",
  props: ["done", "all"],
  computed: {
    isChecked: {
      set(val) {
        this.$bus.$emit("modifyAllState", val);
      },
      get() {
        return this.done === this.all && this.all > 0;
      },
    },
  },
  methods: {
    removeDone() {
      this.$bus.$emit("removeDoneTodos");
    },
  },
};
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>