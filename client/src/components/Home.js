import React, {useState} from 'react'
import Navbar from './Navbar'
import NewNote from './NewNote'
import NotesContainer from './NotesContainer'
import styled from 'styled-components'

function Home2 () {
	const [showTitle, setShowTitle] = useState(false)
	const [darkTheme, toggleTheme] = useDarkTheme(true)
	const [notes, setNotes] = useState([])
	const [notesVersion, setNotesVersion] = useState(0) // state to keep track of notes 'versions', everytime a note is modified, notes is updatd and this variable is incremented notify NotesContainer to update
	return (
			<HomeDiv darkTheme={darkTheme} onClick={hideTitle.bind(this, setShowTitle)}>
				<Navbar darkTheme={darkTheme} toggleTheme={toggleTheme} />
				<NewNote notes={notes} setNotes={setNotes}
				setShowTitle={setShowTitle}
				darkTheme={darkTheme} showTitle={showTitle}/>
				<NotesContainer darkTheme={darkTheme} notes={notes} setNotes={setNotes} 
					notesVersion={notesVersion} setNotesVersion={setNotesVersion} />	
			</HomeDiv>
	)
}

function hideTitle(setShowTitle, e) {
	const id = e.nativeEvent.target.id
	// ids of elements whose own event handlers should fire instead of this one to avoid collision
	const elementIdsToIgnore = ['theme', 'title', 'text', 'addnote', 'addNoteContainer']
	if(elementIdsToIgnore.includes(id)) return

	const titleElement = document.getElementById('title') // eslint-disable-next-line
	const title = titleElement && titleElement.innerHTML || ''
	const text = document.getElementById('text').innerHTML
	// don't hide if there is text
	if(title.length > 0 || text.length > 0) return

	setShowTitle(false)
}

function useDarkTheme (isDark) {
	const [darkTheme, setDarkTheme] = useState(isDark)

	function toggleTheme() {
		setDarkTheme(!darkTheme)
	}
	return [darkTheme, toggleTheme]
}

const HomeDiv = styled.div`
    id: home;
    font-family: 'Roboto';
    background: ${props => props.darkTheme ? `rgb(18, 18, 18)` : `white`};
    color: ${props => props.darkTheme ? `white` : `black`};
    height: 100%;

    overflow: auto; // this is needed so that background color will stretch all the way to the bottom when notes overflow past the browser screen height
`

export default Home2