import React from 'react'
import styled from 'styled-components'
import {replaceEscapedStringWithHtmlElement} from '../helper'

export default function Note({note: {id, title, text}, openNoteInModal, darkTheme}) {
	const correctedText = replaceEscapedStringWithHtmlElement(text)
	
	return (
		<NoteBox id={id} darkTheme={darkTheme} onClick={e => openNoteInModal(e, {id, title, text})}>
			<NoteTitle id='noteTitle'>{title}</NoteTitle>
			<NoteText id='noteText'>{correctedText}</NoteText>
		</NoteBox>
	)
}

const NoteBox = styled.div`
    background: ${props => props.darkTheme ? `rgb(40, 40, 40)` : `white`};
    border-radius: 5px;
    margin: 3% 1% 3% 1%;
    padding: 3%;
	display: flex;
	// word-wrap: anywhere;
	word-break: break-word;
    flex-direction: column;
    justify-content: flex-start;
    @media only screen and (min-width: 1080px) {
		margin: 3%;
	}
	border: solid 1px ${props => props.darkTheme ? `#666666` : `#999999`};
	:hover {
		box-shadow: 0px 1px 4px ${props => props.darkTheme ? `white` : `black`}
	}
`
const NoteTitle = styled.span`
    font-size: 20px;
    `
const NoteText = styled.span`
    margin-top: 1em;
    height: 100%; //make it fill up the rest of the noteBox
`