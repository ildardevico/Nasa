import mongoose, { Schema } from 'mongoose'

const satelliteSchama = new Schema({
  latitude:  Number,
  longitude: Number,
  brightness: Number,
  acq_date: String,
  acq_time: Number,
  scan: Number,
  track: Number,
  satellite: String,
  confidence: Number,
  version: String,
  bright_t31: Number,
  frp: Number,
  daynight: String,
  weather: Schema.Types.Mixed
})

export default mongoose.model('Satellite', satelliteSchama)
