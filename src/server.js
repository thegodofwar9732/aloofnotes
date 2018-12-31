const express = require('express')
const {ApolloServer, gql} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const bodyParser = require('body-parser')
import {constant} from './constant'
import addressResolver from './addressResolver'
const PORT = process.env.PORT || 5000

const app = express()

const schema = gql`
  type Query {
    hello: String
    getPerson: Person
  }
  type Person {
    firstName: String
    lastName: String
    address: String
  }
  schema {
    query: Query
  }
`

const resolvers = 
{
  Query : {
    hello: () => 'hello broski',
    getPerson: () => ({
    firstName: 'Muhtasim', 
    lastName: 'Chowdhury',
    address: addressResolver
    })
  }
}

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers
})
console.log(apolloServer.graphqlPath)

apolloServer.applyMiddleware({app})


app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`)
})