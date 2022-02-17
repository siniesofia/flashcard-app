const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const cardsRouter = require('./controllers/cards')
const usersRouter = require('./controllers/users')
const coursesRouter = require('./controllers/courses')
const partsRouter = require('./controllers/parts')
const loginRouter = require('./controllers/login')
const questiontypesRouter = require('./controllers/questiontypes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/cards', cardsRouter)
app.use('/api/users', usersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/parts', partsRouter)
app.use('/api/login', loginRouter)
app.use('/api/questiontypes', questiontypesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app