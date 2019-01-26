import React, { Component } from 'react';
import Navbar from './components/Navbar'
import NewNote from './components/NewNote'
import NotesContainer from './components/NotesContainer';
import {ApolloProvider} from 'react-apollo'
import ApolloClient from 'apollo-boost'
import styled from 'styled-components'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {displayTitleInputBox: false, darkTheme: true}
    let myUri = 'http://localhost:5000/graphql'
    console.log('process', process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') myUri = '/graphql'
    this.client = new ApolloClient({uri:myUri})
  }

  toggleDarkTheme = () => {
    this.setState(prevState => ({darkTheme: !prevState.darkTheme}))
  }

  turnOnTitleBox = () => this.setState({displayTitleInputBox: true})
  
  turnOffTitleBox = () => {

    this.setState(prevState => {
      // if title box is already off, do nothing
      if (!prevState.displayTitleInputBox) return

      // retriving a state variable from the child component 'NewNote'
      const noteTitle = this.newNoteChildComponent.state.title  
      const noteText = this.newNoteChildComponent.state.text

      // don't hide title box if there is text in it
      if (noteTitle.length === 0 && noteText.length === 0)
        return {displayTitleInputBox: false}

    })
  }

  render() {
    return (
      <ApolloProvider client={this.client} >
        <HomeDiv onClick={this.turnOffTitleBox} darkTheme={this.state.darkTheme}>
          <Navbar toggleDarkTheme={this.toggleDarkTheme}/>
          <NewNote displayTitleInputBox={this.state.displayTitleInputBox} turnOnTitleBox={this.turnOnTitleBox} turnOffTitleBox={this.turnOffTitleBox} darkTheme={this.state.darkTheme}
          ref={(newNoteChildComponent)=> this.newNoteChildComponent = newNoteChildComponent}/>
          <br/><br/>
          <NotesContainer darkTheme={this.state.darkTheme}/>
        </HomeDiv>
      </ApolloProvider>
    );
  }
}

export default App;

const HomeDiv = styled.div`
    font-family: 'Roboto';
    background: ${props => props.darkTheme ? `rgb(18, 18, 18)` : `#43abc9`};
    color: ${props => props.darkTheme ? `white` : `black`};
    height: 100%;
`