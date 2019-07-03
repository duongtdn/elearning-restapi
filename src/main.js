"use strict"

const Builder = require('express-api-builder')

const api = Builder()

api.add('/content', {
  get: require('./api/get-content')
})

module.exports = api
