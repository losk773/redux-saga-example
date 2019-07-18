import React from 'react';
import { Route, Router, Switch } from 'react-router';
import { HomeScene } from 'containers';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({});

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" component={HomeScene} />
    </Switch>
  </Router>
);

