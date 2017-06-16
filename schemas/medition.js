'use strict'

const Medition = {
  c_at: {
    type: Date,
    default: Date.now
  },
  objTemp: Number,
  ambTemp: Number,
  temp: Number,
  hum: Number,
  press: Number
}

module.exports = (mongoose) => mongoose.model('Medition', Medition)
