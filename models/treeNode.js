const mongoose = require('mongoose')

const treeNodeSchema = new mongoose.Schema({
  isDeleted: {
    type: Boolean,
    required: true,
  },

  //"access" field will relate to functionality
  //to access a node by specific users

  // access: [
  //   {
  //     version: {
  //       type: Number,
  //       required: true,
  //     },
  //     value: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,
  //         ref: 'User',
  //       },
  //     ],
  //   },
  // ],
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
  children: [
    {
      version: {
        type: Number,
        required: true,
      },
      value: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'TreeNode',
        },
      ],
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
})

treeNodeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('TreeNode', treeNodeSchema)
