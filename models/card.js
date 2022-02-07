const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const cardSchema = new mongoose.Schema({
    id: Number,
    courseId: Number,
    partId: Number,
    question: {
      type: String,
      required: true
    },
    answers: {
      type: Object,
      // minlength: 4,
      // required: true
    },
    correctAnswerId: Number
  })

cardSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Card', cardSchema)