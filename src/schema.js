import {gql} from 'apollo-server-express'

const schema = gql`
  type Query {
    getAllNotes: [Note]!
  }
  type Note {
    title: String
    text: String!
    created: String!
  }
  type Mutation {
    addNote(input: NewNote): Note
  }
  input NewNote {
    title: String
    text: String!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`
export default schema