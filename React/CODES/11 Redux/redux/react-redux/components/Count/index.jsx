import React, { Component } from 'react'

export default class Count extends Component {
  increment = () => {
    const { value } = this.selectedNumber;
    this.props.increment(parseInt(value));
  }

  decrement = () => {
    const { value } = this.selectedNumber;
    this.props.decrement(parseInt(value));
  }

  incrementIfOdd = () => {
    const { value } = this.selectedNumber;
    const currentSum = this.props.count;
    if (currentSum % 2 === 0) return;
    this.props.increment(parseInt(value));
  }

  incrementAsync = () => {
    const { value } = this.selectedNumber;
    this.props.incrementAsync(parseInt(value), 1000);
  }

  render() {
    return (
      <>
        <div>当前求和为 {this.props.count}</div>
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
