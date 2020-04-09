"use strict"

const authen = require('../lib/authen')

function validateParams() {
  return function(req, res, next) {
    if (req.body.id && req.body.progress) {
      next()
    } else {
      res.status(400).json({ error: 'Bad Parameters'})
    }
  }
}

function updateProgress(helpers) {
  return function(req, res) {
    const uid = req.uid
    const id = req.body.id
    const progress = req.body.progress
    const updateFn = req.body.setFlag?
      helpers.Database.PROGRESS.set.bind(helpers.Database.PROGRESS)
      :
      helpers.Database.PROGRESS.update.bind(helpers.Database.PROGRESS)

    updateFn({ uid, id }, { ...progress })
    .then(data => {
      res.status(200).json({ ...progress })
    })
    .catch(err => {
      helpers.alert && helpers.alert({
        action: 'Update Item from PROGRESS table',
        message: 'Could not write to PROGRESS. Database operation failed',
        error: err
      })
      res.status(500).json({ error: 'Failed to Access Database' })
    })
  }
}

module.exports = [validateParams, authen, updateProgress]
