const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')

app.use(cors())

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  
  app.use(requestLogger)

let cards = [
    {
        id: 1,
        courseId: 1,
        partId: 1,
        question: "Mikä seuraavista väittämistä pitää paikkansa?",
        answers: [
            {
            id: 1,
            answer: "Korkeimman oikeuden ennakkopäätökset ovat sekä vertikaalisesti että horisontaalisesti oikeudellisesti sitovia."
            },
            {
            id: 2,
            answer: "Korkeimman oikeuden ennakkopäätökset ovat vertikaalisesti oikeudellisesti sitovia, mutta eivät ole horisontaalisesti oikeudellisesti sitovia"
            },
            {
            id: 3,
            answer: "Korkeimman oikeuden ennakkopäätökset ovat horisontaalisesti oikeudellisesti sitovia, mutta eivät ole vertikaalisesti oikeudellisesti sitovia."
            },
            {
            id: 4,
            answer: "Korkeimman oikeuden ennakkopäätökset eivät ole vertikaalisesti tai horisontaalisesti oikeudellisesti sitovia."
            }
        ],
        correctAnswerId: 4
    },
    {
        id: 2,
        courseId: 1,
        partId: 2,
        question: "Huhtikuussa 2011 annettiin Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011, annettu 5 päivänä huhtikuuta 2011, työntekijöiden vapaasta liikkuvuudesta unionin alueella. Mikä seuraavista kyseistä EU-asetusta koskevista väittämistä ei pidä paikkaansa?",
        answers: [
          {
            id: 1,
            answer: "Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella on lakiin rinnastettava vahvasti velvoittava oikeuslähde."
          },
          {
            id: 2,
            answer: "Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella velvoittaa saavutettavaan tulokseen nähden jokaista jäsenvaltiota,, jolle se on osoitettu, mutta jättää kansallisen viranomaisen valittavaksi muodot ja keinot."
          },
          {
            id: 3,
            answer: "Korkeimman oikTuomioistuimen on jätettävä soveltamatta kansallista säännöstä, joka on ristiriidassa Euroopan parlamentin ja neuvoston asetuksen (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella kanssa.euden ennakkopäätökset ovat horisontaalisesti oikeudellisesti sitovia, mutta eivät ole vertikaalisesti oikeudellisesti sitovia."
          },
          {
            id: 4,
            answer: "Euroopan parlamentin ja neuvoston asetus (EU) N:o 492/2011 työntekijöiden vapaasta liikkuvuudesta unionin alueella on suoraan sovellettavaa EU-oikeutta, joten Suomen viranomaiset ja tuomioistuimet ovat velvollisia soveltamaan sitä sellaisenaan ilman, että kansallinen lainsäätäjä on sisällyttänyt sen osaksi kansallista lainsäädäntöä."
          }
        ],
        correctAnswerId: 2
    }
  ]


  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/cards/:id', (request, response) => {
    const id = Number(request.params.id)
    const card = cards.find(card => card.id === id)
    if (card) {
        response.json(card)
      } else {
        response.status(404).end()
      }
  })
  
  app.get('/api/cards', (req, res) => {
    res.json(cards)
  })

  app.delete('/api/cards/:id', (request, response) => {
    const id = Number(request.params.id)
    cards = cards.filter(card => card.id !== id)
  
    response.status(204).end()
  })

//   app.post('/api/cards', (request, response) => {
//     const card = request.body
//     console.log(card)
//     response.json(card)
//   })

  app.post('/api/cards', (request, response) => {
    console.log('request.body', request.body);
    const maxId = cards.length > 0
      ? Math.max(...cards.map(c => c.id)) 
      : 0

    console.log('maxID', maxId)
  
    const card = request.body
    console.log('card', card)
    card.id = maxId + 1
  
    cards = cards.concat(card)
  
    response.json(card)
  })
  
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })