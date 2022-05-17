const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('parts are returned as json', async () => {
  await api
    .get('/api/parts')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



afterAll(() => {
  mongoose.connection.close()
})