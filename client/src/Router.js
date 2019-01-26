import React, { Component } from 'react'
import App from './App'
import {BrowserRouter} from 'react-router-dom'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    )
  }
}
