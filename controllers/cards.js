const cardsRouter = require('express').Router()
const Card = require('../models/card')
const Course = require('../models/course')
const Part = require('../models/part')

cardsRouter.get('/', async (request, response) => {
  const cards = await Card.find({})
    .populate('partId', { name: 1 })
    .populate('courseId', { name: 1 })
    .populate('questiontypeId', { name: 1 })
    // .populate('answerId', { content: 1 })
  response.json(cards.map(cards => cards.toJSON()))
})

cardsRouter.get('/:id', async (request, response) => {
  const card = await Card.findById(request.params.id)
  if (card) {
    response.json(card.toJSON())
  } else {
    response.status(404).end()
  }
})

cardsRouter.post('/', async (request, response) => {
  const body = request.body

  const course = await Course.findById(body.courseId)
  const part = await Part.findById(body.partId)

  const card = new Card({
    courseId: body.courseId,
    partId: body.partId,
    questiontypeId: body.questiontypeId,
    question: body.question,
    answers: body.answers,
    course: course._id,
    part: part._id
  })

  const savedCard = await card.save()

  course.cards = course.cards.concat(savedCard._id)
  await course.save()

  part.cards = course.parts.concat(savedCard._id)
  await part.save()

  response.json(savedCard.toJSON())

})

cardsRouter.delete('/:id', async (request, response) => {
  await Card.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = cardsRouter