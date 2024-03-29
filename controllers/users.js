const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

// usersRouter.get('/userid', async (request, response) => {
//   const users = await User.find({})
//   response.json(users.map(u => u.id))
// })

// usersRouter.get('/correctAnswers', async (request, response) => {
//   const users = await User.find({})
//   response.json(users.map(u => u.correctAnswers))
// })

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
