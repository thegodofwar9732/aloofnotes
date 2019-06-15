import React from 'react'
import {NavDiv, HomeSpan, ToggleThemeButton} from '../Navbar'

function Navbar2 (props) {
	function toggleTheme(e) {
		props.toggleTheme()
	}
	return (
		<NavDiv>
			<HomeSpan>Home</HomeSpan>
			<ToggleThemeButton id='theme' 
			onClick={toggleTheme} darkTheme={props.darkTheme} 
			>Toggle Theme</ToggleThemeButton>
		</NavDiv>
	)
}

function areEqual(prevProps, nextProps) {
	if (prevProps.darkTheme !== nextProps.darkTheme) return false
	return true
}

export default React.memo(Navbar2, areEqual)