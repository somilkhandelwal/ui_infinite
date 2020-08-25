import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const SecuredRoute = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
};

SecuredRoute.propTypes = {
  authenticated: PropTypes.bool,
  location: PropTypes.object
};

SecuredRoute.defaultProps = {
  authenticated: false,
  location: {}
};

export default connect(state => ({ authenticated: state.session.authenticated }))(SecuredRoute);
