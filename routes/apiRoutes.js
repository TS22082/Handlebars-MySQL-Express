const express = require('express')
const router = express.Router()

var lunches = [{ lunch: 'Sandwich' }, { lunch: 'Salad' }]
var todos = [{ todo: 'wash clothes' }, { todo: 'get haircut' }]

router.get('/', (req, res) => {
  res.render('home', {
    todos: todos,
    message: 'World'
  })
})

router.post('/', (req, res) => {
  todos.push(req.body)
  console.log(todos)
})

router.get('/weekday', (req, res) => {
  res.render('index', lunches[0])
})

router.get('/weekend', (req, res) => {
  res.render('index', lunches[1])
})

router.get('/', (req, res) => {
  res.render('index', lunches[1])
})

router.get('/lunches', (req, res) => {
  res.render('all-lunches', {
    foods: lunches,
    name: 'Thomas'
  })
})

module.exports = router
