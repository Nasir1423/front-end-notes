/* 定义 Count 的容器组件 */
import { connect } from "react-redux" // 引入 connect 函数，创建容器组件，用于连接 UI 组件和 redux
import CountUI from "../../components/Count"; // 引入 Count 的 UI 组件
import { // 引入 actionCreators
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from "../../store/countAction"

/*  connect 函数的第一个参数，用于将 Redux 的 store 维护的 state 映射为 UI 组件的数据 props。
    传递状态。 */
function mapStateToProps(state) {
    return { count: state };
}

/*  connect 函数的第二个参数，用于将 Redux 的 store 的 dispatch 映射为 UI 组件的方法 props。
    传递操作状态的方法。 */
function mapDispatchToProps(dispatch) {
    return {
        increment: number => dispatch(createIncrementAction(number)),
        decrement: number => dispatch(createDecrementAction(number)),
        incrementAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
    }
}

/* 创建并暴露 Count 的容器组件 */
const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);
export default CountContainer;