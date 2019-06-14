import React, {useState} from 'react'
import {AddNoteContainer, AddNoteInput, AddNoteButton} from '../NewNote'
import {addNoteRequest} from '../../requests'

export default function NewNote2 (props) {
	console.log('render newnote2')
	const [note, setNote] = useState({title: '', text: ''})
	const [isDisabled, setDisabled] = useState(true)
	const {notes, setNotes, showTitle, setTitleVisibility, darkTheme} = props

	const handleAddNoteArgs = {
		note, setNote, setTitleVisibility, setDisabled, notes, setNotes
	}

	return ( 
		<AddNoteContainer id='addNoteContainer'
		onClick={e => revealTitle(setTitleVisibility, e)}
		darkTheme={darkTheme}
		autoComplete='off'>
			<TitleInput setDisabled={setDisabled}
			showTitle={showTitle} note={note}
			setNote={setNote}/>
			<TextInput setDisabled={setDisabled} 
			setNote={setNote} note={note} />
			{
				showTitle ? 
				<AddNoteButton id='addnote'
				type='submit' disabled={isDisabled}
				onClick={() => handleAddNote(handleAddNoteArgs)} 
				darkTheme={darkTheme}>Add
				</AddNoteButton> : null
			}
		</AddNoteContainer>
	)
}

function revealTitle (setTitleVisibility, e) {
	const id = e.nativeEvent.target.id
	// ignore add note button to avoid collision
	if(id === 'addnote') return
	setTitleVisibility(true)
}

async function handleAddNote ({note, setNote, setTitleVisibility, setDisabled, notes, setNotes}) {
	let {title, text} = note
	text = sanitize(text)

	// state and div innerHTML are no longer linked so need to manually clear each, linking them makes typing the text go the wrong way
	document.getElementById('title').innerHTML = ''
	document.getElementById('text').innerHTML = ''

	// clear state, hide title and disable button
	setNote({title: '', text: ''})		
	setDisabled(true)
	setTitleVisibility(false)

	const {data: {newNote}} = await addNoteRequest({title, text})

	// update ui
	const updatedNotes = [newNote, ...notes] // must create new object(therefore new reference) or else react won't know state has changed and will bail out without rendering children or firing effects, this is because for OBJECTS, react compares references instead of values
	setNotes(updatedNotes)
}


function TitleInput({note, setNote, setDisabled, showTitle}) {
	return showTitle ? 
	<AddNoteInput id='title' name='title' suppressContentEditableWarning={true}
    contentEditable data-placeholder='Add a title...' 
    onInput={updateState.bind(this, note, setNote, setDisabled)}
    onKeyDown={preventLineBreak}/> : null
}

function TextInput({note, setNote, setDisabled}) {
	return (
		<AddNoteInput id='text' name='text' contentEditable
			suppressContentEditableWarning={true} data-placeholder='Add a note...'
			onInput={updateState.bind(this, note, setNote, setDisabled)}/>
	)
}



function sanitize(text) {
	if (text.length > 0) {
		text = text.replace(/<div>/gi, '\n');
		text = text.replace(/<\/div>/gi, '');
		text = text.replace(/<br>/gi, '\n');
		text = text.replace(/&nbsp/gi, ' ');
	}
	return text
}


function updateState (note, setNote, setDisabled, event) {
	let titleOrText = event.target.getAttribute('name')
	const val = event.target.innerHTML
	note = {...note,  [titleOrText]: val}
	setNote(note)

	// disable add note button if no text AND no title
	if (note.title.length === 0 && note.text.length === 0) 
		setDisabled(true)
	else setDisabled(false)
}

function preventLineBreak (e) {
	// prevent 'enter' key from creating line break in title box
	if (e.keyCode === 13) {
		e.preventDefault()
		// instead go to TextInputBox
		document.querySelector('#text').focus()
	}
}