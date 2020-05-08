import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Loadable from 'react-loadable';
import Loader from 'components/LayoutComponents/Loader/index.jsx';
import MainLayout from 'layouts/Main';

const loadable = (loader) =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader spinning />,
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

const Router = (props) => {
  const { history } = props;

  return (
    <ConnectedRouter history={history}>
      <MainLayout>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          {routes.map((route) => (
            <Route
              path={route.path}
              component={route.component}
              key={route.path}
              exact={route.exact}
            />
          ))}
        </Switch>
      </MainLayout>
    </ConnectedRouter>
  );
};

export default Router;
