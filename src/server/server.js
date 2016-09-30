import React from 'react';
// import { renderToString } from 'react-dom/server';
import koa from 'koa';
import debug from 'debug';
// import compression from 'compression';
// import Error500 from './templates/Error500';
// import { routingApp, setRoutes } from './router';
import webpackConfig from '../config/webpack.config.prod';

const webpackEntries = Object.keys(webpackConfig.entry);
const assets = {
  javascript: webpackEntries.map((entry) => `/${entry}.js`),
  styles: webpackEntries.map((entry) => `/${entry}.css`)
};
const server = koa();
const log = debug('lego:server.js');
log('starting');

function responseTime(){
  return function *responseTime(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
  }
}

function logger(){
  return function *logger(next) {
    var start = new Date;
    yield next;
    var ms = new Date - start;
    log(`${this.method} ${this.originalUrl} ${this.status} ${ms}ms`)
  }
}


function headers(){
  return function *headers(next) {
    yield next;
    return !this.body
      ? false
      : [
        this.set('Content-Length', this.body.length),
        this.set('Cache-Control', 'no-cache, no-store, must-revalidate'),
        this.set('Pragma', 'no-cache'),
        this.set('Expires', 0)
    ];
  }
}


function body(){
  return function *body(next) {
    yield next;
    if (this.path!=='/') return;
    this.body = 'hello world';
  }
}


server.use(responseTime());
server.use(logger());
server.use(headers());
server.use(body());

// server.set('etag', true);
// server.use(compression());
// server.enable('view cache');
// server.enable('strict routing');

// Object.assign(express.response, {
//   renderPageToString(page) {
//     return `<!doctype html>${renderToString(page)}`;
//   },
//   render500(e) {
//     log('render500', e);
//     this.status(500).send(this.renderPageToString(<Error500 />));
//   }
// });

// setRoutes(assets);
// server.use('/', routingApp);

export default server;
