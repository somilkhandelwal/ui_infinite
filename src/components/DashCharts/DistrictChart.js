import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js'
import { connect } from 'react-redux';

const DistrictChart = (props) => {
  const { districts, selectedState, states } = props;

  const initState = {
    data: [],
    layout: {},
  };
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty
  });
  const [state, setState] = useReducer(reducer, initState);


  useEffect(() => {
    if (districts && districts.length && states && states.length) {
      const xCord = [];
      const yCord = [];
      const customdata = []
      const filteredDistricts = districts.filter(district => +district.stateDensity === +selectedState);
      const currentState = states.find(item => item.id === selectedState)
      filteredDistricts.forEach((district) => {
        xCord.push(district.district);
        yCord.push(district.population);
        customdata.push(district)
      })
      setState({
        data: [
          {
            type: 'bar',
            x: [...xCord],
            hovertext: [...xCord],
            name: "district",
            y: [...yCord],
            customdata: [...customdata]
          }
        ],
        layout: {
          title: currentState.address
        }
      })
    }
  }, [districts, selectedState, states])
  return (
    <>
      <Plot
        data={state.data}
        layout={{
          ...state.layout,
          autosize: true
        }}
        useResizeHandler
        style={{ width: "100%", height: "50%" }}
      />
    </>
  );

}
DistrictChart.propTypes = {
  districts: PropTypes.array,
  selectedState: PropTypes.number.isRequired,
  states: PropTypes.array
};

DistrictChart.defaultProps = {
  states: [],
  districts: []
};

const mapStateToProps = (state) => {
  const { districts, states } = state;
  return ({
    districts: districts.districts,
    states: states.states
  })
}
export default connect(mapStateToProps, null)(DistrictChart);
