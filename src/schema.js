import {gql} from 'apollo-server-express'

const schema = gql`
  type Query {
    getAllNotes: [Note]!
  }
  type Note {
    id: String!
    title: String
    text: String!
    created: Float!
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