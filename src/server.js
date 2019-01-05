import express from 'express'
import cors from 'cors'
import {ApolloServer} from 'apollo-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import bodyParser from 'body-parser'
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



mongoose.connect('mongodb://admin:admin1@ds145704.mlab.com:45704/mydb', {useNewUrlParser: true})
.then(response => console.log('Connected to db!'))

app.use(express.static('public'))
app.get('/drop', (req, res) => {
  console.log('drop')
  // noteModel.collection.drop()
  // res.send('Note collection has been dropped!')
  // res.send('hey')
  // console.log('__dirname', __dirname)
  res.send(path.resolve(__dirname, 'public', 'index.html'))
})
app.use(cors)

// app.get('/ok', (req, res)=> {
//   console.log('send file')
//   res.send('ok')
// })

app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`)
})