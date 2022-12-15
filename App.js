/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import Navigation from './src/navigation/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './src/redux/shared/store';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StoreProvider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <Navigation />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
