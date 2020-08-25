import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AccountActions } from '../store/actions/account';
import AppBar from '../components/AppBar';
import { Redirect } from 'react-router-dom';

const AppPage = (props) => {
  const {
    fetchCurrentUser, approutes, authenticated
  } = props;

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (!authenticated) {
    return <Redirect to="/login" />
  }


  const renderPage = () => {
    return (
      <>
        <AppBar {...props} />
        {approutes}
      </>
    );
  }

  return (
    <>
      {renderPage()}
    </>
  );
}

AppPage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  approutes: PropTypes.node.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
};

AppPage.defaultProps = {
};

function mapStateToProps(state) {
  return {
    authenticated: state.session.authenticated
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(AccountActions.fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
