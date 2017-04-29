import Router from 'koa-router'
import rp from 'request-promise'
import config from '../config'
import Notify from '../models'
import { PENDING, IN_PROGRESS, RESOLVED } from '../models/notify'

const create = async ctx => {
  const { latitude, longitude } = ctx.request.body
  console.log(ctx.request.files)
  const { weather: { endpoint, apiKey } } = config
  const weather = await rp({
    uri: `${endpoint}/weather`,
    qs: {
      lat: latitude,
      long: longitude,
      appid: apiKey,
    }
  })
  const notify = await new Notify({
    latitude,
    longitude,
    status: PENDING,
    weather,
    date: new Date()
  }).save()
  ctx.response.body = {
    notify,
  }
}

const approve = async ctx => {
  const { id } = ctx.request.params
  const notify = await Notify.findOne({ id })
  notify.status = IN_PROGRESS
  await notify.save()
  ctx.response.body = {
    notify,
  }
}

const resolve = async ctx => {
  const { id } = ctx.request.params
  const { category, victim } = ctx.request.body
  const notify = await Notify.find({ id })
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
  router.post('/notify', create)
  router.patch('/notify/:id', approve)
  router.pus('/notify/:id', resolve)
  return router.routes()
}
