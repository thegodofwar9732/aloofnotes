import React, {useState} from 'react'
import Navbar2 from './Navbar2'
import NewNote2 from './NewNote2'
import NotesContainer2 from './NotesContainer2'
import {HomeDiv} from '../Home'

function Home2 () {
	const [showTitle, setTitleVisibility] = useState(false)
	const [darkTheme, toggleTheme] = useDarkTheme(true)
	const [notes, setNotes] = useState([])
	return (
			<HomeDiv darkTheme={darkTheme} onClick={hideTitle.bind(this, setTitleVisibility)}>
				<Navbar2 darkTheme={darkTheme} toggleTheme={toggleTheme} />
				<NewNote2 notes={notes} setNotes={setNotes}
				setTitleVisibility={setTitleVisibility}
				darkTheme={darkTheme} showTitle={showTitle}/>
				<NotesContainer2 darkTheme={darkTheme} notes={notes} setNotes={setNotes} />	
			</HomeDiv>
	)
}

function hideTitle(setTitleVisibility, e) {
	const id = e.nativeEvent.target.id
	// ids of elements whose own event handlers should fire instead of this one to avoid collision
	const elementIdsToIgnore = ['theme', 'title', 'text', 'addnote', 'addNoteContainer']
	if(elementIdsToIgnore.includes(id)) return

	const titleElement = document.getElementById('title')
	const title = titleElement && titleElement.innerHTML || ''
	const text = document.getElementById('text').innerHTML
	// don't hide if there is text
	if(title.length > 0 || text.length > 0) return

	setTitleVisibility(false)
}

function useDarkTheme (isDark) {
	const [darkTheme, setDarkTheme] = useState(isDark)

	function toggleTheme() {
		setDarkTheme(!darkTheme)
	}
	return [darkTheme, toggleTheme]
}

export default Home2