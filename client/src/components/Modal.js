import React, { Component } from 'react'
import {Mutation} from 'react-apollo'
import {editNoteMutation} from '../queries'
import styled from 'styled-components'
import {placeCaretAtEnd} from '../helper'

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
        let currentTitle = document.getElementById('editTitle').innerHTML
        let currentText = document.getElementById('editText').innerHTML

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

    componentDidMount() {
        // if user clicked on title, autofocus on title
        // otherwise autofocus on text
        if(this.props.autoFocusLocation === 'title')
            /* using only focus() causes caret to go to the beginnning to text or title 
            instead of at the end of it, so need to use helper function to correct that
            */
            placeCaretAtEnd(document.getElementById('editTitle'))
        else
            placeCaretAtEnd(document.getElementById('editText'))
    }

    

    render() {
    let note = this.props.note
    // apollo cache is being updated automatically
        return (
        <ModalBackgroundDiv id='modal-background'>
        <Mutation mutation={editNoteMutation}>
        {
            (mutate, results) => {
                return (
                    <ModalDiv id='modal' darkTheme={this.props.darkTheme}>
                        <EditNoteTitle contentEditable id='editTitle' suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: note.title}} onKeyDown={this.preventLineBreak}
                        ></EditNoteTitle>
                        <EditNoteText contentEditable id='editText' suppressContentEditableWarning={true} dangerouslySetInnerHTML={{__html: note.text}}></EditNoteText>
                        <EditNoteButton onClick={this.editNoteAndClose.bind(this, note, mutate)} darkTheme={this.props.darkTheme}>Done</EditNoteButton>
                    </ModalDiv>
                )
            }
        }
        </Mutation>
        </ModalBackgroundDiv>
        )
    }
}

const ModalBackgroundDiv = styled.div`
    background: rgba(0, 0, 0, 0.5); /* 1 for opacity is black */ 
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
`

const ModalDiv = styled.div`
    background: ${props => props.darkTheme ? `rgb(40, 40, 40)` : `white`};
    border: solid 1px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px #cccccc;
    border-radius: 5px;
    position: fixed;
    left: 3%;
    top: 20%;
    width: 85%;
    display: flex;
    flex-direction: column;
    padding: 1em;    

    @media only screen and (min-width: 1080px) {
        width: 38%;
        top: 35%;
        left: 30%;
    }
`

const EditNoteTitle = styled.span`
    background: none;
    font-size: 1.5em;
    min-height: 1.5em;
    font-weight: bold;
    word-wrap: break-word;
    `
    
    const EditNoteText = styled.span`
    background: none;
    font-size: 1em;
    word-wrap: break-word;
`

const EditNoteButton = styled.button`
    color: ${props => props.darkTheme ? `white` : `black`};
    background: none;
    border-radius: 10px;
    align-self: flex-end;
    border: solid 1px transparent;
    font-size: 1em;
    padding: 0.2em 0.5em 0.2em 0.5em;

    :hover {
        border: solid 1px ${props => props.darkTheme ? `white` : `black`};
    }
`

