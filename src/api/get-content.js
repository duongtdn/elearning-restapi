"use strict"

const jwt = require('jsonwebtoken')

function validateParams() {
  return function(req, res, next) {
    if (req.query.c) {
      next()
      return
    }
    res.status(400).json({ explaination: 'invalid query'})
  }
}

function authen() {
  return function(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader === 'undefined') {
      res.status(401).json({ explaination: 'Unauthorized' })
      return
    }

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;

    jwt.verify(token, process.env.PRIVATE_AUTH_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ explaination: 'Unauthorized' })
      } else {
        req.uid = decoded.uid
        next()
      }
    })
  }
}

function getContent(helpers) {
  return function(req, res) {
    helpers.Collections.Contents.find({id: req.query.c}, (data) => {
      if (data.length > 0) {
        res.status(200).json({ ...data[0] })
      } else {
        res.status(404).json({ explaination: 'not found'})
      }
    })
  }
}

module.exports = [validateParams, authen, getContent]
