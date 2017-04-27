import Router from 'koa-router'
import { Satellite } from '../models'

const createSatelliteData = async ctx => {
  const {
      latitude,
      longitude,
      brightness,
      acq_date,
      acq_time,
      scan,
      track,
      satellite,
      confidence,
      version,
      bright_t31,
      frp,
      daynight,
  } = ctx.request.body
  const createdSatellite = await new Satellite({
    latitude,
    longitude,
    brightness,
    acq_date,
    acq_time,
    scan,
    track,
    satellite,
    confidence,
    version,
    bright_t31,
    frp,
    daynight,
  }).save()
  ctx.response.body = {
    success: true,
    data: createdSatellite,
  }
}

const getSatelliteData = async ctx => {
  try {
    ctx.response.body = {
      data: await Satellite.find({}),
      success: true,
    }
  } catch(err) {
    console.log(err)
  }
}

export default function configureSatellite(): Array<Function> {
  const router = Router()
  router.get('/satellite', getSatelliteData)
  router.post('/satellite', createSatelliteData)
  return router.routes()
}
