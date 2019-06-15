import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Home2 from './components/Version 2/Home2'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* this matches everything unless u add 'exact' prop */}
          <Route path='/old' component={Home} />
          <Route path='/' component={Home2} />
        </Switch>
      </BrowserRouter>
    )
  }
}
