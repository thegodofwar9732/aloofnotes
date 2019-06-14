import React, {useState, useEffect} from 'react'
import {getAllNotesRequest} from '../../requests'
import styled from 'styled-components'

function NotesContainer2({notes, setNotes, ...otherProps}) {
	console.log('render NotesContainer2 45')
	// TODO: add error state
	const [loading, setLoading] = useState(true)

	useEffect(()=> {		
		(async ()=> {
			const {data} = await getAllNotesRequest()
			setNotes(data.allNotes)
			setLoading(false)
		})() // IIFE - Immediately Invoked Function Expression
	}, [])

	if (loading) return <div>Loading...</div>
	const len = notes.length
	const colNum = window.innerWidth < 400 ? 1 : 4 // is NOT responsive if horizontal viewport is manually changed by the user TODO: make it responsive

	const columns = []
	for (let i = 0; i < colNum; i++)
		columns.push([])

	for (let i = 0; i < len; i++) {
		const cur = notes[i]
		const e = <Note key={cur.id} note={cur} {...otherProps} />
		columns[i%colNum].push(e)
	}

	const col = {display: 'flex', flexDirection: 'column',  width: `${Math.floor(100/colNum)}%`}
	let c = 0
	return (
		<div style={{display: 'flex', justifyContent: 'space-around',  marginTop: '30px', marginLeft: '5%', marginRight: '5%'
		}} >
			{
				columns.map(column => <div key={c++} style={col}>{column}</div>)
			}
		</div>
	)
}


function Note({note: {title, text}, darkTheme}) {
	return (
		<NoteBox darkTheme={darkTheme}>
			<NoteTitle id='noteTitle'>{title}</NoteTitle>
			<NoteText id='noteText'>{text}</NoteText>
		</NoteBox>
	)
}
			
const NoteBox = styled.div`
    background: ${props => props.darkTheme ? `rgb(40, 40, 40)` : `white`};
    border-radius: 5px;
    margin: 3% 1% 3% 1%;
    padding: 3%;
	display: flex;
	word-wrap: anywhere;
    flex-direction: column;
    justify-content: flex-start;
    @media only screen and (min-width: 1080px) {
		margin: 3%;
	}
	border: solid 1px ${props => props.darkTheme ? `#666666` : `#111111`};
	:hover {
		box-shadow: 0px 1px 4px ${props => props.darkTheme ? `white` : `black`}
	}
`
	// word-break: break-all;
const NoteTitle = styled.span`
    font-size: 20px;
    font-weight: bold;
    `
const NoteText = styled.span`
    margin-top: 1em;
    height: 100%; //make it fill up the rest of the noteBox
`




function areEqual (prevProps, nextProps) {
	if (prevProps.darkTheme !== nextProps.darkTheme) return false
	if (prevProps.notes.length !== nextProps.notes.length) return false
	return true
}

export default React.memo(NotesContainer2, areEqual)