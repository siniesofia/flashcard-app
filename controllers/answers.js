const answersRouter = require('express').Router()
const Answer = require('../models/answer')
// const Course = require('../models/course')
// const Part = require('../models/part')

answersRouter.get('/', async (request, response) => {
  const answers = await Answer.find({})
  response.json(answers.map(answers => answers.toJSON()))
})

answersRouter.get('/:id', async (request, response) => {
  const answer = await Answer.findById(request.params.id)
  if (answer) {
    response.json(answer.toJSON())
  } else {
    response.status(404).end()
  }
})

answersRouter.post('/', async (request, response) => {
  const body = request.body

  // const course = await Course.findById(body.courseId)
  // const part = await Part.findById(body.partId)

  const answer = new Answer({
    content: body.contet,
    correctAnswer: body.correctAnswer,
    cardId: body.cardId,
  })

  const savedAnswer = await answer.save()

  // course.cards = course.cards.concat(savedCard._id)
  // await course.save()

  // part.cards = course.parts.concat(savedCard._id)
  // await part.save()

  response.json(savedAnswer.toJSON())

})

answersRouter.delete('/:id', async (request, response) => {
  await Answer.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = answersRouter