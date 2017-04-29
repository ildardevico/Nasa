import mongoose from 'mongoose'
import Notify from './satellite'
mongoose.connect('mongodb://localhost/nasa')
mongoose.Promise = global.Promise

export {
  Notify,
}
