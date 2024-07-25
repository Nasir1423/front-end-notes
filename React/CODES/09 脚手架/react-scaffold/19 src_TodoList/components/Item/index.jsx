import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"

export default class Item extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        updateTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    }

    state = { isMouseEnter: false };

    /* 鼠标移入：高亮、显示删除按钮；鼠标移除：正常，隐藏删除按钮 */
    handleMouseEnterLeave = (isMouseEnter) => {
        return () => {
            this.setState({ isMouseEnter });
        }
    }

    /* 点击复选框时执行的回调函数，用于更新状态 todos 对应 todo 的 done 值 */
    handleCheck = (id) => {
        return (event) => {
            this.props.updateTodo(id, event.target.checked)
        }
    }

    /* 点击删除按钮时用于删除 todo */
    handleDelete = (id) => {
        return () => {
            if (!window.confirm("You want to delete this todo?")) return;
            this.props.deleteTodo(id);
        }
    }


    render() {
        const { id, name, done } = this.props;
        const { isMouseEnter } = this.state;
        return (
            <li style={{ backgroundColor: isMouseEnter ? "#ddd" : "white" }}
                onMouseEnter={this.handleMouseEnterLeave(true)}
                onMouseLeave={this.handleMouseEnterLeave(false)}>
                <label>
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={this.handleCheck(id)} />
                    <span>{name}</span>
                </label>
                <button
                    className="btn btn-danger"
                    style={{ display: isMouseEnter ? "block" : "none" }}
                    onClick={this.handleDelete(id)}>
                    删除
                </button>
            </li>
        )
    }
}
