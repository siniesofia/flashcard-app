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
  questiontypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questiontype',
  },
  content: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
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
