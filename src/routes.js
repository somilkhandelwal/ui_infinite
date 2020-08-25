import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SecuredRoute from './components/SecuredRoute';
import FrontPage from './containers/FrontPage';
import PageNotFound from './components/PageNotFound';
import Landing from './containers/Landing';
import LoginPage from './containers/LoginPage';
import AppPage from './containers/AppPage';
import Dash from './containers/DashStates';
import Kepler from './containers/Kepler';

const routes = () => {
  return (
    <Switch>
      <SecuredRoute exact path='/dashboard' component={FrontPage} />
      <SecuredRoute exact path='/dash_chart' component={Dash} />
      <SecuredRoute exact path='/kepler' component={Kepler} />
      <SecuredRoute component={PageNotFound} />
    </Switch>
  );
};


function appComponent(props) {
  return (<AppPage {...props} approutes={routes()} />);
}

export const TopRoutes = () => {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/login' component={LoginPage} />
          <Route render={appComponent} />
        </Switch>
      </React.Fragment>
    </Router>
  )
}


// export default routes;
