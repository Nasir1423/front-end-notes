import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  createIncrementAction,
  createDecrementAction,
  createAsyncIncrementAction
} from "../../store/actions/Count"
import "./index.css"

class CountUI extends Component {
  increment = () => {
    const { value } = this.selectNode;
    this.props.increment(parseInt(value));
  }

  decrement = () => {
    const { value } = this.selectNode;
    this.props.decrement(parseInt(value));
  }

  incrementIfOdd = () => {
    const { value } = this.selectNode;
    const { count } = this.props;
    if (count % 2 === 0) return;
    this.props.increment(parseInt(value));
  }

  asyncIncrement = () => {
    const { value } = this.selectNode;
    this.props.asyncIncrement(parseInt(value), 1000);
  }

  render() {
    const { count, personNum } = this.props;

    return (
      <>
        <h1>Count Component <span style={{ color: "skyblue" }}>Person Number Below is {personNum}</span></h1>
        <h3>Current Count is <span style={{ color: "red", fontSize: "24px" }}>{count}</span></h3>
        <select ref={currentNode => this.selectNode = currentNode}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        <button onClick={this.incrementIfOdd}>IncrementIfOdd</button>
        <button onClick={this.asyncIncrement}>AsyncIncrement</button>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { count: state.count, personNum: state.persons.length }
}

const mapDispatchToProps = {
  increment: createIncrementAction,
  decrement: createDecrementAction,
  asyncIncrement: createAsyncIncrementAction
}

const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);
export default CountContainer;