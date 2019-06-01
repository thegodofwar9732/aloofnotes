import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* this matches everything unless u add 'exact' prop */}
          <Route path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}
