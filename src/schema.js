const {gql} =  require('apollo-server-express')

const schema = gql`
  type Query {
    getAllNotes: [Note]!
  }
  type Note {
    id: String!
    title: String
    text: String
    created: Float
  }
  type Mutation {
    addNote(input: NewNote): Note
    editNote(input: EditNote): Note
  }
  input NewNote {
    title: String
    text: String!
  }
  input EditNote {
    id: String!
    title: String!
    text: String!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`
module.exports = schema