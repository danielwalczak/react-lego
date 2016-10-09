/* eslint-disable no-param-reassign */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import * as routes from '../../app/routes';

const setRouterContext = () => {
  return function *setRouterContext(next) {
    match({
      routes: routes.makeRoutes(),
      location: this.url
    }, (error, redirect, renderProps) => {
      if (error) {
        throw error;
      } else if (redirect) {
        this.redirect(302, redirect.pathname + redirect.search);
      } else {
        // path * will return a 404
        const isNotFound = renderProps.routes.find((route) => route.path === '*');
        this.response.status = isNotFound ? 404 : 200;
        this.routerContext = renderToString(<RouterContext {...renderProps} />);
      }
    });
    yield next;
  };
};

export default setRouterContext;
