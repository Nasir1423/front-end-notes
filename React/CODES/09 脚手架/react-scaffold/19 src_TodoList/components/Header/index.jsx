import React, { Component } from 'react'
import PropTypes from "prop-types"
import { nanoid } from "nanoid"
import "./index.css"

export default class Header extends Component {
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    handleKeyUp = (event) => {
        const { key, target: { value } } = event; // 解构赋值获取按键字符串和输入框内容
        const { addTodo } = this.props; // addTodo 用于更新状态 todos

        if (key.toLowerCase() !== "enter") return; // 判断是否是回车键
        if (value.trim() === "") return; // 判断输入内容是否为空

        const todoObj = { id: nanoid(), name: value, done: false }; // 创建新的 todo
        addTodo(todoObj); // 添加 todo，更新状态 todos

        event.target.value = ""; // 清空输入框
    }

    render() {
        return (
            <div className="todo-header">
                <input
                    type="text"
                    placeholder="请输入你的任务名称，按回车键确认"
                    onKeyUp={this.handleKeyUp} />
            </div>
        )
    }
}
