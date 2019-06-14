import React, { Component } from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Home2 from './components/Version 2/Home2'
// import Test from './Test'

export default class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* this matches everything unless u add 'exact' prop */}
          <Route path='/new' component={Home2} />
          <Route path='/' component={Home} />
          {/* <Route path='/test' component={Test} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}
