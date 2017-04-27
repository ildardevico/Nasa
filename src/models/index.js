import mongoose from 'mongoose'
import Satellite from './satellite'
mongoose.connect('mongodb://localhost/nasa')

export {
  Satellite,
}
