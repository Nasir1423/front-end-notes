<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="alter(todo.id)" />
      <!-- 如下代码也可以实现：“用户更改勾选状态时同步到 todos 中”，但是并不标准，也不太推荐，这样修改了 props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" @click="remove(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"],
  methods: {
    alter(id) {
      this.$bus.$emit("modifyTodoState", id);
    },
    remove(id) {
      this.$bus.$emit("removeTodo", id);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>