import React, { useState } from 'react'
import styled from 'styled-components'
import { IoMdMoon, IoMdSunny } from 'react-icons/io'
// constants
const iconSize = '2em'

function Navbar2 (props) {
	function toggleTheme(e) {
		props.toggleTheme()
	}
	return (
		<NavDiv>
			<HomeSpan>Home</HomeSpan>
			<ToggleThemeButton id='theme' 
			onClick={toggleTheme} darkTheme={props.darkTheme} />
		</NavDiv>
	)
}

const StyledIcon = styled.div`
    cursor: pointer;
    :hover {
        color: gray;
    }
`
const Tooltip = styled.label`
    visibility: ${props => props.visible ? `visible` : `hidden`};
    font-size: 0.8em;
    background: ${props => props.darkTheme ? `white` : `black`};
    color: ${props => props.darkTheme ? `black` : `white`};
    border-radius: 5px;
    padding: 3px;
    position: absolute;
    right: 8px;
    @media only screen and (min-width: 1080px) {
        right: 30px;
    }
`

function ToggleThemeButton({darkTheme, onClick}) {
    const [showTooltip, setShowTooltip] = useState(false)
    const reveal = () => setShowTooltip(true)
    const hide = () => setShowTooltip(false)
    const icon = darkTheme ? <IoMdSunny size={iconSize} /> : <IoMdMoon size={iconSize} />
    return (
        <div style={{marginRight: '30px'}}>
            <StyledIcon onClick={onClick} onMouseEnter={reveal} onBlur={hide}
            onMouseLeave={hide} tabindex="0">{icon}</StyledIcon>
            <Tooltip visible={showTooltip} darkTheme={darkTheme}>Toggle theme</Tooltip>
        </div>
    ) 
}

function areEqual(prevProps, nextProps) {
	if (prevProps.darkTheme !== nextProps.darkTheme) return false
	return true
}

const NavDiv = styled.div`
    id: nav;
    background: inherit;
    // background: green;
    height: 60px;
    display:flex;
    align-items: center;
    justify-content: space-between;

    @media only screen and (min-width: 1080px) {
        height: 70px;
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

export default React.memo(Navbar2, areEqual)