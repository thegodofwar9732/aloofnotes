import React, {useState, useEffect, useRef} from 'react'
import {getAllNotesRequest, editNoteRequest} from '../../requests'
import styled from 'styled-components'
import Note2 from './Note2'
import {placeCaretAtEnd} from '../../helper'

const colNum = window.innerWidth < 400 ? 1 : 4 // is NOT responsive if horizontal viewport is manually changed by the user, TODO: make it responsive
const columnWidth = Math.floor(100/colNum)
const requestDelay = 1000

function NotesContainer2({notes, setNotes, notesVersion, setNotesVersion, ...otherProps}) {
	// TODO: add error state
	const [loading, setLoading] = useState(true)
	const [modal, setModal] = useState({show: false, whereAutofocus: ''})
	const [modalNote, setModalNote] = useState({title: '', text: ''})
	let childUniqueKey = 0
	let requestTimer = useRef(null)
	
	useEffect(()=> {		
		(async ()=> {
			const {data} = await getAllNotesRequest()
			setNotes(data.allNotes)
			setLoading(false)
		})() // IIFE - Immediately Invoked Function Expression
	}, [])

	if (loading) return <div>Loading...</div>

	const openNoteInModal = (e, {id, title, text}) => {
		const whereAutofocus = e.target.id
		setModalNote({id, title, text})
		setModal({show: true, whereAutofocus})
		// hide note when modal opens
		let noteBox = document.getElementById(id)
        noteBox.style.visibility = 'hidden'
	}

	const saveChanges = ({id, title, text}) => {
		if (requestTimer.current) {
			clearTimeout(requestTimer.current)
			requestTimer.current = setTimeout(editNoteRequest, requestDelay, {id, title, text})
			return
		}
		requestTimer.current = setTimeout(editNoteRequest, requestDelay, {id, title, text})
	}

	const updateUI = (id, title, text) => {
		notes.some((note, index) => {
			if (note.id === id) {
				const updatedNote = {...note, title, text}   // merge
				const updateNotes = [...notes] // copy
				updateNotes[index] = updatedNote
				setNotes(updateNotes)
				setNotesVersion(notesVersion+1) // trigger a re-render
				return true
			} return false
		})
	}

	const numberOfNotes = notes.length

	const columns = []
	for (let i = 0; i < colNum; i++)
		columns.push([])

	// distributing notes to different columns
	for (let i = 0; i < numberOfNotes; i++) {
		const currentNote = notes[i]
		const noteComponent = <Note2 openNoteInModal={openNoteInModal} key={currentNote.id} note={currentNote} {...otherProps} />
		const columnIndex = i % colNum
		columns[columnIndex].push(noteComponent)
	}


	return (<>
		<ColumnGroup>
			{ columns.map(column => <Column key={childUniqueKey++}  width={columnWidth}>{column}</Column>) }
		</ColumnGroup>
		<Modal modal={modal} setModal={setModal} note={modalNote} saveChanges={saveChanges} updateUI={updateUI}  {...otherProps}/>
	</>)
}


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


const Column = styled.div`
	display: flex;
	flex-direction: column;
	width: ${props => props.width}%;
`

const ColumnGroup = styled.div`
	display: flex;
	justify-content: space-around;
	margin-top: 30px;
	margin-left: 5%;
	margin-right: 5%;
`

function areEqual (prevProps, nextProps) {
	if (prevProps.darkTheme !== nextProps.darkTheme) return false
	if (prevProps.notes.length !== nextProps.notes.length) return false
	if (prevProps.notesVersion !== nextProps.notesVersion) return false
	return true
}

export default React.memo(NotesContainer2, areEqual)