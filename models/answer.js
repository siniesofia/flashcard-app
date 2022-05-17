const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  correctAnswer: {
    type: Boolean,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})

answerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Answer', answerSchema)
