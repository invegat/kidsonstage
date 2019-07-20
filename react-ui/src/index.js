import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// import { BrowserRouter as Router } from 'react-router-dom';

// import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import darkBaseTheme from '@material-ui/baseThemes/darkBaseTheme';
// import getMuiTheme from '@material-ui/themes/getMuiTheme';

import App from './App';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
