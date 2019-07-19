import React, {useState} from 'react'
import styled from 'styled-components'
import {addNoteRequest} from '../requests'

function NewNote (props) {
	const [note, setNote] = useState({title: '', text: ''})
	const [isDisabled, setDisabled] = useState(true)
	const {notes, setNotes, showTitle, setShowTitle, darkTheme} = props

	const handleAddNoteArgs = {
		note, setNote, setShowTitle, setDisabled, notes, setNotes
	}

	return ( 
		<AddNoteContainer id='addNoteContainer'
		onClick={e => revealTitle(setShowTitle, e)}
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

function revealTitle (setShowTitle, e) {
	const id = e.nativeEvent.target.id
	// ignore add note button to avoid collision
	if(id === 'addnote') return
	setShowTitle(true)
}

async function handleAddNote ({note, setNote, setShowTitle, setDisabled, notes, setNotes}) {
	let {title, text} = note
	text = sanitize(text)

	// state and div innerHTML are no longer linked so need to manually clear each, linking them makes typing the text go the wrong way
	document.getElementById('title').innerHTML = ''
	document.getElementById('text').innerHTML = ''

	// clear state, hide title and disable button
	setNote({title: '', text: ''})		
	setDisabled(true)
	setShowTitle(false)

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

const AddNoteContainer = styled.div`
    background: ${props => props.darkTheme ? `rgb(40, 40, 40)` : `white`};
    border-radius: 5px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px ${props => props.darkTheme ? `white` : `#999999`};
    margin-right:auto;
    margin-left: auto;
    margin-top: 2em;
    width:97%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /*background:*/
    
    @media only screen and (min-width: 1080px) {
        width:40%;
    }
`
    // border: solid 1px;
// TODO: change this to span to prevent submission of empty notes that have been cleared after typing some characters
const AddNoteInput = styled.span`
    border:none;
    width:96%;
    border-radius: 10px;
    padding: 1%;
    margin: 0.5em;
    font-size: 18px;
    word-wrap: break-word;

    :empty:before {
        content:attr(data-placeholder);
        color: gray;
    }
    :focus {outline: 0;}
`

const AddNoteButton = styled.button`
    cursor: ${props => props.disabled ? `normal` : `pointer`};
    background: inherit;
    border-radius: 10px;
    border: none;
    padding: 0.2em 0.5em 0.2em 0.5em;
    margin-right: 0.5em;
    margin-bottom: 0.3em;
    color: inherit;
    font-size: 16px;
    border: solid 1px transparent;
    align-self: flex-end;
    ${
        // no hover if disabled
        props => props.disabled ? null :
        `:hover {
            border: solid 1px ${props.darkTheme ? `white` : `black`};
        }`
    }
`

function areEqual (prevProps, nextProps) {
	if (prevProps.showTitle !== nextProps.showTitle) return false
	if (prevProps.darkTheme !== nextProps.darkTheme) return false
	return true
}

export default React.memo(NewNote, areEqual)