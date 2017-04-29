import Router from 'koa-router'
import configureNotify from './notify'

export function configurePublic() {
  const publicRouter = Router()
  publicRouter.use(configureNotify())
  return publicRouter.routes()
}
