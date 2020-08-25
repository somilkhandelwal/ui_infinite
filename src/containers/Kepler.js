import React, { useEffect } from 'react';
import KeplerGl from 'kepler.gl';
import { addDataToMap as addDataToMapAction } from 'kepler.gl/actions';
import PropTypes from 'prop-types';
import { Container, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { DistrictActions } from '../store/actions/districts'
import keplerConfig from '../keplerConfig';


const fields = [
  {
    name: "id",
    format: '',
    type: "integer"
  },
  {
    name: "District",
    format: '',
    type: "string"
  },
  {
    name: "latitude",
    format: '',
    type: "real"
  },
  {
    name: "longitude",
    format: '',
    type: "real"
  },
  {
    name: "Population",
    format: '',
    type: "real"
  },
  {
    name: "Male",
    format: '',
    type: "real"
  },
  {
    name: "Female",
    format: '',
    type: "real"
  },
  {
    name: "Literate",
    format: '',
    type: "real"
  },
  {
    name: "State",
    format: '',
    type: "string"
  }
]


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    padding: 0,
    maxWidth: '100%'
  }
}));


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

const Kepler = (props) => {
  const classes = useStyles();
  const { fetchDistricts, addDataToMap } = props;
  useEffect(() => {
    fetchDistricts((data) => {
      const { districts, states } = data;
      let rows = [];
      if (districts.length && states && states.length) {
        rows = districts.map(item => {
          const currentState = states.find(ele => +ele.id === +item.stateDensity)
          return [
            item.id, item.district,
            item.latitude, item.longitude,
            item.population, item.male,
            item.female, item.literate,
            currentState.address
          ]
        })
      }
      addDataToMap({
        datasets: {
          info: {
            label: 'Population India',
            id: 'map1'
          },
          data: { fields, rows }
        },
        option: {
          centerMap: true,
          readOnly: false
        },
        config: keplerConfig
      });
    });
  }, [fetchDistricts, addDataToMap]);

  return (
    <>
      <Container className={classes.root}>
        <KeplerGl
          mapboxApiAccessToken={MAPBOX_TOKEN}
          width={window.innerWidth}
          height={window.innerHeight}
          id="map1"
        />
      </Container>
    </>
  );

}
Kepler.propTypes = {
  fetchDistricts: PropTypes.func.isRequired,
  addDataToMap: PropTypes.func.isRequired,
};

Kepler.defaultProps = {
};


const mapDispatchToProps = (dispatch) => ({
  fetchDistricts: (cb) => dispatch(DistrictActions.getAll(cb)),
  addDataToMap: (body) => dispatch(addDataToMapAction(body))
});

export default connect(null, mapDispatchToProps)(Kepler);
