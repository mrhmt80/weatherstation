const util = require('util')

const async = require('async')

const SensorTag = require('sensortag')

const USE_READ = true

SensorTag.discover((sensorTag) => {
  console.log('discovered: ' + sensorTag)

  sensorTag.on('disconnect', () => {
    console.log('disconnected!')
    process.exit(0)
  })

  async.series([
    function (callback) {
      console.log('connectAndSetUp')
      sensorTag.connectAndSetUp(callback)
    },
    function (callback) {
      console.log('readDeviceName')
      sensorTag.readDeviceName((error, deviceName) => {
        console.log('\tdevice name = ' + deviceName)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('readSystemId')
      sensorTag.readSystemId((error, systemId) => {
        console.log('\tsystem id = ' + systemId)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('readSerialNumber')
      sensorTag.readSerialNumber((error, serialNumber) => {
        console.log('\tserial number = ' + serialNumber)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('readFirmwareRevision')
      sensorTag.readFirmwareRevision((error, firmwareRevision) => {
        console.log('\tfirmware revision = ' + firmwareRevision)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('readHardwareRevision')
      sensorTag.readHardwareRevision((error, hardwareRevision) => {
        console.log('\thardware revision = ' + hardwareRevision)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('readSoftwareRevision')
      sensorTag.readHardwareRevision((error, softwareRevision) => {
        console.log('\tsoftware revision = ' + softwareRevision)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('readManufacturerName')
      sensorTag.readManufacturerName((error, manufacturerName) => {
        console.log('\tmanufacturer name = ' + manufacturerName)
        setImmediate(callback)
      })
    },
    function (callback) {
      console.log('enableIrTemperature')
      sensorTag.enableIrTemperature(callback)
    },
    function (callback) {
      setTimeout(callback, 2000)
    },
    function (callback) {
      if (USE_READ) {
        console.log('readIrTemperature')
        sensorTag.readIrTemperature((error, objectTemperature, ambientTemperature) => {
          console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1))
          console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1))

          setImmediate(callback)
        })
      } else {
        sensorTag.on('irTemperatureChange', (objectTemperature, ambientTemperature) => {
          console.log('\tobject temperature = %d °C', objectTemperature.toFixed(1))
          console.log('\tambient temperature = %d °C', ambientTemperature.toFixed(1))
        })

        console.log('setIrTemperaturePeriod')
        sensorTag.setIrTemperaturePeriod(500, (error) => {
          console.log('notifyIrTemperature')
          sensorTag.notifyIrTemperature((error) => {
            setTimeout(() => {
              console.log('unnotifyIrTemperature')
              sensorTag.unnotifyIrTemperature(callback)
            }, 5000)
          })
        })
      }
    },
    function (callback) {
      console.log('disableIrTemperature')
      sensorTag.disableIrTemperature(callback)
    },
    function (callback) {
      console.log('enableAccelerometer')
      sensorTag.enableAccelerometer(callback)
    },
    function (callback) {
      setTimeout(callback, 2000)
    },
    function (callback) {
      if (USE_READ) {
        console.log('readAccelerometer')
        sensorTag.readAccelerometer((error, x, y, z) => {
          console.log('\tx = %d G', x.toFixed(1))
          console.log('\ty = %d G', y.toFixed(1))
          console.log('\tz = %d G', z.toFixed(1))

          setImmediate(callback)
        })
      } else {
        sensorTag.on('accelerometerChange', (x, y, z) => {
          console.log('\tx = %d G', x.toFixed(1))
          console.log('\ty = %d G', y.toFixed(1))
          console.log('\tz = %d G', z.toFixed(1))
        })

        console.log('setAccelerometerPeriod')
        sensorTag.setAccelerometerPeriod(500, (error) => {
          console.log('notifyAccelerometer')
          sensorTag.notifyAccelerometer((error) => {
            setTimeout(() => {
              console.log('unnotifyAccelerometer')
              sensorTag.unnotifyAccelerometer(callback)
            }, 5000)
          })
        })
      }
    },
    function (callback) {
      console.log('disableAccelerometer')
      sensorTag.disableAccelerometer(callback)
    },
    function (callback) {
      console.log('enableHumidity')
      sensorTag.enableHumidity(callback)
    },
    function (callback) {
      setTimeout(callback, 2000)
    },
    function (callback) {
      if (USE_READ) {
        console.log('readHumidity')
        sensorTag.readHumidity((error, temperature, humidity) => {
          console.log('\ttemperature = %d °C', temperature.toFixed(1))
          console.log('\thumidity = %d %', humidity.toFixed(1))

          setImmediate(callback)
        })
      } else {
        sensorTag.on('humidityChange', (temperature, humidity) => {
          console.log('\ttemperature = %d °C', temperature.toFixed(1))
          console.log('\thumidity = %d %', humidity.toFixed(1))
        })

        console.log('setHumidityPeriod')
        sensorTag.setHumidityPeriod(500, (error) => {
          console.log('notifyHumidity')
          sensorTag.notifyHumidity((error) => {
            setTimeout(() => {
              console.log('unnotifyHumidity')
              sensorTag.unnotifyHumidity(callback)
            }, 5000)
          })
        })
      }
    },
    function (callback) {
      console.log('disableHumidity')
      sensorTag.disableHumidity(callback)
    },
    function (callback) {
      console.log('enableMagnetometer')
      sensorTag.enableMagnetometer(callback)
    },
    function (callback) {
      setTimeout(callback, 2000)
    },
    function (callback) {
      if (USE_READ) {
        console.log('readMagnetometer')
        sensorTag.readMagnetometer((error, x, y, z) => {
          console.log('\tx = %d μT', x.toFixed(1))
          console.log('\ty = %d μT', y.toFixed(1))
          console.log('\tz = %d μT', z.toFixed(1))

          setImmediate(callback)
        })
      } else {
        sensorTag.on('magnetometerChange', (x, y, z) => {
          console.log('\tx = %d μT', x.toFixed(1))
          console.log('\ty = %d μT', y.toFixed(1))
          console.log('\tz = %d μT', z.toFixed(1))
        })

        console.log('setMagnetometerPeriod')
        sensorTag.setMagnetometerPeriod(500, (error) => {
          console.log('notifyMagnetometer')
          sensorTag.notifyMagnetometer((error) => {
            setTimeout(() => {
              console.log('unnotifyMagnetometer')
              sensorTag.unnotifyMagnetometer(callback)
            }, 5000)
          })
        })
      }
    },
    function (callback) {
      console.log('disableMagnetometer')
      sensorTag.disableMagnetometer(callback)
    },
    function (callback) {
      console.log('enableBarometricPressure')
      sensorTag.enableBarometricPressure(callback)
    },
    function (callback) {
      setTimeout(callback, 2000)
    },
    function (callback) {
      if (USE_READ) {
        console.log('readBarometricPressure')
        sensorTag.readBarometricPressure((error, pressure) => {
          console.log('\tpressure = %d mBar', pressure.toFixed(1))

          setImmediate(callback)
        })
      } else {
        sensorTag.on('barometricPressureChange', (pressure) => {
          console.log('\tpressure = %d mBar', pressure.toFixed(1))
        })

        console.log('setBarometricPressurePeriod')
        sensorTag.setBarometricPressurePeriod(500, (error) => {
          console.log('notifyBarometricPressure')
          sensorTag.notifyBarometricPressure((error) => {
            setTimeout(() => {
              console.log('unnotifyBarometricPressure')
              sensorTag.unnotifyBarometricPressure(callback)
            }, 5000)
          })
        })
      }
    },
    function (callback) {
      console.log('disableBarometricPressure')
      sensorTag.disableBarometricPressure(callback)
    },
    function (callback) {
      console.log('enableGyroscope')
      sensorTag.enableGyroscope(callback)
    },
    function (callback) {
      setTimeout(callback, 2000)
    },
    function (callback) {
      if (USE_READ) {
        console.log('readGyroscope')
        sensorTag.readGyroscope((error, x, y, z) => {
          console.log('\tx = %d °/s', x.toFixed(1))
          console.log('\ty = %d °/s', y.toFixed(1))
          console.log('\tz = %d °/s', z.toFixed(1))

          setImmediate(callback)
        })
      } else {
        sensorTag.on('gyroscopeChange', (x, y, z) => {
          console.log('\tx = %d °/s', x.toFixed(1))
          console.log('\ty = %d °/s', y.toFixed(1))
          console.log('\tz = %d °/s', z.toFixed(1))
        })

        console.log('setGyroscopePeriod')
        sensorTag.setGyroscopePeriod(500, (error) => {
          console.log('notifyGyroscope')
          sensorTag.notifyGyroscope((error) => {
            setTimeout(() => {
              console.log('unnotifyGyroscope')
              sensorTag.unnotifyGyroscope(callback)
            }, 5000)
          })
        })
      }
    },
    function (callback) {
      console.log('disableGyroscope')
      sensorTag.disableGyroscope(callback)
    },
    function (callback) {
      if (sensorTag.type === 'cc2540') {
        async.series([
          function (callback) {
            console.log('readTestData')
            sensorTag.readTestData((error, data) => {
              console.log('\tdata = ' + data)

              setImmediate(callback)
            })
          },
          function (callback) {
            console.log('readTestConfiguration')
            sensorTag.readTestConfiguration((error, configuration) => {
              console.log('\tconfiguration = ' + configuration)

              setImmediate(callback)
            })
          },
          function () {
            setImmediate(callback)
          }
        ])
      } else if (sensorTag.type === 'cc2650') {
        async.series([
          function (callback) {
            console.log('readIoData')
            sensorTag.readIoData((error, value) => {
              console.log('\tdata = ' + value)

              console.log('writeIoData')
              sensorTag.writeIoData(value, callback)
            })
          },
          function (callback) {
            console.log('readIoConfig')
            sensorTag.readIoConfig((error, value) => {
              console.log('\tconfig = ' + value)

              console.log('writeIoConfig')
              sensorTag.writeIoConfig(value, callback)
            })
          },
          function (callback) {
            console.log('enableLuxometer')
            sensorTag.enableLuxometer(callback)
          },
          function (callback) {
            setTimeout(callback, 2000)
          },
          function (callback) {
            if (USE_READ) {
              console.log('readLuxometer')
              sensorTag.readLuxometer((error, lux) => {
                console.log('\tlux = %d', lux.toFixed(1))

                setImmediate(callback)
              })
            } else {
              sensorTag.on('luxometerChange', (lux) => {
                console.log('\tlux = %d', lux.toFixed(1))
              })

              console.log('setLuxometer')
              sensorTag.setLuxometerPeriod(500, (error) => {
                console.log('notifyLuxometer')
                sensorTag.notifyLuxometer((error) => {
                  setTimeout(() => {
                    console.log('unnotifyLuxometer')
                    sensorTag.unnotifyLuxometer(callback)
                  }, 5000)
                })
              })
            }
          },
          function (callback) {
            console.log('disableLuxometer')
            sensorTag.disableLuxometer(callback)
          },
          function () {
            setImmediate(callback)
          }
        ])
      } else {
        setImmediate(callback)
      }
    },
    function (callback) {
      console.log('readSimpleRead - waiting for button press ...')
      sensorTag.on('simpleKeyChange', (left, right, reedRelay) => {
        console.log('left: ' + left)
        console.log('right: ' + right)
        if (sensorTag.type === 'cc2650') {
          console.log('reed relay: ' + reedRelay)
        }

        if (left || right) {
          sensorTag.notifySimpleKey(callback)
        }
      })

      sensorTag.notifySimpleKey()
    },
    function (callback) {
      console.log('disconnect')
      sensorTag.disconnect(callback)
    }
  ]
  )
})
