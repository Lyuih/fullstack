const express = require('express')
const cors = require('cors')
const app = express()
const Person = require('./mongo.js')
app.use(cors())
app.use(express.json())
let persons = []

const generateId = () => {
  if (persons.length === 0) {
    return 1
  }
  return Math.max(...persons.map((p) => Number(p.id))) + 1
}

const errorHandle = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.get('/', (request, response) => {
  response.send('<h1> hello world</h1>')
})

app.get('/api/persons', (request, response,next) => {
  //   response.json(persons);
  Person.find({})
    .then((result) => {
      console.log(result)
      response.json(result)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then((result) => {
    response.status(204).end()
  })
})

app.post('/api/persons', (request, response,next) => {
  const data = request.body
  const { name, phone } = data
  const newPerson = new Person({
    name,
    phone,
    id: generateId(),
  })
  newPerson
    .save()
    .then((result) => {
      response.json(result).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response) => {
  const { name, phone } = request.body
  Person.findById(request.params.id).then((person) => {
    if (!person) {
      return response.status(404).end()
    }
    person.name = name
    person.phone = phone
    return person.save().then((result) => {
      response.json(result)
    })
  })
})
const PORT = 3001
app.use(errorHandle)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
