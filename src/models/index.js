import mongoose from 'mongoose';
import Satelite from './satelite';
mongoose.connect('mongodb://localhost/nasa');

export {
    Satelite,
}