import {
  LOGIN_SUCCESS,
  LOGOUT,
  GET_WAETHER_LIST,
  GET_WAETHER_FAIL,
} from './type';
import AuthService from '../services/authService';
import * as Constant from '../../utils/constant';

export const login = (user, password) => dispatch => {
  return AuthService.logIn(user, password).then(
    response => {
      if (response.status === 'success') {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {user: response.user},
        });
        Promise.resolve();
        return response;
      }
    },
    error => {
      const message = error.toString();
      Promise.reject();
      return message;
    },
  );
};
export const logout = () => dispatch => {
  return AuthService.logOut().then(response => {
    if (response.status === 'success') {
      dispatch({
        type: LOGOUT,
      });
      Promise.resolve();
      return response;
    }
  });
};

export const getWeatherList = location => dispatch => {
  return fetch(
    `${Constant.WEATHER_API}&lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${Constant.KEY}`,
  )
    .then(response => response.json())
    .then(response => {
      return AuthService.setResponse(response).then(
        resp => {
          if (resp.status === 'success') {
            dispatch({
              type: GET_WAETHER_LIST,
              payload: {weatherData: resp.weatherData},
            });
            Promise.resolve();
            return resp;
          }
        },
        error => {
          const message = error.toString();
          dispatch({
            type: GET_WAETHER_FAIL,
          });
          Promise.reject();
          return message;
        },
      );
    })
    .catch(function (error) {
      throw error;
    });
};

export const getUser = () => dispatch => {
  return AuthService.getUserData().then(response => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {user: response.user},
    });
    Promise.resolve();
    return response;
  });
};
