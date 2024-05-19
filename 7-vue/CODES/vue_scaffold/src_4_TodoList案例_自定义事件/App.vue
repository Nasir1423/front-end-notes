<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <TodoInput @addTodoBefore="addTodoBefore"></TodoInput>
        <TodoList
          :todos="todos"
          :modifyTodoState="modifyTodoState"
          :removeTodo="removeTodo"
        ></TodoList>
        <TodoFooter
          :done="done"
          :all="all"
          @modifyAllState="modifyAllState"
          @removeDoneTodos="removeDoneTodos"
        ></TodoFooter>
      </div>
    </div>
  </div>
</template>

<script>
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  name: "App",
  components: { TodoInput, TodoList, TodoFooter },
  /* 事项列表 */
  data() {
    return { todos: JSON.parse(window.localStorage.getItem("todos")) || [] };
  },
  computed: {
    /* 已完成事项数量 */
    done() {
      return this.todos.reduce((pre, current) => {
        return pre + (current.done ? 1 : 0);
      }, 0);
    },
    /* 事项总数 */
    all() {
      return this.todos.length;
    },
  },
  methods: {
    /* 从头添加事项 */
    addTodoBefore(todoObj) {
      this.todos.unshift(todoObj);
    },
    /* 修改指定 id 事项状态 */
    modifyTodoState(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) todo.done = !todo.done;
      });
    },
    /* 删除指定 id 事项 */
    removeTodo(id) {
      if (confirm("确认删除该事项吗?")) {
        this.todos = this.todos.filter((todo) => {
          return todo.id !== id;
        });
      }
    },
    /* 修改所有事项状态为 state */
    modifyAllState(state) {
      this.todos.forEach((todo) => {
        todo.done = state;
      });
    },
    /* 删除所有已完成事项 */
    removeDoneTodos() {
      if (this.done === 0) return;
      if (confirm("确认删除所有已完成事项吗?")) {
        this.todos = this.todos.filter((todo) => {
          return !todo.done;
        });
      }
    },
  },
  watch: {
    /* 监视事项列表 */
    todos: {
      deep: true,
      handler(val) {
        window.localStorage.setItem("todos", JSON.stringify(val));
      },
    },
  },
};
</script>

<style>
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>