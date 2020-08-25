import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
import { muiTheme } from './theme';
import { TopRoutes } from './routes';



const App = ({ store }) => {
  return (
    <Provider store={store}>
      <Suspense fallback="...">
        <MuiThemeProvider theme={muiTheme}>
            <TopRoutes />
        </MuiThemeProvider>
      </Suspense>
    </Provider>
  );
};

export default App;
