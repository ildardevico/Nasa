import config from '../config'
import rp from 'request-promise'
import moment from 'moment'
import { Satellite } from '../models'

const { weather: { apiKey, endpoint } } = config

const getWeatherData = async () => {
  let satellite
  while(satellite = await Satellite.findOne({ weather: { $exists: false }})) { // eslint-disable-line
    const { latitude, longitude, acq_date } = satellite
    const start = moment(acq_date).utc()
    const { list: [ first ] } = await rp(
      `${endpoint}history/city?lat=${latitude}&lon=${longitude}&start=${start}&appid=${apiKey}`
    )
    satellite.weather = first
    await satellite.save()
  }
}


getWeatherData()
