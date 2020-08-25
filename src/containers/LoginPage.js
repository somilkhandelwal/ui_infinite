import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { Grid, makeStyles, Button, Container } from '@material-ui/core';
import CustomizedTextField from '../components/common/formFields/CustomizedTextField';
import { SessionActions } from '../store/actions/session';
import { Redirect } from 'react-router-dom';

const requiredTextField = value => (value && value.trim() ? undefined : 'Required_Field_Error');



const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100%',
    display: 'flex'
  },
  formClass: {
    width: '100%',
    justifyContent: 'center',
    display: 'flex'
  }
}));

const LoginPage = (props) => {
  const classes = useStyles();

  const { onSubmit, isAuthenticated } = props;

  const handleSubmit = (values) => {
    return new Promise((res) => {
      onSubmit({ email: values.username, password: values.password }, (error) => {
        // if (!(error && (error.password || error.username))) {
        return res({ username: 'Generic_Login_Error' });
        // }
        // console.log(error);
        // return res(error);
      });
    });
  }

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container maxWidth="lg" style={{ height: '100vh' }}>
      <Grid
        className={classes.root}
        container
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit, form, values }) => (
            <form
              className={classes.formClass}
              onSubmit={handleSubmit}>
              <Grid
                item
                container
                lg={4}
                md={4}
                direction="column"
                spacing={3}
              >
                <Grid item>
                  <Field
                    component={CustomizedTextField}
                    name="username"
                    label="UserName"
                    required
                    validate={requiredTextField}
                  />
                </Grid>
                <Grid item>
                  <Field
                    component={CustomizedTextField}
                    name="password"
                    label="Password"
                    type="password"
                    required
                    validate={requiredTextField}
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    value="submit"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Login
                </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </Grid>
    </Container>
  );

}

LoginPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.session.authenticated
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: (body, callback) => dispatch(SessionActions.login(body, callback)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
