import React from 'react';
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import Main from './src/main/main'

var remotedev = require('remotedev-server');
remotedev({ hostname: 'localhost', port: 8000 });
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main></Main>
      </PersistGate>
    </Provider>
  )

}

export default App;

