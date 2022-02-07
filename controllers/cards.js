const cardsRouter = require('express').Router()
const Card = require('../models/card')

// let cards = [
//   {
//     id: 1,
//     courseId: 1,
//     partId: 1,
//     question: 'Mikä seuraavista väittämistä pitää paikkansa?',
//     answers: [
//       {
//         id: 1,
//         answer: 'Korkeimman oikeuden ennakkopäätökset ovat sekä vertikaalisesti että horisontaalisesti oikeudellisesti sitovia.'
//       },
//       {
//         id: 2,
//         answer:'"Korkeimman oikeuden ennakkopäätökset ovat vertikaalisesti oikeudellisesti sitovia, mutta eivät ole horisontaalisesti oikeudellisesti sitovia'
//       },
//       {
//         id: 3,
//         answer: 'Korkeimman oikeuden ennakkopäätökset ovat horisontaalisesti oikeudellisesti sitovia, mutta eivät ole vertikaalisesti oikeudellisesti sitovia.'
//       },
//       {
//         id: 4,
//         answer: 'Korkeimman oikeuden ennakkopäätökset eivät ole vertikaalisesti tai horisontaalisesti oikeudellisesti sitovia.'
//       }
//     ],
//     correctAnswerId: 4
//   }
// ]

cardsRouter.get('/', (request, response) => {
  Card.find({}).then(cards => {
    response.json(cards.map(card => card.toJSON()))
  })
})

cardsRouter.get('/', (request, response) => {
  Card.find({}).then(cards => {
    response.json(cards)
  })
})

cardsRouter.get('/:id', (request, response, next) => {
  Card.findById(request.params.id).then(card => {
    if (card) {
      response.json(card)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

cardsRouter.post('/', (request, response, next) => {
  // const maxId = cards.length > 0
  //   ? Math.max(...cards.map(c => c.id))
  //   : 0

  const body = request.body

  const card = new Card({
    id: 1,
    courseId: body.courseId || null,
    partId: body.partId || null,
    question: body.question,
    answers: body.answers,
    correctAnswerId: body.correctAnswerId
  })

  console.log('body.question', body.question)
  console.log('body.correctAnswerId', body.correctAnswerId)

  card.save()
    .then(savedCard => {
      response.json(savedCard.toJSON())
    })
    .catch(error => next(error))
})

cardsRouter.delete('/:id', (request, response, next) => {
  Card.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = cardsRouter