import React from 'react'
import styled from 'styled-components'

export default class Navbar extends React.Component {
    render(){
        return (
            <NavDiv>
                <HomeSpan>Home</HomeSpan>
            </NavDiv>
        )
    }
}

const NavDiv = styled.div`
    background: inherit;
    height: 50px;
    display:flex;
    align-items: center;

    @media only screen and (max-width: 1080px) {
        height: 40px;
        margin-left: 10px;
        margin-right: 10px;
        justify-content: center;
    } 
`

const HomeSpan = styled.div`
    margin-left: 1%;
    background: inherit;
    font-size: 26px;

    @media only screen and (max-width: 1080px) {
        font-size: 26px;
    }
`