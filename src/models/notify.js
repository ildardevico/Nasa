import mongoose, { Schema } from 'mongoose'

export const PENDING = 1
export const IN_PROGRESS = 2
export const RESOLVED = 3

const notify = new Schema({
  latitude:  Number,
  longitude: Number,
  date: Date,
  resolveTime: Date,
  status: Number,
  weather: Schema.Types.Mixed,
  photo: Schema.Types.Mixed,
})

export default mongoose.model('Notify', notify)
