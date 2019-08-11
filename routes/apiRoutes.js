const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const connection = require('../config/connection')

var lunches = [{ lunch: 'Sandwich' }, { lunch: 'Salad' }]

router.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (err, data) => {
    if (err) throw err
    console.log(data)
    res.render('home', {
      todos: data,
      message: 'World'
    })
  })
})

router.post('/', (req, res) => {
  connection.query(
    'INSERT INTO todos (text) VALUES (?)',
    [req.body.todo],
    err => {
      if (err) throw err
      console.log('Successfully added')
    }
  )
})

router.delete('/', (req, res) => {
  connection.query('DELETE FROM todos where (?)', [req.body], err => {
    if (err) throw err
    console.log('Successfully deleted')
  })

  connection.query('SELECT * FROM todos', (err, data) => {
    if (err) throw err
    console.log(data)
    res.render('home', {
      todos: data,
      message: 'World'
    })
  })
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
