const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Card = require('./models/card')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

let cards = [
  {
    id: 1,
    courseId: 1,
    partId: 1,
    question: 'Mikä seuraavista väittämistä pitää paikkansa?',
    answers: [
      {
        id: 1,
        answer: 'Korkeimman oikeuden ennakkopäätökset ovat sekä vertikaalisesti että horisontaalisesti oikeudellisesti sitovia.'
      },
      {
        id: 2,
        answer:'"Korkeimman oikeuden ennakkopäätökset ovat vertikaalisesti oikeudellisesti sitovia, mutta eivät ole horisontaalisesti oikeudellisesti sitovia'
      },
      {
        id: 3,
        answer: 'Korkeimman oikeuden ennakkopäätökset ovat horisontaalisesti oikeudellisesti sitovia, mutta eivät ole vertikaalisesti oikeudellisesti sitovia.'
      },
      {
        id: 4,
        answer: 'Korkeimman oikeuden ennakkopäätökset eivät ole vertikaalisesti tai horisontaalisesti oikeudellisesti sitovia.'
      }
    ],
    correctAnswerId: 4
  },
  {
    id: 2,
    courseId: 1,
    partId: 2,
    question: 'Huhtikuussa 2011 annettiin Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011, annettu 5 päivänä huhtikuuta 2011, työntekijöiden vapaasta liikkuvuudesta unionin alueella. Mikä seuraavista kyseistä EU-asetusta koskevista väittämistä ei pidä paikkaansa?',
    answers: [
      {
        id: 1,
        answer: 'Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella on lakiin rinnastettava vahvasti velvoittava oikeuslähde.'
      },
      {
        id: 2,
        answer: 'Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella velvoittaa saavutettavaan tulokseen nähden jokaista jäsenvaltiota,, jolle se on osoitettu, mutta jättää kansallisen viranomaisen valittavaksi muodot ja keinot.'
      },
      {
        id: 3,
        answer: 'Korkeimman oikTuomioistuimen on jätettävä soveltamatta kansallista säännöstä, joka on ristiriidassa Euroopan parlamentin ja neuvoston asetuksen (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella kanssa.euden ennakkopäätökset ovat horisontaalisesti oikeudellisesti sitovia, mutta eivät ole vertikaalisesti oikeudellisesti sitovia.'
      },
      {
        id: 4,
        answer: 'Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella on suoraan sovellettavaa EU-oikeutta, joten Suomen viranomaiset ja tuomioistuimet ovat velvollisia soveltamaan sitä sellaisenaan ilman, että kansallinen lainsäätäjä on sisällyttänyt sen osaksi kansallista lainsäädäntöä.'
      }
    ],
    correctAnswerId: 2
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/cards', (request, response) => {
  Card.find({}).then(cards => {
    response.json(cards)
  })
})

app.get('/api/cards/:id', (request, response, next) => {
  Card.findById(request.params.id).then(card => {
    if (card) {
      response.json(card)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.post('/api/cards', (request, response, next) => {
  const maxId = cards.length > 0
    ? Math.max(...cards.map(c => c.id))
    : 0

  const body = request.body

  const card = new Card({
    id: maxId + 1,
    courseId: body.courseId || null,
    partId: body.partId || null,
    question: body.question,
    answers: body.answers,
    correctAnswerId: body.correctAnswerId
  })

  console.log('body.question', body.question)

  card.save()
    .then(savedCard => {
      response.json(savedCard.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/cards/:id', (request, response, next) => {
  Card.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})