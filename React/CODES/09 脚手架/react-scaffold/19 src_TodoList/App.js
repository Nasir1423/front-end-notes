import React, { Component } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
import "./App.css"

class App extends Component {
  /* 重要：状态在哪里，操作状态的方法就在哪里 */

  /* 设置状态数据，优先从 localStorage 中取，不存在则使用测试数据 */
  constructor(props) {
    super(props);
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    const testTodos = [
      { id: "001", name: "学习 React", done: false },
      { id: "002", name: "跑步五千米", done: false },
      { id: "003", name: "游戏任务", done: true },
    ];
    this.state = { todos: localTodos ? localTodos : testTodos }
  }

  /* 添加一个 todo */
  addTodo = (todo) => {
    const { todos } = this.state;
    const newTodos = [todo, ...todos]; // 注意生成全新的 todos，而不是在原来的 todos 上进行修改
    this.setState({ todos: newTodos });
  }

  /* 更新指定 id 的 todo 状态 */
  updateTodo = (id, done) => {
    const { todos } = this.state;
    const newTodos = todos.map(todo => {
      if (todo.id === id) return { ...todo, done: done };
      else return todo;
    })
    this.setState({ todos: newTodos })
  }

  /* 删除指定 id 的 todo */
  deleteTodo = (id) => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id); // 得到非指定 id 的 todo
    this.setState({ todos: newTodos })
  }

  /* 删除所有已完成的 todo */
  deleteAllDoneTodo = () => {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => !todo.done); // 得到 done=false 的 todo
    this.setState({ todos: newTodos })
  }

  /* 全选或取消全选所有 todo */
  updateAllTodo = (done) => {
    const { todos } = this.state;
    const newTodos = todos.map(todo => ({ ...todo, done }));
    this.setState({ todos: newTodos })
  }

  /* 渲染组件 */
  render() {
    const { addTodo, updateTodo, deleteTodo, deleteAllDoneTodo, updateAllTodo, state: { todos } } = this;
    localStorage.setItem("todos", JSON.stringify(todos)); // 将最新数据保存到 LocalStorage

    return (
      <div id="root">
        <div className="todo-container">
          <div className="todo-wrap">
            <Header addTodo={addTodo} />
            <List todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            <Footer todos={todos} deleteAllDoneTodo={deleteAllDoneTodo} updateAllTodo={updateAllTodo} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;