/* 专为 Count 组件生成 Action 对象 */
import { INCREMENT, DECREMENT } from "./CONSTANT"

export const createIncrementAction = data => ({ type: INCREMENT, data });
export const createDecrementAction = data => ({ type: DECREMENT, data });
export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data));
        }, time);
    }
}