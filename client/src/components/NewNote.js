import React from 'react'
import {Mutation} from 'react-apollo'
import {addNoteMutation, getAllNotesQuery} from '../queries/index'
import './NewNote.css'

export default class NewNote extends React.Component{
    state = {title: "", text:"", disabled:true}
    
    // let user type into the box
    handleChange = (event)=> {
        this.setState({[event.target.name]: event.target.value})
        // disable add note button if no text
        if (document.getElementById('text').value.length === 0) this.setState({disabled: true})
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
        const title = event.target[0].value
        const text = event.target[1].value

        // clear form
        this.setState({title: '', text: ''})

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

    render() {
        return (
            <Mutation mutation={addNoteMutation}
            update={(cache, result)=> {
                let {allNotes} = cache.readQuery({query: getAllNotesQuery })
                cache.writeQuery({
                    query: getAllNotesQuery,
                    data: {allNotes: allNotes.concat([result.data.addNote])}
                })
            }}
            >
            {
                (mutate, result) => {
                    return (
                        <div id='addNoteContainer'>
                            <form id='addNoteForm' onSubmit={this.handleAddNote.bind(this, mutate)} onClick={this.handleClick}>
                                {
                                    this.props.displayTitleInputBox ? 
                                    <input className='addNoteInput' placeholder="Add title" name='title'
                                    value={this.state.title}
                                    onChange={this.handleChange}/> : null
                                }
                                <br/>
                                <input id='text' className='addNoteInput' placeholder="Add a note" name='text'
                                value={this.state.text} 
                                onChange={this.handleChange}/>
                                <button id='addNoteButton' type='submit' disabled={this.state.disabled}>Add</button>
                            </form>
                        </div>
                    )
                }
            }
            </Mutation>
        )
    }
}