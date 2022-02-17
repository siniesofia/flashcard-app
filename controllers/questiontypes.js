const questiontypesRouter = require('express').Router()
const Questiontype = require('../models/questiontype')
// const Course = require('../models/course')


questiontypesRouter.get('/', async (request, response) => {
  const questiontypes = await Questiontype.find({})
  response.json(questiontypes.map(questiontypes => questiontypes.toJSON()))
})
questiontypesRouter.get('/:id', async (request, response) => {
  const questiontype = await Questiontype.findById(request.params.id)
  if (questiontype) {
    response.json(questiontype.toJSON())
  } else {
    response.status(404).end()
  }
})

questiontypesRouter.post('/', async (request, response) => {
  const body = request.body

  // const course = await Course.findById(body.courseId)

  const questiontype = new Questiontype({
    name: body.name,
    id: body.id
  })

  const savedQuestiontype = await questiontype.save()

  // course.parts = course.parts.concat(savedPart._id)
  // await course.save()

  response.json(savedQuestiontype.toJSON())

})

questiontypesRouter.delete('/:id', async (request, response) => {
  await Questiontype.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = questiontypesRouter
