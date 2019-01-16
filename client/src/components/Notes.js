import React from 'react' 
import {Query, Mutation} from 'react-apollo'
import {getAllNotesQuery, editNoteMutation} from '../queries'
import './Notes.css'

export default class Notes extends React.Component{

    // by the way, this query will execute upon every rerender
    // make sure theres not too mant rerenders
    createNotes = ({allNotes})=> {
        return (
            <div id='allNotesContainer'>
                {allNotes.map(this.createNote)}
            </div>
        )   
    }

    
    // create note display
    createNote = note => {
        // TODO: remove suppressContentEditableWarning={true} ??
        note.text = note.text.replace(/\n/g, '<br/>');
        return (
            <Mutation
            mutation={editNoteMutation} 
            key={note.id}
            // no need for update function, cache will be updated automatically because the mutation component is inside the query component
            >
                {(mutate, result) => {
                    return (
                    <div id={note.id} className='noteBox' >
                        <span contentEditable id='noteTitle' suppressContentEditableWarning={true}>{note.title}</span>
                        <span contentEditable id='noteText' suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: note.text}}></span>
                        <button id='editNoteButton' onClick={this.editNote.bind(this, mutate, note)}>Done</button> 
                    </div>
                    )
                }}
            </Mutation>
        )
    }

    editNote = (mutate, note, event) => {

        // grab changed note title and text values
        const changedNote = document.getElementById(note.id)
        let changedTitle = changedNote.childNodes[0].innerHTML
        // TODO: change this if u are removing <br/>
        let changedText = changedNote.childNodes[2].innerHTML 

        // return if there is no change
        if (note.title === changedTitle && note.text === changedText) return
        
        mutate({
            variables:
            {
                input: {
                    "id": note.id,
                    "title": changedTitle,
                    "text": changedText
                }
            }
        })
        
    }

    render() {
        return (
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
        )
    }
}