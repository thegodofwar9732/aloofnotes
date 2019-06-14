import React from 'react'
import {Mutation} from 'react-apollo'
import {addNoteMutation, getAllNotesQuery} from '../queries/index'
import styled from 'styled-components'

export default class NewNote extends React.Component{
    state = {title: "", text:"", disabled:true}
    
    // let user type into the box
    handleChange = (event)=> {
        let titleOrText = event.target.getAttribute('name')

        this.setState({[titleOrText]: event.target.innerHTML})

        const currentTitle = document.getElementById('title').innerHTML
        const currentText = document.getElementById('text').innerHTML

        // disable add note button if no text AND no title
        if (currentTitle.length === 0 && currentText.length === 0) this.setState({disabled: true})
        else this.setState({disabled: false})
    }
    
    // turn on title input box
    handleClick = (event) => {
        // prevent confliction with handleClick on the parent component
        event.stopPropagation()
        if(!this.props.displayTitleInputBox)
            this.props.turnOnTitleBox()
    }

    // send graphql mutation
    handleAddNote = (mutate, event)=> {
        event.preventDefault()

        const title = document.getElementById('title').innerHTML
        let text = document.getElementById('text').innerHTML
        
        if (text.length > 0) {
            text = text.replace(/<div>/gi, '\n');
            text = text.replace(/<\/div>/gi, '');
            text = text.replace(/<br>/gi, '');
        }

        // clear form and hide title box
        this.setState({title: '', text: ''}, ()=> this.props.turnOffTitleBox())
        
        // state and div innerHTML are no longer linked so need to manually clear each
        // linking them makes typing the text go the wrong way
        document.getElementById('title').innerHTML = ''
        document.getElementById('text').innerHTML = ''
        
        // disable button
        this.setState({disabled: true})

        // make request
        mutate(
            {variables: 
                { input: 
                    {
                        "title": title,
                        "text": text
                    } 
                }
            }
        )
        // close title box
    }

    // update apollo cache when user adds note to reflect changes immediately on UI
    update = (cache, result)=> {
        let {allNotes} = cache.readQuery({query: getAllNotesQuery })
        cache.writeQuery({
            query: getAllNotesQuery,
            data: {allNotes: [result.data.addNote, ...allNotes]}
        })
    }

    // to prevent line breaks in title box
    preventLineBreak = (e)=> {
        // console.log('e', e)
        // console.log('e.keyCode', e.keyCode)

        // prevent 'enter' key from creating line break in title box
        if (e.keyCode === 13) {
            e.preventDefault()
            // instead have it to go to text box to simulate a tab press
            document.querySelector('#text').focus()
        }
    }

    createTitleBox = () => {
        return this.props.displayTitleInputBox ? 
        <AddNoteInput id='title' name='title' suppressContentEditableWarning={true}
        contentEditable data-placeholder='Add a title...' 
        onInput={this.handleChange}
        onKeyDown={this.preventLineBreak}>
        {/* should be empty otherwise it reverses the text direction */}
        </AddNoteInput> : null
    }

    createTextBox = () => {
        return (
            <AddNoteInput id='text' name='text' contentEditable
                suppressContentEditableWarning={true} data-placeholder='Add a note...'
                onInput={this.handleChange}>{/* should be empty otherwise it reverses text direction */}
            </AddNoteInput>
        )
    }

    render() {
        return (
            <Mutation mutation={addNoteMutation}
                update={this.update}>
            {
                (mutate, result) => {
                    return (
                        <AddNoteContainer onClick={this.handleClick} autoComplete='off' darkTheme={this.props.darkTheme}>
                            {this.createTitleBox()}
                            {this.createTextBox()}
                            {
                                this.props.displayTitleInputBox ?
                                <AddNoteButton type='submit' disabled={this.state.disabled}
                                onClick={this.handleAddNote.bind(this, mutate)}
                                darkTheme={this.props.darkTheme}>Add</AddNoteButton> : null
                            }
                        </AddNoteContainer>
                    )
                }
            }
            </Mutation>
        )
    }
}

export const AddNoteContainer = styled.div`
    background: ${props => props.darkTheme ? `rgb(40, 40, 40)` : `white`};
    border-radius: 5px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px ${props => props.darkTheme ? `white` : `black`};
    margin-right:auto;
    margin-left: auto;
    margin-top: 2em;
    width:97%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    /*background:*/
    
    @media only screen and (min-width: 1080px) {
        width:40%;
    }
`
    // border: solid 1px;
// TODO: change this to span to prevent submission of empty notes that have been cleared after typing some characters
export const AddNoteInput = styled.span`
    border:none;
    width:96%;
    border-radius: 10px;
    padding: 1%;
    margin: 0.5em;
    font-size: 18px;
    word-wrap: break-word;

    :empty:before {
        content:attr(data-placeholder);
        color: lightgray;
    }
    :focus {outline: 0;}
`

export const AddNoteButton = styled.button`
    cursor: ${props => props.disabled ? `normal` : `pointer`};
    background: inherit;
    border-radius: 10px;
    border: none;
    padding: 0.2em 0.5em 0.2em 0.5em;
    margin-right: 0.5em;
    margin-bottom: 0.3em;
    color: inherit;
    font-size: 16px;
    border: solid 1px transparent;
    align-self: flex-end;
    ${
        // no hover if disabled
        props => props.disabled ? null :
        `:hover {
            border: solid 1px ${props.darkTheme ? `white` : `black`};
        }`
    }
`