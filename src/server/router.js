import koaRouter from 'koa-router';
// import koaStatic from 'koa-static';
import debug from 'debug';

import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
// import apiRouter from './api';
// import { DIST, PUBLIC } from '../config/paths';

const log = debug('lego:router');
// const oneDay = 1000 * 60 * 60 * 24;
export const router = koaRouter();

// routingApp.on('mount', (parent) => {
//   parent.use((err, req, res, next) => (
//     (err) ? res.render500(err) : next()
//   ));
// });
// console.log(`PUBLIC`, PUBLIC)
// var publicFiles = koaStatic(PUBLIC);
// publicFiles._name = 'koaStatic /public';
//
// var distFiles = koaStatic(DIST);
// distFiles._name = 'koaStatic /dist';

export function setRoutes(assets) {
  log('adding react routes');

  router
    // .use(koaStatic(publicFiles))
    // .use(koaStatic(distFiles))
    // .use('/api', apiRouter)
    .get(setRouterContext, renderApp(assets));
}
