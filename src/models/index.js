import mongoose from 'mongoose'
import Satellite from './satellite'
mongoose.connect('mongodb://localhost/nasa')
mongoose.Promise = global.Promise

export {
  Satellite,
}
