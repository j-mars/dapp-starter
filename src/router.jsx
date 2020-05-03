import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from 'components/LayoutComponents/Loader';

const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  });

const routes = [
  // Feed
  {
    path: '/feed',
    component: loadable(() => import('pages/Feed')),
    exact: true,
  },
  // Home
  {
    path: '/home',
    component: loadable(() => import('pages/Home')),
  },
];

const Router = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    {routes.map((route) => (
      <Route path={route.path} component={route.component} key={route.path} exact={route.exact} />
    ))}
  </Switch>
);

export default Router;
