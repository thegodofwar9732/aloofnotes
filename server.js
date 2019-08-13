if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express')
const cors = require('cors')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')
const resolvers = require('./src/resolvers.js')
const schema = require('./src/schema.js')
const noteModel = require('./src/model')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers,
})

apolloServer.applyMiddleware({app})


app.get('/drop', (req, res) => {
  noteModel.collection.drop()
  res.send('Note collection has been dropped!<br/><a href="/">Home</a>')
})

if(process.env.NODE_ENV === 'heroku')
  // must come before catch all or else it won't work
  app.use(express.static('public')) 

// the catch all
app.get('*', (req, res) => {
  if(process.env.NODE_ENV === 'heroku')
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  else res.send('This is the backend server on development')
})

app.use(cors)

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
.then(response => console.log('Connected to db!'))

app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`)
  console.log('environment', process.env.NODE_ENV)
})