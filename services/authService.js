import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const logIn = async (username, password) => {
  console.log('user info', username);
  if (username === 'admin' && password === '12345678') {
    AsyncStorage.setItem('user', username);
    return {
      status: 'success',
      message: 'You are redirecting to home page',
      user: username,
    };
  } else {
    return {
      status: 'Failure',
      message: 'Error',
      user: username,
    };
  }
};
const logOut = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
      return {
        status: 'success',
        message: 'You are logged out',
      };
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
      return {
        status: 'success',
        message: 'You are logged out',
      };
    }
  }
};

const getUserData = async () => {
  try {
    const savedUser = await AsyncStorage.getItem('user');
    return {
      status: 'success',
      message: 'user data',
      user: savedUser,
    };
  } catch (error) {
    console.log(error);
  }
};

const setResponse = async response => {
  console.log('setResponse');
  console.log(response);
  AsyncStorage.setItem('data', JSON.stringify(response));
  return {
    status: 'success',
    message: 'You are redirecting to dashbard page',
    weatherData: response,
  };
};

const setUserLocationAccess = async accessible => {
  console.log('setUserLocationAccess', accessible);
  AsyncStorage.setItem('locationAccess', JSON.stringify(accessible));
  return {
    status: 'success',
    message: 'User location access',
    locationAccess: accessible,
  };
};

export default {
  logIn,
  logOut,
  getUserData,
  setResponse,
  setUserLocationAccess,
};
