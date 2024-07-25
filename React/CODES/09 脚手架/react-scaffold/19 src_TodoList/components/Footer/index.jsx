import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"

export default class Footer extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        deleteAllDoneTodo: PropTypes.func.isRequired,
        updateAllTodo: PropTypes.func.isRequired,
    }

    handleChange = (event) => {
        this.props.updateAllTodo(event.target.checked);
    }

    handleClick = () => {
        this.props.deleteAllDoneTodo();
    }

    render() {
        const { todos } = this.props;
        const doneNum = todos.reduce((acc, todo) => todo.done ? acc + 1 : acc, 0); // 已完成 todo 数量
        const todoNum = todos.length; // todo 数量

        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={doneNum === todoNum && todoNum}
                        onChange={this.handleChange}
                    />
                </label>
                <span>
                    <span>已完成{doneNum}</span> / 全部{todoNum}
                </span>
                <button
                    className="btn btn-danger"
                    onClick={this.handleClick}>
                    清除已完成任务
                </button>
            </div>
        )
    }
}
