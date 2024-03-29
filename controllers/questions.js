const { v4: uuidv4 } = require('uuid')
const questionsRouter = require('express').Router()
const Question = require('../models/question')

questionsRouter.get('/', async (request, response) => {
  const questions = await Question.find({})
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

  const newAnswers = body.answers.map(answer => ({
    id: uuidv4(),
    correctAnswer: answer.correctAnswer,
    content: answer.content,
  }))

  const question = new Question({
    questiontype: body.questiontype,
    content: body.content,
    answers: newAnswers,
  })

  const savedQuestion = await question.save()

  response.json(savedQuestion.toJSON())
})

questionsRouter.delete('/:id', async (request, response) => {
  await Question.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = questionsRouter
