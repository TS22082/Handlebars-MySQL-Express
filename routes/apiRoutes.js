const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const connection = require('../config/connection')

var lunches = [{ lunch: 'Sandwich' }, { lunch: 'Salad' }]
var todos = [{ todo: 'wash clothes' }, { todo: 'get haircut' }]
var myData = []

router.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (err, res) => {
    if (err) throw err
    myData = res
    console.log(myData)
  })
  res.render('home', {
    todos: myData,
    message: 'World'
  })
})

router.post('/', (req, res) => {
  todos.push(req.body)
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
