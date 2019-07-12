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

function checkEnrollStatus(helpers) {
  return function(req, res, next) {
   helpers.Collections.Enroll.find({courseId: req.query.c, enrolledTo: req.uid}, ['status', 'tests'], (data) => {
     if (data.length > 0 && data[0].status === 'activated') {
       req.tests = data[0].tests
       next()
     } else {
       res.status(403).json({ explaination: 'forbidden' })
     }
   })
  }
}

function getContent(helpers) {
  return function(req, res) {
    helpers.Collections.Content.find({id: req.query.c}, (data) => {
      if (data.length > 0) {
        res.status(200).json({ content: data[0], tests: req.tests })
      } else {
        res.status(404).json({ explaination: 'not found'})
      }
    })
  }
}

module.exports = [validateParams, authen, checkEnrollStatus, getContent]
