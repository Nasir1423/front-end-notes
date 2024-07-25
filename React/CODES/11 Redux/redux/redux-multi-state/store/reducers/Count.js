/* 为 Count 组件服务的 reducer */
import { INCREMENT, DECREMENT } from "../CONSTANT";

const initState = 0;
const reducer = (prevState = initState, action) => {
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
export default reducer;