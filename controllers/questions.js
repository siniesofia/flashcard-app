const questionsRouter = require('express').Router()
const Question = require('../models/question')
const Course = require('../models/course')
const Part = require('../models/part')

questionsRouter.get('/', async (request, response) => {
  const question = await Question.find({})
    .populate('partId', { name: 1 })
    .populate('courseId', { name: 1 })
    .populate('questiontypeId', { name: 1 })
    // .populate('answerId', { content: 1 })
  response.json(questions.map(questions => questions.toJSON()))
})

questionsRouter.get('/:id', async (request, response) => {
  const question = await Question.findById(request.params.id)
  if (question) {
    response.json(question.toJSON())
  } else {
    response.status(404).end()
  }
})

questionsRouter.post('/', async (request, response) => {
  const body = request.body

  const course = await Course.findById(body.courseId)
  const part = await Part.findById(body.partId)

  const question = new Question({
    courseId: body.courseId,
    partId: body.partId,
    questiontypeId: body.questiontypeId,
    content: body.content,
    answers: body.answers,
  })

  const savedQuestion = await question.save()

  response.json(savedQuestion.toJSON())

})

questionsRouter.delete('/:id', async (request, response) => {
  await Question.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = questionsRouter