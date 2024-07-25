/* 为 Person 组件服务的 actionCreator */
import { ADD_PERSON } from "../CONSTANT"

export const createAddPersonAction = (personObj) => ({ type: ADD_PERSON, data: personObj });