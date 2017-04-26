import Router from 'koa-router'
import configureSatelite from './satelite'

export function configurePublic(): Array<Function> {
    const publicRouter = Router();
    publicRouter.use(configureSatelite())
    return publicRouter.routes()
}