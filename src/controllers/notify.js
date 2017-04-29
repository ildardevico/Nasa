import Router from 'koa-router'
import rp from 'request-promise'
import config from '../config'
import { Notify } from '../models'
import { PENDING, IN_PROGRESS, RESOLVED } from '../models/notify'

const getByLocation = async ctx => {
  const { longitude, latitude } = ctx.request.query
  console.log(longitude, latitude)
  ctx.response.body = {
    notifies: await Notify.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point' ,
            coordinates: [ +longitude , +latitude ]
          },
          $maxDistance: 1000000,
          $minDistance: 0,
        }
      }
    }),
  }
}

const create = async ctx => {
  const { latitude, longitude } = ctx.request.body
  const { weather: { endpoint, apiKey } } = config
  const weather = await rp({
    uri: endpoint,
    qs: {
      lat: latitude,
      lon: longitude,
      appid: apiKey,
    }
  }).catch(console.error)
  const notify = await new Notify({
    latitude,
    longitude,
    status: PENDING,
    weather,
    date: new Date(),
    location: {
      x: +latitude,
      y: +longitude,
    }
  }).save()
  ctx.response.body = {
    notify,
  }
}

const approve = async ctx => {
  const { id } = ctx.params
  const notify = await Notify.findOne({ _id: id })
  notify.status = IN_PROGRESS
  await notify.save()
  ctx.response.body = {
    notify,
  }
}

const resolve = async ctx => {
  const { id } = ctx.params
  const { category, victim } = ctx.request.body
  const notify = await Notify.findOne({ _id: id })
  notify.status = RESOLVED
  notify.category = category
  notify.victim = victim
  notify.resolveTime = new Date()
  await notify.save()
  ctx.response.body = {
    notify,
  }
}

export default function configureNotify() {
  const router = Router()
  router.get('/notify', getByLocation)
  router.post('/notify', create)
  router.patch('/notify/:id', approve)
  router.put('/notify/:id', resolve)
  return router.routes()
}
