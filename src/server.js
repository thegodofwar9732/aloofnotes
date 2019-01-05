import express from 'express'
import cors from 'cors'
import {ApolloServer} from 'apollo-server-express'
import mongoose from 'mongoose'
import resolvers from './resolvers.js'
import schema from './schema.js'
import noteModel from './model'
import path from 'path'
const PORT = process.env.PORT || 5000

const app = express()

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

apolloServer.applyMiddleware({app})


app.get('/drop', (req, res) => {
  noteModel.collection.drop()
  res.send('Note collection has been dropped!')
})

if(process.env.NODE_ENV === 'production')
  // must come before catch all or else it won't work
  app.use(express.static('public')) 

// the catch all
app.get('*', (req, res) => {
  console.log('process', process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'production')
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  else res.send('This is the backend server on development')
})

app.use(cors)

mongoose.connect('mongodb://admin:admin1@ds145704.mlab.com:45704/mydb', {useNewUrlParser: true})
.then(response => console.log('Connected to db!'))

app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`)
})