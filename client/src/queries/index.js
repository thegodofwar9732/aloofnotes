import gql from 'graphql-tag'

export const getAllNotesQuery = gql`
                {
                    allNotes: getAllNotes{
                        id
                        title
                        text
                        created
                    }

                }
                `

export const addNoteMutation = gql`
    mutation change($input:NewNote) {
        addNote(input:$input) {
        id
        title
        text
        created
        }
    }
`

export const editNoteMutation = gql`
    mutation edit($input:EditNote) {
        editNote(input:$input) {
        id
        title
        text
        }
    }
`
