'use strict'
const moment = require('moment')

exports.addLibraries = (req, res, next) => {
  res.locals.moment = moment
  next()
}
