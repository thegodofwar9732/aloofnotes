const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    text: String,
    created: Number
})

const noteModel = mongoose.model('note', noteSchema)

module.exports = noteModel