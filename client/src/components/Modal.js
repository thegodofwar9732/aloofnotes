import React, {useEffect} from 'react'
import styled from 'styled-components'
import {placeCaretAtEnd} from '../helper'

function Modal({note: {id, title, text}, modal, setModal, saveChanges, updateUI, darkTheme}) {
	let modified = false

	const closeModal = htmlId => {
		if (htmlId === 'modalBackground') {
			setModal({show: false, whereAutofocus: ''})

			// restore note when modal closes
			let noteBox = document.getElementById(id)
			noteBox.style.visibility = 'visible'

			const newTitle = document.getElementById('modalTitle').innerHTML
			const newText = document.getElementById('modalText').innerHTML
			modified && updateUI(id, newTitle, newText)
		}
	}
	const handleInput = ({target}) => {
		modified = true
		const newValue = target.innerHTML
		const key = target.getAttribute('name')
		saveChanges({id, title, text, [key]: newValue})
	}

	useEffect(() => {
		if (modal.whereAutofocus === 'noteTitle')
			placeCaretAtEnd(document.getElementById('modalTitle'))
		if (modal.whereAutofocus === 'noteText')
			placeCaretAtEnd(document.getElementById('modalText'))
	})

	return modal.show && (
		<ModalBackground onMouseDown={e=> closeModal(e.target.id)} id='modalBackground'>
			<ModalDiv darkTheme={darkTheme}>
				<EditNoteTitle contentEditable suppressContentEditableWarning onInput={handleInput} id='modalTitle' name='title'>{title}</EditNoteTitle>
				<EditNoteText contentEditable suppressContentEditableWarning onInput={handleInput} id='modalText' name='text'>{text}</EditNoteText>
				<EditNoteButton darkTheme={darkTheme}/>
			</ModalDiv>
		</ModalBackground>
	)
}

const ModalBackground = styled.div`
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
    left: 1%;
    top: 20%;
    width: 89%;
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
    :focus {outline: 0;}
    `
    
const EditNoteText = styled.span`
    background: none;
    font-size: 1em;
    min-height: 1em;
    word-wrap: break-word;
    :focus {outline: 0;}
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

export default Modal