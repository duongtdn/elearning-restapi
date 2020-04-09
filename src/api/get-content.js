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

function checkEnrollStatus(helpers) {
  return function(req, res, next) {
    helpers.Database.ENROLL.find({ courseId: `= ${req.query.c}`, enrollTo: `= ${req.uid}`}, ['status', 'tests'])
    .then(data => {
      if (data.length > 0 && data[0].status === 'studying') {
        next()
      } else {
        res.status(403).json({ error: 'Forbidden' })
      }
    })
    .catch(err => {
      helpers.alert && helpers.alert({
        action: 'Get Item from ENROLL table',
        message: 'Could not read ENROLL. Database operation failed',
        error: err
      })
      res.status(500).json({ error: 'Failed to Access Database' })
    })
  }
}

function getContent(helpers) {
  return function(req, res) {
    helpers.Database.CONTENT.find({ id: `= ${req.query.c}`})
    .then(data => {
      if (data.length > 0) {
        res.status(200).json(data[0])
      } else {
        res.status(404).json({ error: 'Reousce not found'})
      }
    })
    .catch(err => {
      helpers.alert && helpers.alert({
        action: 'Get Item from CONTENT table',
        message: 'Could not read CONTENT. Database operation failed',
        error: err
      })
      res.status(500).json({ error: 'Failed to Access Database' })
    })
  }
}

module.exports = [validateParams, authen, checkEnrollStatus, getContent]
