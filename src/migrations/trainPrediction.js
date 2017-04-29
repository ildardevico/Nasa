import brain from 'brain'
import { Notify } from '../models'

const net = new brain.NeuralNetwork()

const trainNeuralNetwork = async () => {
  let notify
  while(notify = await Notify.findOne({ used: false })) { //eslint-disable-line
    const { latitude, longitude, weather, category, date, resolveTime } = notify
    const { main: { temp, temp_min, temp_max, wind: { speed, deg } } } = weather
    net.train([
      {
        input: { latitude, longitude, temp, temp_min, temp_max, speed, deg, date, resolveTime },
        output: { category, resolveTime }
      }
    ])
  }
}

trainNeuralNetwork().then(() => console.log('trained!')).catch(console.error)
