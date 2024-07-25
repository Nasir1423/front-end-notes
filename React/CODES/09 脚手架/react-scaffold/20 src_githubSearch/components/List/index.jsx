import React, { Component } from 'react'
import "./index.css"

export default class List extends Component {
  render() {
    const { users, isFirst, isLoading, errInfo } = this.props;
    return (
      <div className="row">
        {
          isFirst ? <h2>Welcome, type keyword to search users in github</h2> :
            isLoading ? <h2>Loading...</h2> :
              errInfo ? <h2 style={{ color: "red" }}>{errInfo}</h2> :
                users.map(user => (
                  <div className="card" key={user.id}>
                    <a href={user.html_url} target="_blank" rel="noreferrer">
                      <img alt='avatar' src={user.avatar_url} style={{ width: "100px" }} />
                    </a>
                    <p className="card-text">{user.login}</p>
                  </div>
                ))
        }
      </div>
    )
  }
}
