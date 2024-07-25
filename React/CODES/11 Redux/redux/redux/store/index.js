/* 创建了一个 store 对象 */
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import {thunk} from "redux-thunk"
import countReducer from "./countReducer"

export default createStore(countReducer, applyMiddleware(thunk));