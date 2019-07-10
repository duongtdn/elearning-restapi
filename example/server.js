" use strict"

require('dotenv').config()

const api = require('../src/main')

api.helpers({ Collections: require('./database') })

const express = require('express')
const app = express()

app.use('/', api.generate())

const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

const PORT = 3400
app.listen(PORT, (err) => {
  if (err) {
    console.log('Failed to start API Server')
  } else {
    console.log(`EXAM: API Server is running at port ${PORT}`)
  }
})
