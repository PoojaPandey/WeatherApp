/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as StoreProvider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './shared/store';

const ReduxProvider = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <App />
      </SafeAreaProvider>
    </StoreProvider>
  );
};
AppRegistry.registerComponent(appName, () => ReduxProvider);
