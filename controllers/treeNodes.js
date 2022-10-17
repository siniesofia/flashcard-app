const treeNodesRouter = require('express').Router()
const TreeNode = require('../models/treeNode')

treeNodesRouter.get('/allTrees', async (req, res) => {
  try {
    const treeNodes = await TreeNode.find({ isDeleted: false })
    res.json(treeNodes.map(nodes => nodes.toJSON()))
  } catch (e) {
    console.log(`Error in treeNodesRouter.get('/'): ${e}`)
  }
})

treeNodesRouter.get('/oneTree/:id', async (req, res) => {
  try {
    const treeNodeInTree = await TreeNode.findById(req.params.id)
    if (treeNodeInTree) {
      const rootNode = treeNodeInTree.course
      const treeInQuestion = await TreeNode.find({ course: rootNode })
      res.json(treeInQuestion.map(nodes => nodes.toJSON()))
    } else {
      res.status(404).end()
    }
  } catch (e) {
    console.log(`Error in treeNodesRouter.get('/oneTree/:id'): ${e}`)
  }
})

treeNodesRouter.get('/oneNode/:id', async (req, res) => {
  try {
    const treeNodeInTree = await TreeNode.findById(req.params.id)
    if (treeNodeInTree) {
      res.json(treeNodeInTree.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (e) {
    console.log(`Error in treeNodesRouter.get('/oneNode/:id'): ${e}`)
  }
})

treeNodesRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    const potentialDuplicate = await TreeNode.findOne({
      'name.value': body.name,
    })

    if (potentialDuplicate) {
      res.status(400).end('Nimi on jo käytössä')
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

    res.json(savedTreeNode.toJSON())
  } catch (e) {
    console.log(`Error in treeNodesRouter.post('/'): ${e}`)
  }
})

treeNodesRouter.post('/updateNode/:id', async (req, res) => {
  try {
    const body = req.body

    const treeNodeInTree = await TreeNode.findById(req.params.id)

    if (treeNodeInTree.isDeleted) {
      res.status(204).end()
    }

    const potentialDuplicate = await TreeNode.find({
      'name.value': body.name,
    })

    if (!potentialDuplicate) {
      if (
        potentialDuplicate.length > 1 ||
        potentialDuplicate.id !== treeNodeInTree.id
      ) {
        res.status(400).end('Nimi on jo käytössä')
        return
      }
    }

    Object.keys(body).forEach(key => {
      if (key === 'isDeleted' || key === 'id') {
        return
      }
      treeNodeInTree[key].push({
        version: getNewVersion(treeNodeInTree[key]),
        value: body[key],
      })
    })

    res.json((await treeNodeInTree.save()).toJSON())
  } catch (e) {
    console.log(`Error in treeNodesRouter.post('/updateNode/:id'): ${e}`)
  }
})

treeNodesRouter.delete('/softDelete/:id', async (req, res) => {
  try {
    await TreeNode.findByIdAndUpdate(req.params.id, { isDeleted: true })
    res.status(204).end()
  } catch (e) {
    console.log(`Error in treeNodesRouter.delete('/softDelete/:id'): ${e}`)
  }
})

treeNodesRouter.delete('/hardDelete/:id', async (req, res) => {
  try {
    await TreeNode.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (e) {
    console.log(`Error in treeNodesRouter.delete('/hardDelete/:id'): ${e}`)
  }
})

const getNewVersion = array => {
  let newestVersion = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i].version > newestVersion) {
      newestVersion = array[i].version
    }
  }
  return newestVersion + 1
}

module.exports = treeNodesRouter
