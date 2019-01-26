import React from 'react'
import styled from 'styled-components'

export default class Navbar extends React.Component {
    
    toggleDarkTheme = () => this.props.toggleDarkTheme()

    render(){
        return (
            <NavDiv>
                <HomeSpan>Home</HomeSpan>
                <ToggleDarkThemeButton onClick={this.toggleDarkTheme}>Toggle Theme</ToggleDarkThemeButton>
            </NavDiv>
        )
    }
}

const NavDiv = styled.div`
    background: inherit;
    height: 50px;
    display:flex;
    align-items: center;
    justify-content: center;

    @media only screen and (min-width: 1080px) {
        height: 40px;
        margin-left: 10px;
        margin-right: 10px;
        justify-content: space-between;
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
    
    const ToggleDarkThemeButton = styled.div`
    border: solid 1px black;
    font-size: 20px;
    border-radius: 10px;
    padding: 0.2em;
    
`