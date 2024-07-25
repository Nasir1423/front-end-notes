import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import countReducer from "./reducers/Count"
import personReducer from "./reducers/Person"

const combinedReducers = combineReducers({ count: countReducer, persons: personReducer })
const store = createStore(combinedReducers, applyMiddleware(thunk));
export default store;

store.subscribe(() => {
    const {persons} = store.getState();
    localStorage.setItem("personState", JSON.stringify(persons));
})