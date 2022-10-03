const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  partId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Part',
  },
  questiontype: {
    type: String,
    enum: ['monivalinta', 'avoin'],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  answers: [
    {
      id: {
        type: String,
        required: true,
      },
      correctAnswer: {
        type: Boolean,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
})

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Question', questionSchema)
