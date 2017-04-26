import Router from 'koa-router';
import { Satelite } from '../models';

const createSateliteData = async ctx => {
    const { 
        latitude,
        longitude,
        brighness,
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
    } = ctx.request.body;
    const satelite = await new Satelite({
        latitude,
        longitude,
        brighness,
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
    }).save();
    ctx.response.body = {
        success: true,
        data: satelite,
    }
}

const getSateliteData = async ctx => {
    try {
        ctx.response.body = {
        data: await Satelite.find({}),
        success: true,
        }
    } catch(err) {
        console.log(err);
    }
}

export default function configureSatelite(): Array<Function> {
    const router = Router()
    router.get('/satelite', getSateliteData)
    router.post('/satelite', createSateliteData)
    return router.routes()
}