import React from 'react' 
import {Query} from 'react-apollo'
import {getAllNotesQuery} from '../queries'
import './Notes.css'

export default class Notes extends React.Component{

    // by the way, this query will execute upon every rerender
    // make sure theres not too mant rerenders
    createNotes = ({allNotes})=> {
        console.log('allNotes in notes.js', allNotes)
        return (
            <div id='allNotesContainer'>
                {
                    // TODO: remove suppressContentEditableWarning={true} ??
                    allNotes.map(
                        note => {
                            return (
                                <div id='noteBox' key={note.id}>
                                    <span contentEditable id='noteTitle' suppressContentEditableWarning={true}>{note.title}</span>
                                    <br/>
                                    <span contentEditable id='noteText' suppressContentEditableWarning={true}>{note.text}</span>
                                </div>
                            )
                        }
                    )
                }
            </div>
        )
        
        
        
    }

    render() {
        return (
            <Query
                query={getAllNotesQuery}>
                
                {
                    ({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>
                    if (error) {
                        console.log(error)
                        return 'error'
                    }               
                    return this.createNotes(data)
                    }
                }
                
  </Query>
        )
    }
}