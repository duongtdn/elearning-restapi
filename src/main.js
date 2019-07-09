"use strict"

const Builder = require('express-api-builder')

const api = Builder()

api.add('/content', {
  get: require('./api/get-content')
})

api.add('/progress', {
  get: require('./api/get-progress'),
  put: require('./api/update-progress')
})

module.exports = api
