const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
  name: String,
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
})

partSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Part', partSchema)
