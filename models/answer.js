const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const answerSchema = new mongoose.Schema({
  correctAnswer: {
    type: Boolean,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  },
})

answerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Answer', answerSchema)