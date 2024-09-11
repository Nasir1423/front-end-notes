<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model.trim="name"
      @keydown.enter="addTodo"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "TodoInput",
  data() {
    return { name: "" };
  },
  methods: {
    addTodo() {
      if (!this.name) return alert("不能新建内容为空的事项");
      const todo = { id: nanoid(), name: this.name, done: false };
      this.addTodoBefore(todo);
      this.name = "";
    },
  },
  props: ["addTodoBefore"],
};
</script>

<style scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>