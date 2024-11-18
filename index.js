import { registerRootComponent } from 'expo';
import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/store';
import App from './App';

// Create a wrapper to include the Provider
const RootComponent = () => (
  // <Provider store={store}>
    <App />
  // </Provider>
);

// Register the wrapped component
registerRootComponent(RootComponent);
