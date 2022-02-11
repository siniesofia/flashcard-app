const partsRouter = require('express').Router()
const Part = require('../models/part')
const Course = require('../models/course')


partsRouter.get('/', async (request, response) => {
  const parts = await Part.find({}).populate('courseId', { name: 1 }).populate('cards', { question: 1 })
  response.json(parts.map(parts => parts.toJSON()))
})

partsRouter.get('/:id', async (request, response) => {
  const part = await Part.findById(request.params.id)
  if (part) {
    response.json(part.toJSON())
  } else {
    response.status(404).end()
  }
})

partsRouter.post('/', async (request, response) => {
  const body = request.body

  const course = await Course.findById(body.courseId)

  const part = new Part({
    name: body.name,
    courseId: body.courseId,
    cards: body.cards,
    course: course._id
  })

  const savedPart = await part.save()

  course.parts = course.parts.concat(savedPart._id)
  await course.save()

  response.json(savedPart.toJSON())

})

partsRouter.delete('/:id', async (request, response) => {
  await Part.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = partsRouter