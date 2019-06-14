import React from 'react'
import styled from 'styled-components'

export default class Navbar extends React.Component {
    
    toggleDarkTheme = (event) => {
        event.stopPropagation()
        this.props.toggleDarkTheme()
    }

    render(){
        return (
            <NavDiv>
                <HomeSpan>Home</HomeSpan>
                <ToggleThemeButton onClick={this.toggleDarkTheme} darkTheme={this.props.darkTheme}>Toggle Theme</ToggleThemeButton>
            </NavDiv>
        )
    }
}

export const NavDiv = styled.div`
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

export const HomeSpan = styled.div`
    margin-left: 1%;
    background: inherit;
    font-size: 24px;
    
    @media only screen and (max-width: 1080px) {
        font-size: 26px;
    }
    `
    
export const ToggleThemeButton = styled.div`
    border: solid 1px ${props => props.darkTheme ? `white` : `black`};
    font-size: 20px;
    border-radius: 10px;
    padding: 0.2em;
    cursor: pointer;
    user-select: none;
`