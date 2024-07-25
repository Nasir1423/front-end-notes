import React, { Component } from 'react'
import Search from "./components/Search"
import List from "./components/List"

export default class App extends Component {
  /* users 表示搜索信息，isFirst 表示是否第一次訪問，isLoading 表示是否正在加載，errInfo 表示錯誤信息 */
  /* 第一次發送請求時，isFirst=false；
    發送請求後，isLoading=true，收到响应，isLoading=false；
    响应为数据，更新 users，否则更新 errInfo；
    每次发送请求，errInfo 必须置空 */
  state = { users: [], isFirst: true, isLoading: false, errInfo: "" }

  updateAppState = (newState) => {
    this.setState({ ...newState });
  }

  render() {
    return (
      <div className="container">
        <Search updateAppState={this.updateAppState}></Search>
        <List {...this.state}></List>
      </div>
    )
  }
}
