'use strict'

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rubicon')
mongoose.set('debug', true)

require('./medition')(mongoose)

module.exports = mongoose
