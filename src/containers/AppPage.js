import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AccountActions } from '../store/actions/account';
import AppBar from '../components/AppBar';

const AppPage = (props) => {
  const {
    fetchCurrentUser, approutes
  } = props;

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

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
  profile: PropTypes.shape({}).isRequired,
  approutes: PropTypes.node.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired
};

AppPage.defaultProps = {
};

function mapStateToProps(state) {
  const { profile } = state;
  return {
    profile
  };
}

const mapDispatchToProps = (dispatch) => ({
  fetchCurrentUser: () => dispatch(AccountActions.fetchCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
