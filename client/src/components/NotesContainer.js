import React from 'react' 
import {Query} from 'react-apollo'
import {getAllNotesQuery} from '../queries'
import './NotesContainer.css'
import Note from './Note'

export default class NotesContainer extends React.Component{

    // by the way, this query will execute upon every rerender
    // make sure theres not too mant rerenders
    createNotes = ({allNotes})=> {
        return (
            <div id='allNotesContainer'>
                {allNotes.map(note => <Note key={note.id} note={note}/>).reverse()}
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