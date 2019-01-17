import React, { Component } from 'react';
import Navbar from './components/Navbar'
import NewNote from './components/NewNote'
import NotesContainer from './components/NotesContainer';
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {displayTitleInputBox: false}
    let myUri = 'http://localhost:5000/graphql'
    console.log('process', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') myUri = '/graphql'
    this.client = new ApolloClient({uri:myUri})
  }


  turnOnTitleBox = () => this.setState({displayTitleInputBox: true})
  
  turnOffTitleBox = () => {
    console.log('turnOffTitleBox')
    // TODO: title box does not turn off when u add a note, fix this


    // retriving a state variable from the child component 'NewNote'
    const noteTitle = this.newNoteChildComponent.state.title
		console.log("​App -> turnOffTitleBox -> noteTitle", noteTitle)
    
    const noteText = this.newNoteChildComponent.state.text
		console.log("​App -> turnOffTitleBox -> noteText", noteText)
    

    // don't hide title box if there is text in it
    if(this.state.displayTitleInputBox && noteTitle.length === 0 && noteText.length === 0)
      this.setState({displayTitleInputBox: false})
  }


  render() {
    return (
      <ApolloProvider client={this.client} >
        <div onClick={this.turnOffTitleBox}>
          <Navbar/>
          <NewNote displayTitleInputBox={this.state.displayTitleInputBox} turnOnTitleBox={this.turnOnTitleBox} turnOffTitleBox={this.turnOffTitleBox}
          ref={(newNoteChildComponent)=> this.newNoteChildComponent = newNoteChildComponent}/>
          <br/><br/>
          <NotesContainer/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
