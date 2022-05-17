const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('questions are returned as json', async () => {
  await api
    .get('/api/questions')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



afterAll(() => {
  mongoose.connection.close()
})