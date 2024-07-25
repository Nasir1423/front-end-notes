/* 为 Person 组件服务的 reducer */
import { ADD_PERSON } from "../CONSTANT";

const initState =
    JSON.parse(localStorage.getItem("personState")) ??
    [{ id: "001", name: "Tom", age: 13, }];
const reducer = (prevState = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case ADD_PERSON:
            return [data, ...prevState];
        default:
            return prevState;
    }
}
export default reducer;