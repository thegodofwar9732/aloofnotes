import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import resolvers from './resolvers.js'
import schema from './schema.js'
const PORT = process.env.PORT || 5000

const app = express()

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

apolloServer.applyMiddleware({app})

mongoose.connect('mongodb://admin:admin1@ds145704.mlab.com:45704/mydb', {useNewUrlParser: true})
  .then(response => console.log('Connected to db!'))

app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`)
})