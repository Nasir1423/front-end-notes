/* 为 Count 组件服务的 actionCreator */
import { INCREMENT, DECREMENT } from "../CONSTANT"

export const createIncrementAction = (number) => ({ type: INCREMENT, data: number });
export const createDecrementAction = (number) => ({ type: DECREMENT, data: number });
export const createAsyncIncrementAction = (number, delay) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(number))
        }, delay);
    }
};