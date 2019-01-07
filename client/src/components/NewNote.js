import React from 'react'
import {Mutation} from 'react-apollo'
import {addNoteMutation, getAllNotesQuery} from '../queries/index'
import './NewNote.css'

export default class NewNote extends React.Component{
    state = {title: "", text:"", disabled:true}
    
    // let user type into the box
    handleChange = (event)=> {
        let titleOrText = event.target.getAttribute('name')

        this.setState({[titleOrText]: event.target.innerHTML})
        // disable add note button if no text
        if (document.getElementById('text').innerHTML.length === 0) this.setState({disabled: true})
        else this.setState({disabled: false})
    }
    
    // turn on title input box
    handleClick = (event) => {
        // prevent confliction with handleClick on the parent component
        event.stopPropagation()
        if(!this.props.displayTitleInputBox)
            this.props.turnOnTitleBox()
    }

    handleAddNote = (mutate, event)=> {
        event.preventDefault()

        const title = document.getElementById('title').innerHTML
        let text = document.getElementById('text').innerHTML
        
        text = text.replace(/<div>/gi, '\n');
        text = text.replace(/<\/div>/gi, '');
         
        // clear form
        this.setState({title: '', text: ''})
        
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
    }

    // update apollo cache when user adds note to reflect changes immediately on UI
    update = (cache, result)=> {
        let {allNotes} = cache.readQuery({query: getAllNotesQuery })
        cache.writeQuery({
            query: getAllNotesQuery,
            data: {allNotes: allNotes.concat([result.data.addNote])}
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
        <div id='title' className='addNoteInput' name='title' suppressContentEditableWarning={true}
        contentEditable data-placeholder='Add a title' 
        onInput={this.handleChange}
        onKeyDown={this.preventLineBreak}>
        {/* should be empty otherwise it reverses the text direction */}
        </div> : null
    }

    createTextBox = () => {
        return (
            <div id='text' className='addNoteInput' name='text' contentEditable
                suppressContentEditableWarning={true} data-placeholder='Add a note'
                onInput={this.handleChange}>{/* should be empty otherwise it reverses text direction */}
            </div>
        )
    }

    render() {
        return (
            <Mutation mutation={addNoteMutation}
                update={this.update}>
            {
                (mutate, result) => {
                    return (
                        <div id='addNoteContainer' onClick={this.handleClick} autoComplete='off'>
                            {this.createTitleBox()}
                            {this.createTextBox()}
                            <button id='addNoteButton' type='submit' disabled={this.state.disabled}
                            onClick={this.handleAddNote.bind(this, mutate)}
                            >Add</button>
                        </div>
                    )
                }
            }
            </Mutation>
        )
    }
}