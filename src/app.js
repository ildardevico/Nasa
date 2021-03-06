import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import cluster from 'cluster'
import os from 'os'
import winstonKoaLogger from 'winston-koa-logger'
import logger from 'winston'
import { configurePublic } from './controllers'
import config from './config'

if (cluster.isMaster) {
  const numCpus = os.cpus().length
  for( let i = 0; i < numCpus; i++ ) {
    cluster.fork()
  }
  cluster.on('exit', () => {
    console.log('[WARN] Worker %d died with code/signal %s. Restarting worker...')//eslint-disable-line no-console
    cluster.fork()
  })
} else {
  const app = new Koa
  app.use(winstonKoaLogger(logger))

  app.use(BodyParser())
  app.use((ctx, next) => {
    ctx.response.set('Access-Control-Allow-Origin', ctx.get('Origin'))
    ctx.response.set('Access-Control-Allow-Methods', 'GET, HEAD, PUT, POST, DELETE, PATCH')
    ctx.response.set('Access-Control-Allow-Headers', 'Authorization, Content-Type')
    if (ctx.method == 'OPTIONS') {
      ctx.response.status = 204
    } else {
      return next()
    }
  })

  app.use(configurePublic())

  app.use(ctx => {
    ctx.response.status = 404
    ctx.response.body = {
      status: false,
      code: 404,
      msg: 'Not found'
    }
  })

  app.listen(config.port)
}
