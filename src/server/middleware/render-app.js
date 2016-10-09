import React from 'react';
import Html from '../templates/Html';

export default function renderAppWrapper(assets) {
  return function *renderApp(next) {
    yield next;
    try {
      this.body = this.renderPageToString(
        <Html
          scripts={assets.javascript}
          stylesheets={assets.styles}
          content={this.routerContext}
        />
      );
    } catch (error) {
      this.body = this.render500(error);
    }
  };
}
