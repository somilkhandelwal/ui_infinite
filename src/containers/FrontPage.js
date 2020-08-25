import React from 'react';
import { Container, makeStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import MediaCard from '../components/common/MediaCard';
import { urls, withUrls } from '../urls';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    height: 'calc(100vh - 68px)',
    justifyContent: "center",
    display: "flex"
  },
  rootGrid: {
    flexGrow: 1,
  },
  itemGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    }
  }
}));

const FrontPage = (props) => {
  const { history } = props;
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" className={classes.root} >
        <Grid container className={classes.rootGrid} justify="center">
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.itemGrid}>
            <MediaCard imageUrl={require("../media/kepler.svg")} title="Kepler" onClick={() => history.push(urls.kepler())} />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className={classes.itemGrid}>
            <MediaCard imageUrl={require("../media/dash.svg")} title="Dash" onClick={() => history.push(urls.dash_chart())} />
          </Grid>
        </Grid>
      </Container>
    </>
  );

}
FrontPage.propTypes = {
  history: PropTypes.object.isRequired
};

export default withUrls(FrontPage);
