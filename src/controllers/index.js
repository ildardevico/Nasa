import Router from 'koa-router'
import configureSatellite from './satellite'

export function configurePublic(): Array<Function> {
  const publicRouter = Router()
  publicRouter.use(configureSatellite())
  return publicRouter.routes()
}
