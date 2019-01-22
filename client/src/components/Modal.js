import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import {editNoteMutation} from '../queries'
import './Modal.css'

export default class Modal extends Component {

    // to prevent line breaks in title box
    preventLineBreak = (e)=> {

        // prevent 'enter' key from creating line break in title box
        if (e.keyCode === 13) {
            e.preventDefault()
            // instead have it to go to text box to simulate a tab press
            document.querySelector('#noteTextModal').focus()
        }
    }

    editNoteAndClose = (note, mutate) => {
        this.props.closeModal(note.id)

        // check if there has been a change
        let currentTitle = document.getElementById('noteTitleModal').innerHTML
        let currentText = document.getElementById('noteTextModal').innerHTML

        // do nothing if no change
        if (note.title === currentTitle && note.text === currentText) return

        mutate({
            variables:
            {
                input: {
                    "id": note.id,
                    "title": currentTitle,
                    "text": currentText
                }
            }
        })
    }

    render() {
    let note = this.props.note
    // apollo cache is being updated automatically
        return (
        <div id='modal-background'>
        <Mutation mutation={editNoteMutation}>
        {
            (mutate, results) => {
                return (
                    <div id='modal'>
                        <span contentEditable id='noteTitleModal' suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: note.title}} onKeyDown={this.preventLineBreak}
                        ></span>
                        <span contentEditable id='noteTextModal' suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: note.text}}></span>
                        <button id='editNoteButtonModal' onClick={this.editNoteAndClose.bind(this, note, mutate)}>Done</button>
                    </div>
                )
            }
        }
        </Mutation>
        </div>
        )
    }
}
