const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb+srv://paasykoetreenit:${password}@cluster0.ephkn.mongodb.net/flashcard-app?retryWrites=true&w=majority'
  // `mongodb+srv://fullstack:${password}@cluster0.qjipx.mongodb.net/flashcard-app?retryWrites=true&w=majority`
  // `mongodb+srv://fullstack:${password}@cluster0.qjipx.mongodb.net/flashcard-app?retryWrites=true&w=majority`





mongoose.connect(url)

const questionSchema = new mongoose.Schema({
  id: Number,
  courseId: Number,
  partId: Number,
  question: String,
  answers: Object,
  correctAnswerId: Number
})

const Question = mongoose.model('Question', questionSchema)

const question = new Question({
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

question.save().then(() => {
  console.log('question saved!')
  mongoose.connection.close()
})


// Card.find({}).then(result => {
//   result.forEach(card => {
//     console.log(card)
//   })
//   mongoose.connection.close()
// })
