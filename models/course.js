const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  name: String,
  year: String,
})

courseSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Course', courseSchema)
