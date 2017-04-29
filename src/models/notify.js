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
  category: Number,
  used: Boolean,
  location: Schema.Types.Mixed,
  victim: Number,
})

notify.index({ location: '2dsphere' })

export default mongoose.model('Notify', notify)
