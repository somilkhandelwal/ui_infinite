import React, { useEffect, useState } from 'react';
import { addDataToMap as addDataToMapAction } from 'kepler.gl/actions';
import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { DistrictActions } from '../store/actions/districts'
import StateChart from '../components/DashCharts/StateChart';
import DistrictChart from '../components/DashCharts/DistrictChart';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8)
  }
}));
const Dash = (props) => {
  const classes = useStyles();
  const { fetchDistricts } = props;


  const [selectedState, setSelectedState] = useState(1);


  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <StateChart setSelectedState={setSelectedState} />
        <DistrictChart selectedState={selectedState} />
      </Container>
    </>
  );

}
Dash.propTypes = {
  fetchDistricts: PropTypes.func.isRequired,
  addDataToMap: PropTypes.func.isRequired,
};

Dash.defaultProps = {
};


const mapDispatchToProps = (dispatch) => ({
  fetchDistricts: (cb) => dispatch(DistrictActions.getAll(cb)),
  addDataToMap: (body) => dispatch(addDataToMapAction(body))
});
const mapStateToProps = (state) => {
  return ({

  })
}
export default connect(mapStateToProps, mapDispatchToProps)(Dash);
