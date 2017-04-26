import mongoose, { Schema } from 'mongoose';

const sateliteSchama = new Schema({
  latitude:  Number,
  longitude: Number,
  brighness: Number,
  acq_date: Date,
  acq_time: Number,
  scan: Number,
  track: Number,
  satellite: String,
  confidence: Number,
  version: String,
  bright_t31: Number,
  frp: Number,
  daynight: String,
});

export default mongoose.model('Satelite', sateliteSchama);