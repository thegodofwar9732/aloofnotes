import React from 'react'
import styled from 'styled-components'

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

const NavDiv = styled.div`
    id: nav;
    background: inherit;
    height: 50px;
    display:flex;
    align-items: center;
    justify-content: space-between;

    @media only screen and (min-width: 1080px) {
        height: 40px;
        margin-left: 10px;
        margin-right: 10px;
    } 
`

const HomeSpan = styled.div`
    margin-left: 1%;
    background: inherit;
    font-size: 24px;
    
    @media only screen and (max-width: 1080px) {
        font-size: 26px;
    }
    `
    
const ToggleThemeButton = styled.div`
    border: solid 1px ${props => props.darkTheme ? `white` : `black`};
    font-size: 20px;
    border-radius: 10px;
    padding: 0.2em;
    cursor: pointer;
    user-select: none;
`

export default React.memo(Navbar2, areEqual)