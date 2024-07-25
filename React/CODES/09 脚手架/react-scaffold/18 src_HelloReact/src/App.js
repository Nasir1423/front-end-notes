import React, { Component } from "react";
import Hello from "./components/Hello"
import Welcome from "./components/Welcome"

class App extends Component {
  render() {
    return (
      <>
        <Hello></Hello>
        <Welcome></Welcome>
      </>
    )
  }
}

export default App;