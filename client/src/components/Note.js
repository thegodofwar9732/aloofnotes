import React from 'react'
import './Note.css'

export default class Note extends React.Component {

    showModal = (note) => {
        this.props.showModal(note)

        // hide original note box while modal is here
        let noteBox = document.getElementById(note.id)
        noteBox.style.visibility = 'hidden'
    }

    render() {
        const note = this.props.note
        note.text = note.text.replace(/\n/g, '<br/>');
        return (
            <div id={note.id} className='noteBox' onClick={this.showModal.bind(this, note)}>
                <span id='noteTitle'  dangerouslySetInnerHTML={{__html: note.title}}></span>
                <span id='noteText' dangerouslySetInnerHTML={{__html: note.text}}></span>
            </div>
        )
    }
}