import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const logIn = async (username, password) => {
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
  } catch (error) {}
};

const setResponse = async response => {
  AsyncStorage.setItem('data', JSON.stringify(response));
  return {
    status: 'success',
    message: 'You are redirecting to dashbard page',
    weatherData: response,
  };
};

export default {
  logIn,
  logOut,
  getUserData,
  setResponse,
};
