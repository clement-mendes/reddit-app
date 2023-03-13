import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './reducer/index';

function AppContainer() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppContainer;
