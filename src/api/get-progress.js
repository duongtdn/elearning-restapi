"use strict"

const authen = require('../lib/authen')

function validateParams() {
  return function(req, res, next) {
    if (req.query.c) {
      next()
      return
    }
    res.status(400).json({ explaination: 'invalid query'})
  }
}

function getProgress(helpers) {
  return function(req, res) {
    helpers.Collections.Progress.find({id: req.query.c, uid: req.uid}, (data) => {
      if (data.length > 0) {
        res.status(200).json({ ...data[0] })
      } else {
        res.status(404).json({ explaination: 'not found'})
      }
    })
  }
}

module.exports = [validateParams, authen, getProgress]
