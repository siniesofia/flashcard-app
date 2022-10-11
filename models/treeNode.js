const mongoose = require('mongoose')

const treeNodeSchema = new mongoose.Schema({
  isDeleted: {
    type: Boolean,
    required: true,
  },
  name: [
    {
      version: {
        type: Number,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  description: [
    {
      version: {
        type: Number,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  parent: [
    {
      version: {
        type: Number,
        required: true,
      },
      value: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TreeNode',
      },
    },
  ],
  questions: [
    {
      version: {
        type: Number,
        required: true,
      },
      value: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
        },
      ],
    },
  ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
})

treeNodeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('TreeNode', treeNodeSchema)
