/* 定义了一个为 Count 组件服务的 reducer 函数 */
import { INCREMENT, DECREMENT } from "./CONSTANT"
const initState = 0; // 初始值
function countReducer(prevState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case INCREMENT:
            return prevState + data;
        case DECREMENT:
            return prevState - data;
        default:
            return prevState;
    }
}

export default countReducer;