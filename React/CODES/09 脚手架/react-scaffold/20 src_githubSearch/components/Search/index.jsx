import React, { Component } from 'react'
import axios from "axios"

export default class Search extends Component {
  state = { keyword: "" }

  handleChange = (event) => {
    this.setState({ keyword: event.target.value });
  }

  handleClick = () => {
    const { keyword } = this.state;
    const { updateAppState } = this.props;
    updateAppState({ users: [], isFirst: false, isLoading: true, errInfo: "" });
    axios.get(`https://api.github.com/search/users?q=${keyword}`)
      .then(res => {
        updateAppState({ isLoading: false, users: res.data.items });
      })
      .catch(err => {
        updateAppState({ isLoading: false, errInfo: err.message });
      })
  }

  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input onChange={this.handleChange} type="text" placeholder="enter the name you search" />
          &nbsp;
          <button onClick={this.handleClick}>Search</button>
        </div>
      </section>
    )
  }
}
