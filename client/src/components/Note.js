import React from 'react'
import styled from 'styled-components'

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
            <NoteBox id={note.id} onClick={this.showModal.bind(this, note)} darkTheme={this.props.darkTheme}>
                <NoteTitle id='noteTitle'  dangerouslySetInnerHTML={{__html: note.title}}></NoteTitle>
                <NoteText id='noteText' dangerouslySetInnerHTML={{__html: note.text}}></NoteText>
            </NoteBox>
        )
    }
}

const NoteBox = styled.div`
    background: ${props => props.darkTheme ? `rgb(40, 40, 40)` : `white`};
    border-radius: 5px;
    margin: 3% 1% 3% 1%;
    padding: 3%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    word-break: break-all;
    @media only screen and (min-width: 1080px) {
        margin: 5%;
    }
`

const NoteTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    `
    const NoteText = styled.span`
    margin-top: 1em;
`