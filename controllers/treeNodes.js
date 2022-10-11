const treeNodesRouter = require('express').Router()
const TreeNode = require('../models/treeNode')

treeNodesRouter.get('/allTrees', async (request, response) => {
  try {
    const treeNodes = await TreeNode.find({})
    response.json(treeNodes.map(nodes => nodes.toJSON()))
  } catch (e) {
    console.log(`Error in treeNodesRouter.get('/'): ${e}`)
  }
})

treeNodesRouter.get('/oneTree/:id', async (request, response) => {
  try {
    const treeNodeInTree = await TreeNode.findById(request.params.id)
    console.log('treeNodeInTree')
    if (treeNodeInTree) {
      const rootNode = treeNodeInTree.course
      const treeInQuestion = await TreeNode.find({ course: rootNode })
      response.json(treeInQuestion.map(nodes => nodes.toJSON()))
    } else {
      response.status(404).end()
    }
  } catch (e) {
    console.log(`Error in treeNodesRouter.get('/:id'): ${e}`)
  }
})

treeNodesRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const potentialDuplicate = await TreeNode.findOne({
      'name.value': body.name,
    })

    if (potentialDuplicate) {
      response.status(400).end('Nimi on jo käytössä')
      return
    }

    const treeNode = new TreeNode({
      isDeleted: false,
      //these fields are required
      name: [{ version: 0, value: body.name }],
      description: [{ version: 0, value: body.description }],
      course: body.course,
      //these fields are optional
      parent: [{ version: 0, value: body.parent ? body.parent : null }],
      questions: [{ version: 0, value: body.questions ? body.questions : [] }],
    })

    const savedTreeNode = await treeNode.save()

    response.json(savedTreeNode.toJSON())
  } catch (e) {
    console.log(`Error in treeNodesRouter.post('/'): ${e}`)
  }
})

module.exports = treeNodesRouter
