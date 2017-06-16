const async = require('async')
const SensorTag = require('sensortag')
const _ = require('underscore')
const Medition = require('./schemas').model('Medition')

const TICK_TIME = 60000

const disableNotNeeded = (sensorTag, cb) => {
  async.series([
    function (callback) {
      console.log('disableBarometricPressure')
      sensorTag.disableBarometricPressure(callback)
    },
    function (callback) {
      console.log('disableGyroscope')
      sensorTag.disableGyroscope(callback)
    },
    function (callback) {
      console.log('disableAccelerometer')
      sensorTag.disableAccelerometer(callback)
    },
    function (callback) {
      console.log('disableMagnetometer')
      sensorTag.disableMagnetometer(callback)
    }
  ], cb)
}

const enableNeeded = (sensorTag, cb) => {
  async.series([
    function (callback) {
      console.log('enableBarometricPressure')
      sensorTag.enableBarometricPressure(callback)
    },
    function (callback) {
      console.log('enableHumidity')
      sensorTag.enableHumidity(callback)
    },
    function (callback) {
      console.log('enableIrTemperature')
      sensorTag.enableIrTemperature(callback)
    }
  ], cb)
}

const readThings = (sensorTag, cb) => {
  let latest

  const prepareNextExecution = (cb) => {
    const now = Date.now()
    if (!latest) {
      latest = Date.now()
      setImmediate(cb)
    } else if (now - latest > TICK_TIME) {
      latest = now
      setImmediate(cb)
    } else {
      console.log('next_tick_ms=' + (latest + TICK_TIME - now))
      const ms = latest + TICK_TIME - now
      setTimeout(() => {
        latest = Date.now()
        setImmediate(cb)
      }, ms)
    }
  }

  async.forever(next => {
    async.series({
      prepareNextExecution,
      ir: function (callback) {
        sensorTag.readIrTemperature((error, objectTemperature, ambientTemperature) => {
          setImmediate(callback, error, {objectTemperature, ambientTemperature})
        })
      },
      noop1: function (callback) {
        setTimeout(callback, 100)
      },
      hum: function (callback) {
        sensorTag.readHumidity((error, temperature, humidity) => {
          setImmediate(callback, error, {temperature, humidity})
        })
      },
      noop2: function (callback) {
        setTimeout(callback, 100)
      },
      bar: function (callback) {
        sensorTag.readBarometricPressure((error, pressure) => {
          setImmediate(callback, error, {pressure})
        })
      }
    }, (__, results) => {
      insertIntoMongo(_.pick(results, 'ir', 'hum', 'bar'))
      next()
    })
  })
}

SensorTag.discover((sensorTag) => {
  console.log('discovered: ' + sensorTag)

  sensorTag.on('disconnect', () => {
    console.log('disconnected!')
    process.exit(0)
  })

  async.series([
    cb => { sensorTag.connectAndSetUp(cb) },
    async.apply(disableNotNeeded, sensorTag),
    cb => { setTimeout(cb, 1000) },
    async.apply(enableNeeded, sensorTag),
    cb => { setTimeout(cb, 1000) },
    async.apply(readThings, sensorTag)
  ], (err) => {
    console.error(err)
  })
})

const insertIntoMongo = function insertIntoMongo (data) {
  const obj = {
    objTemp: data.ir.objectTemperature,
    ambTemp: data.ir.ambientTemperature,
    temp: data.hum.temperature,
    hum: data.hum.humidity,
    press: data.bar.pressure
  }
  const med = new Medition(obj)
  med.save((err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('inserted')
    }
  })
}
