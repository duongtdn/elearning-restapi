" use strict"

require('dotenv').config()

const api = require('../src/main')

// helpers database driver
const DatabaseHelper = require('@realmjs/dynamodb-helper')
const dbh = new DatabaseHelper({
  aws: { region: process.env.REGION, endpoint: process.env.ENDPOINT },
  measureExecutionTime: true
})
dbh.addTable(['CONTENT', 'PROGRESS', 'ENROLL'])
api.helpers({ Database: dbh.drivers})

// assign alert function to helpers
api.helpers({
  alert({message, action, error}) {
    console.log(`\nALERT: -----------------------------------------------------------`)
    console.log(`--> by action: ${action}`)
    console.log(`--> ${message}`)
    console.log(error)
    console.log(`------------------------------------------------------------------`)
  }
 })

const express = require('express')
const app = express()

app.use('/', (req,res,next) => { console.log(`${req.method.toUpperCase()} request to: ${req.path}`); next() }, api.generate())

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.use('/quizzes', (req, res, next) => setTimeout(next, 200), express.static(path.join(__dirname, 'quizzes')))

const PORT = 3310
app.listen(PORT, (err) => {
  if (err) {
    console.log('Failed to start API Server')
  } else {
    console.log(`EXAM: API Server is running at port ${PORT}`)
  }
})
