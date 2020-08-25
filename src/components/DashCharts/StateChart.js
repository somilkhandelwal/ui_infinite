import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js'
import { connect } from 'react-redux';

const StateChart = (props) => {
  const { states, setSelectedState } = props;

  const initState = {
    data: [],
    layout: {},
  };
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty
  });
  const [state, setState] = useReducer(reducer, initState);


  const handleClick = (arg) => {
    if (arg && arg.points && arg.points[0] && arg.points[0].customdata) {
      setSelectedState(arg.points[0].customdata.id);
    }
  }

  useEffect(() => {
    if (states && states.length) {
      const xCord = [];
      const yCord = [];
      const customdata = []
      states.forEach((state) => {
        xCord.push(state.address);
        yCord.push(state.population);
        customdata.push(state)
      })
      setState({
        data: [
          {
            type: 'bar',
            x: [...xCord],
            hovertext: [...xCord],
            y: [...yCord],
            customdata: [...customdata]
          }
        ]
      })
    }
  }, [states])
  return (
    <>
      <Plot
        data={state.data}
        layout={{
          title: 'State Population Chart<br> Click on states to see district population graph below',
          autosize: true
        }}
        useResizeHandler
        style={{ width: "100%", height: "50%" }}
        onClick={handleClick}
      />
    </>
  );

}
StateChart.propTypes = {
  states: PropTypes.array,
  setSelectedState: PropTypes.func.isRequired
};

StateChart.defaultProps = {
  states: []
};

const mapStateToProps = (state) => {
  const { states } = state;
  return ({
    states: states.states
  })
}
export default connect(mapStateToProps, null)(StateChart);
