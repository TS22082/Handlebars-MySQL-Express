const express = require('express')
const router = express.Router()
const connection = require('../config/connection')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM todos', (err, data) => {
    if (err) throw err
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
    res.render('home', {
      todos: data
    })
  })
})

router.patch('/', (req, res) => {
  console.log(req.body.data)
  connection.query(
    'UPDATE todos SET ? WHERE ?',
    [req.body.data[0], req.body.data[1]],
    (err, data) => {
      if (err) throw err
      console.log(`${data.affectedRows} todo updated`)
    }
  )
})

let todoToUpdate

router.get('/edit', (req, res) => {
  // console.log(todoToUpdate)
  res.render('index', todoToUpdate)
})

router.post('/edit', (req, res) => {
  connection.query('SELECT * FROM todos where (?)', [req.body], (err, data) => {
    if (err) throw err
    todoToUpdate = data[0]
    console.log(todoToUpdate)
  })
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
