"use strict"

const authen = require('../lib/authen')

function validateParams() {
  return function(req, res, next) {
    if (req.query.c) {
      next()
    } else {
      res.status(400).json({ error: 'Bad parameters'})
    }
  }
}

function getProgress(helpers) {
  return function(req, res) {
    helpers.Database.PROGRESS.find({ id: `= ${req.query.c}`, uid: `= ${req.uid}`}, ['study', 'test'])
    .then(data => {
      if (data.length > 0) {
        res.status(200).json({ ...data[0] })
      } else {
        res.status(404).json({ error: 'Resource not found'})
      }
    })
    .catch(err => {
      helpers.alert && helpers.alert({
        action: 'Get Item from PROGRESS table',
        message: 'Could not read PROGRESS. Database operation failed',
        error: err
      })
      res.status(500).json({ error: 'Failed to Access Database' })
    })
  }
}

module.exports = [validateParams, authen, getProgress]
