import React, { Component } from 'react'
import store from "../../store"
import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from "../../store/countAction"

export default class Count extends Component {
  increment = () => {
    const { value } = this.selectedNumber;
    store.dispatch(createIncrementAction(parseInt(value)));
  }

  decrement = () => {
    const { value } = this.selectedNumber;
    store.dispatch(createDecrementAction(parseInt(value)));
  }

  incrementIfOdd = () => {
    const { value } = this.selectedNumber;
    const currentSum = store.getState();
    if (currentSum % 2 === 0) return;
    store.dispatch(createIncrementAction(parseInt(value)));

  }

  incrementAsync = () => {
    const { value } = this.selectedNumber;
    store.dispatch(createIncrementAsyncAction(parseInt(value), 1000));
  }

  render() {
    return (
      <>
        <div>当前求和为 {store.getState()}</div>
        <div>
          <select ref={currentNode => this.selectedNumber = currentNode}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.incrementIfOdd}>IncrementIfOdd</button>
          <button onClick={this.incrementAsync}>IncrementAsync</button>
        </div>
      </>
    )
  }
}
