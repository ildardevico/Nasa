import brain from 'brain'
import { Satellite } from '../models'

const net = new brain.NeuralNetwork()

const trainNeuralNetwork = async () => {
  let satellite
  while(satellite = await Satellite.findOne({ used: { $exists: false }})) { //eslint-disable-line
    const { latitude, longitude } = satellite
    net.train([{ input: { latitude, longitude }, output: {} }])
  }
}

trainNeuralNetwork().then(() => console.log('trained!')).catch(console.error)
