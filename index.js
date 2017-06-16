const express = require('express')
const helpers = require('./helpers')
const moment = require('moment')
moment.locale('es')

const app = express()
app.set('view engine', 'pug')
app.use(helpers.addLibraries)

const Medition = require('./schemas').model('Medition')
app.get('/', (req, res) => {
  let query = {}
  query = {
    c_at: {
      $gt: moment().add(-12, 'h')
    }
  }

  Medition.find(query).sort({ c_at: 1 }).exec((err, all) => {
    if (err) {
      res.status(500)
      res.send(err)
      return
    }
    // const objTemp = []
    // const ambTemp = []
    const tempArr = []
    const humArr = []
    const pressArr = []
    const tempMeanArr = []
    let minTemp = 100
    let maxTemp = -100
    let minTempWhen, maxTempWhen
    all.forEach(m => {
      const temp = m.temp.toFixed(2)
      const hum = m.hum.toFixed(2)
      const press = m.press.toFixed(1)
      const rounded = moment(m.c_at).startOf('minute')
      // objTemp.push({ x: rounded, y: m.objTemp })
      // ambTemp.push({ x: rounded, y: m.ambTemp })
      tempMeanArr.push(m.temp)
      tempArr.push({ x: rounded, y: temp })
      if (m.temp < minTemp) {
        minTemp = temp
        minTempWhen = rounded
      }
      if (m.temp > maxTemp) {
        maxTemp = temp
        maxTempWhen = rounded
      }
      humArr.push({ x: rounded, y: hum })
      pressArr.push({ x: rounded, y: press })
    })
    const datasets = [
      {
        label: 'Humedad',
        data: humArr,
        yAxisID: 'humidity'
      },
      // {
      //   label: 'Temperatura ambiental',
      //   data: ambTemp
      // },
      // {
      //   label: 'Temperatura objeto',
      //   data: objTemp
      // },
      // {
      //   label: 'Presión',
      //   data: pressArr,
      //   yAxisID: 'pressure'
      // },
      {
        label: 'Temperatura',
        data: tempArr,
        yAxisID: 'temperature'
      }
    ]
    const meanTemp = (tempMeanArr.reduce((a, b) => a + b, 0) / tempMeanArr.length).toFixed(2)
    res.render('index', { title: 'Evolución', datasets, minTemp, maxTemp, minTempWhen, maxTempWhen, meanTemp })
  })
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Hello, rubicon http://localhost:${PORT}`)
})
