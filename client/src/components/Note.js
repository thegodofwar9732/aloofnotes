import React from 'react'
import {Mutation} from 'react-apollo'
import {editNoteMutation} from '../queries'
import './Note.css'

export default class Note extends React.Component {

    state = {showDoneButton: false}

    editNote = (mutate, note, event) => {

        // grab changed note title and text values
        const changedNote = document.getElementById(note.id)
        let changedTitle = changedNote.childNodes[0].innerHTML
        // TODO: change this if u are removing <br/>
        let changedText = changedNote.childNodes[1].innerHTML 

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
        this.setState({showDoneButton: false})
    }

    showDoneButton = (event) => {

        const oldNote = this.props.note

        // grab changed note title and text values
        const changedNote = document.getElementById(oldNote.id)
        let changedTitle = changedNote.childNodes[0].innerHTML
        let changedText = changedNote.childNodes[1].innerHTML 

        if (oldNote.title === changedTitle && oldNote.text === changedText) {
            this.setState({showDoneButton: false})
            return
        }

        if (!this.state.showDoneButton) this.setState({showDoneButton: true})
    }


    render() {
        const note = this.props.note
        // TODO: remove suppressContentEditableWarning={true} ??
        note.text = note.text.replace(/\n/g, '<br/>');
        return (
            <Mutation
            mutation={editNoteMutation} 
            // no need for update function, cache will be updated automatically because the mutation component is inside the query component
            >
                {(mutate, result) => {
                    return (
                    <div id={note.id} className='noteBox' >
                        <span contentEditable onInput={this.showDoneButton} id='noteTitle' suppressContentEditableWarning={true}>{note.title}</span>
                        <span contentEditable onInput={this.showDoneButton} id='noteText' suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: note.text}}></span>

                        {this.state.showDoneButton ? <button id='editNoteButton' onClick={this.editNote.bind(this, mutate, note)}>Done</button> : null}
                    </div>
                    )
                }}
            </Mutation>
        )
    }
}