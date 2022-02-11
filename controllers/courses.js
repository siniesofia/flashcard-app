const coursesRouter = require('express').Router()
const Course = require('../models/course')


coursesRouter.get('/', async (request, response) => {
  const courses = await Course.find({}).populate('parts', { name: 1 }).populate('cards', { question: 1 })
  response.json(courses.map(courses => courses.toJSON()))
})

coursesRouter.get('/:id', async (request, response) => {
  const course = await Course.findById(request.params.id)
  if (course) {
    response.json(course.toJSON())
  } else {
    response.status(404).end()
  }
})

coursesRouter.post('/', async (request, response) => {
  const body = request.body

  const course = new Course({
    id: 1,
    name: body.name || null,
    parts: body.parts || null,
    cards: body.cards
  })

  const savedCourse = await course.save()
  response.json(savedCourse.toJSON())

})

coursesRouter.delete('/:id', async (request, response) => {
  await Course.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = coursesRouter

