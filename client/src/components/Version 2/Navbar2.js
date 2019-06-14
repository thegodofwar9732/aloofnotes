import React from 'react'
import {NavDiv, HomeSpan, ToggleThemeButton} from '../Navbar'

export default function Navbar2 (props) {
	console.log('render navbar2')
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