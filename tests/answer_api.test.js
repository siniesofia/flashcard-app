const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('answers are returned as json', async () => {
  await api
    .get('/api/answers')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



afterAll(() => {
  mongoose.connection.close()
})