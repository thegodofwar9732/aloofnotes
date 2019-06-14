import React from 'react' 
import {Query} from 'react-apollo'
import styled from 'styled-components'
import {getAllNotesQuery} from '../queries'
import Note from './Note'
import Modal from './Modal'

export default class NotesContainer extends React.Component{

    state = {showModal: false, noteToBeEdited: null}

    // by the way, this query will execute upon every rerender
    // make sure theres not too mant rerenders
    createNotes = ({allNotes})=> {
        return (
            <AllNotesContainer>
                {allNotes.map(note => <Note key={note.id} darkTheme={this.props.darkTheme} note={note} showModal={this.showModal} />)}
            </AllNotesContainer>
        )   
    }

    // goes to modal.js
    closeModal = (noteId)=> {
        this.setState({ showModal: false, noteToBeEdited: null})

        // show original note again
        let noteBox = document.getElementById(noteId)
        noteBox.style.visibility = 'visible'
    }
    
    // goes to note.js
    // add the note to the state so that createModal function can access it
    showModal = (note, autoFocusLocation)=> {
        this.setState({showModal: true, noteToBeEdited: note, autoFocusLocation: autoFocusLocation})
    }

    createModal = ()=> {
        return <Modal note={this.state.noteToBeEdited} closeModal={this.closeModal} darkTheme={this.props.darkTheme} autoFocusLocation={this.state.autoFocusLocation}/>       
    }

    render() {
        return (
            <div>
                <Query
                    query={getAllNotesQuery}>
                    {
                        ({ loading, error, data }) => {
                            if (loading) return <p>Loading...</p>
                            if (error) {
                                console.log(error)
                                return 'error'
                            }               
                            return this.createNotes(data)
                        }
                    }    
                </Query>
                {this.state.showModal ? this.createModal() : null}
            </div>
        )
    }
}

const AllNotesContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;

    @media only screen and (min-width: 1080px) {
        grid-template-columns: repeat(4, 1fr);
        margin-left: 4%;
        margin-right: 4%;
    }
`