import React, { Component } from 'react';
import Home from './Home'
import {Route, Switch} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          {/* this matches everything unless u add 'exact' prop */}
          <Route path='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
