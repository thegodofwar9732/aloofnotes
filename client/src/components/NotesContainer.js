import React from 'react' 
import {Query} from 'react-apollo'
import {getAllNotesQuery} from '../queries'
import './NotesContainer.css'
import Note from './Note'
import Modal from './Modal'

export default class NotesContainer extends React.Component{

    state = {showModal: false, noteToBeEdited: null}

    // by the way, this query will execute upon every rerender
    // make sure theres not too mant rerenders
    createNotes = ({allNotes})=> {
        return (
            <div id='allNotesContainer'>
                {allNotes.map(note => <Note key={note.id} note={note} showModal={this.showModal} />).reverse()}
            </div>
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
    showModal = (note)=> {
        this.setState({showModal: true, noteToBeEdited: note})
    }

    createModal = ()=> {
        return <Modal note={this.state.noteToBeEdited} closeModal={this.closeModal}/>       
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