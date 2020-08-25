import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore';
import { loadAppState, storeAppState } from './service/localstorage';
import throttle from 'lodash/throttle';
import INIT_STATE from './store/reducers/initialState';


const store = configureStore(loadAppState() || INIT_STATE);

// make sure user session data is saved
// but do serialization only after every 2 seconds
store.subscribe(throttle(() => {
  const currState = store.getState();
  storeAppState({
    session: currState.session
  });
}, 2000));

ReactDOM.render(<App store={store} />, document.getElementById('root'));
