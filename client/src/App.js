import React, { Component } from 'react';
import Navbar from './components/Navbar'
import NewNote from './components/NewNote'
import Notes from './components/Notes';
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {displayTitleInputBox: false}
    let myUri = 'http://localhost:5000/graphql'
    if (process.env.NODE_ENV === 'production') myUri = '/graphql'
    this.client = new ApolloClient({uri:myUri})
    // TODO: change uri when you are deploying
  }


  turnOnTitleBox = () => this.setState({displayTitleInputBox: true})
  
  turnOffTitleBox = () => {
    // retriving a state variable from the child component 'NewNote'
    const noteTitle = this.newNoteChildComponent.state.title

    // don't hide title box if there is text in it
    if(this.state.displayTitleInputBox && noteTitle.length === 0)
      this.setState({displayTitleInputBox: false})
  }


  render() {
    return (
      <ApolloProvider client={this.client} >
        <div onClick={this.turnOffTitleBox}>
          <Navbar/>
          <NewNote displayTitleInputBox={this.state.displayTitleInputBox} turnOnTitleBox={this.turnOnTitleBox}
          ref={(newNoteChildComponent)=> this.newNoteChildComponent = newNoteChildComponent}/>
          <br/><br/>
          <Notes/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
