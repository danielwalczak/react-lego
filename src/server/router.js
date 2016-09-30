import express from 'express';
import debug from 'debug';
import static from 'koa-static';

import setRouterContext from './middleware/set-router-context';
import renderApp from './middleware/render-app';
import apiRouter from './api';
import { DIST, PUBLIC } from '../config/paths';

const log = debug('lego:router');
const oneDay = 1000 * 60 * 60 * 24;

export const routingApp = express();

routingApp.on('mount', (parent) => {
  parent.use((err, req, res, next) => (
    (err) ? res.render500(err) : next()
  ));
});

var publicFiles = static(PUBLIC);
publicFiles._name = 'static /public';

var distFiles = static(DIST);
distFiles._name = 'static /dist';

export function setRoutes(assets) {
  log('adding react routes');

  routingApp
    .use(static(publicFiles))
    .use(static(distFiles))
    .use('/api', apiRouter)
    .get('*', setRouterContext, renderApp(assets));
}
