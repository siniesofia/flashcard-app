const cardsRouter = require('express').Router()
const Card = require('../models/card')

cardsRouter.get('/', async (request, response) => {
  const cards = await Card.find({})
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

  const card = new Card({
    id: 1,
    courseId: body.courseId || null,
    partId: body.partId || null,
    question: body.question,
    answers: body.answers,
    correctAnswerId: body.correctAnswerId
  })

  const savedCard = await card.save()
  response.json(savedCard.toJSON())

})

cardsRouter.delete('/:id', async (request, response) => {
  await Card.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = cardsRouter