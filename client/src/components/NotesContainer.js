import React, {useState, useEffect, useRef, memo} from 'react'
import {getAllNotesRequest, editNoteRequest} from '../requests'
import styled from 'styled-components'
import Note from './Note'
import Modal from './Modal'
import {findColNum} from '../helper'
import Loader from 'react-loader-spinner'

const requestDelay = 1000

function NotesContainer2({notes, setNotes, notesVersion, setNotesVersion, ...otherProps}) {
	// TODO: add error state
	const [loading, setLoading] = useState(true)
	const [modal, setModal] = useState({show: false, whereAutofocus: ''})
	const [modalNote, setModalNote] = useState({title: '', text: ''})
	const [colNum, setColNum] = useState(findColNum())
	let childUniqueKey = 0
	let requestTimer = useRef(null)
	
	useEffect(()=> {		
		(async ()=> {
			const {data} = await getAllNotesRequest()
			setNotes(data.allNotes)
			setLoading(false)
		})() // IIFE - Immediately Invoked Function Expression
	}, [])

	// be responsive to changing viewport
	useEffect(() => {
		function updateColNums () {
			setColNum(findColNum())
		}
		window.onresize = updateColNums
		return function cleanup() {
			window.removeEventListener('resize', updateColNums)
		}
	}, [])

	if (loading) return (
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%'}}>
			<Loader color='#ffffff' type='Oval' height='150' width='150' />
		</div>
	)
	
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
		const noteComponent = <Note openNoteInModal={openNoteInModal} key={currentNote.id} note={currentNote} {...otherProps} />
		const columnIndex = i % colNum
		columns[columnIndex].push(noteComponent)
	}
	
	const columnWidth = Math.floor(100/colNum)
	
	return (<>
		<ColumnGroup>
			{ columns.map(column => <Column key={childUniqueKey++}  width={columnWidth}>{column}</Column>) }
		</ColumnGroup>
		<Modal modal={modal} setModal={setModal} note={modalNote} saveChanges={saveChanges} updateUI={updateUI}  {...otherProps}/>
	</>)
}

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

export default memo(NotesContainer2, areEqual)