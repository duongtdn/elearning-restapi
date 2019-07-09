"use strict"

const jwt = require('jsonwebtoken')

const authen = require('../lib/authen')

function validateParams() {
  return function(req, res, next) {
    if (req.body.id && req.body.progress) {
      next()
      return
    }
    res.status(400).json({ explaination: 'invalid parameter'})
  }
}

function updateProgress(helpers) {
  return function(req, res) {
    const uid = req.uid
    const id = req.body.id
    const progress = req.body.progress
    helpers.Collections.Progress.update({ uid, id, progress }, (err) => {
      if (err) {
        res.status(500).json({ explaination: 'database access error'})
      } else {
        res.status(200).json({ progress })
      }
    })
  }
}

module.exports = [validateParams, authen, updateProgress]
