const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.qjipx.mongodb.net/flashcard-app?retryWrites=true&w=majority`

mongoose.connect(url)

const cardSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  partId: Number,
  question: String,
  answers: Object,
  correctAnswerId: Number
})

const Card = mongoose.model('Card', cardSchema)

const card = new Card({
  id: 10,
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
      answer: 'Toka vastaus'
    },
    {
      id: 3,
      answer: 'Kolmas vastaus'
    },
    {
      id: 4,
      answer: 'Neljäs vastaus'
    },
  ],
  correctAnswerId: 4
})

card.save().then(() => {
  console.log('card saved!')
  mongoose.connection.close()
})


// Card.find({}).then(result => {
//   result.forEach(card => {
//     console.log(card)
//   })
//   mongoose.connection.close()
// })
