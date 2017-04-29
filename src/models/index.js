import mongoose from 'mongoose'
import Notify from './notify'
mongoose.connect('mongodb://localhost/nasa')
mongoose.Promise = global.Promise

export {
  Notify,
}
