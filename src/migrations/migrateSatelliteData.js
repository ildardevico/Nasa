import csv from 'fast-csv'
import fs from 'fs'
import { Satellite } from '../models'


const stream = fs.createReadStream(__dirname + '/data.csv')

csv.fromStream(stream, {
  skip_lines_with_empty_values: true,
  headers: false,
})
.on('data', async data => {
  const [
    latitude,
    longitude,
    brightness,
    scan,
    track,
    acq_date,
    acq_time,
    satellite,
    confidence,
    version,
    bright_t31,
    frp,
    daynight
  ] = data
  if(!isNaN(+latitude)) {
    try {
      await new Satellite({
        latitude: +latitude,
        longitude: +longitude,
        brightness: + brightness,
        acq_date,
        acq_time: +acq_time,
        scan: +scan,
        track: +track,
        satellite,
        confidence: +confidence,
        version,
        bright_t31: +bright_t31,
        frp: +frp,
        daynight,
      }).save()
    } catch(err) {
      console.error(err)
    }
  }
})
.on('end', async () => {
  console.log('done')
})
