const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Card = require('../models/card')

const initialCards = [
  {
    courseId: 1,
    partId: 2,
    question: 'Mikä seuraavista on totta?',
    answers: [
      {
        id: 1,
        answer: 'Eka vastaus'
      },
      {
        id: 2,
        answer: 'Toka vastau'
      },
      {
        id: 3,
        answer: 'Kolmas vastaus'
      },
      {
        id: 4,
        answer: 'Neljäs vastaus'
      }
    ],
    correctAnswerId: 4
  },
  {
    courseId: 2,
    partId: 1,
    question: 'Aivokuori vastaa...',
    answers: [
      {
        id: 1,
        answer: 'autonomisen hermoston säätelystä'
      },
      {
        id: 2,
        answer: 'tunteiden hallinnasta'
      },
      {
        id: 3,
        answer: 'taistele tai pakene -reaktion synnyttämisestä'
      },
      {
        id: 4,
        answer: 'tunnekokemusten heräämisestä'
      }
    ],
    correctAnswerId: 2
  },
]

beforeEach(async () => {
  await Card.deleteMany({})
  let cardObject = new Card(initialCards[0])
  await cardObject.save()
  cardObject = new Card(initialCards[1])
  await cardObject.save()
})

test('cards are returned as json', async () => {
  await api
    .get('/api/cards')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are seven cards', async () => {
  const response = await api.get('/api/cards')

  expect(response.body).toHaveLength(initialCards.length)
})

test('the first card is about HTTP methods', async () => {
  const response = await api.get('/api/cards')

  const questions = response.body.map(r => r.question)

  expect(questions).toContain(
    'Mikä seuraavista on totta?'
  )
})

afterAll(() => {
  mongoose.connection.close()
})