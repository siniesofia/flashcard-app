const treeNodesRouter = require('express').Router()
const TreeNode = require('../models/treeNode')

treeNodesRouter.get('/', async (request, response) => {
  const treeNodes = await TreeNode.find({})
  response.json(treeNodes.map(nodes => nodes.toJson()))
})

treeNodesRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const treeNode = new TreeNode({
      isDeleted: false,
      name: [{ version: 0, value: body.name }],
      description: [{ version: 0, value: body.description }],
      parent: [{ version: 0, value: body.parent ? body.parent : null }],
      children: [{ version: 0, value: body.children ? body.children : [] }],
      questions: [{ version: 0, value: body.questions ? body.questions : [] }],
    })

    const savedTreeNode = await treeNode.save()

    response.json(savedTreeNode.toJSON())
  } catch (e) {
    console.log(`Error in treeNodesRouter.post('/'): ${e}`)
  }
})

module.exports = treeNodesRouter
