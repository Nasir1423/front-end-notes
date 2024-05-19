<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="alter(todo.id)" />
      <!-- 如下代码也可以实现：“用户更改勾选状态时同步到 todos 中”，但是并不标准，也不太推荐，这样修改了 props -->
      <!-- <input type="checkbox" v-model="todo.done"/> -->
      <span v-show="!todo.isEdit">{{ todo.name }}</span>
      <input
        type="text"
        :value="todo.name"
        ref="updateInput"
        v-show="todo.isEdit"
        @blur="handleBlur(todo.id)"
      />
    </label>

    <button class="btn btn-danger" @click="remove(todo.id)">删除</button>
    <button
      class="btn btn-edit"
      @click="handleEdit(todo.id)"
      v-show="!todo.isEdit"
    >
      编辑
    </button>
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
    handleEdit(id) {
      this.$bus.$emit("alterEditState", id, true);

      // this.timer = setTimeout(() => {
      //   this.$refs.updateInput.focus();
      //   clearTimeout(this.timer);
      // }, 16);
      this.$nextTick(() => {
        this.$refs.updateInput.focus();
      });
    },
    handleBlur(id) {
      const newName = this.$refs.updateInput.value;
      this.$bus.$emit("alterEditState", id, false);
      if (!newName.trim()) return alert("修改后的内容为空，修改失败");
      this.$bus.$emit("updateTodo", id, newName);
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

li button:first-of-type {
  margin-left: 5px;
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