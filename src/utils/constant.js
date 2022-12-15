/** Constnats defined for the applications. */

export const KEY = 'e32288e2c93f2b6ce0f6aa1615590e2b';
export const WEATHER_API = 'https://api.openweathermap.org/data/2.5/forecast?';
export const START_BUTTON = 'START';
export const LOGIN_BUTTON = 'LOGIN';
export const LOGOUT_BUTTON = 'Logout';
export const USERNAME_PLACEHOLDER = 'username';
export const PASSWORD_PLACEHOLDER = 'password';
export const DASHBOARD_SCREEN = 'Dashboard';
export const LOGIN_SCREEN = 'Login';
export const CONFIRMATION = 'Confirm';
export const LOGUT_ALERT_MSG = 'Are you sure you want to log-out?';
export const SESSION_EXPIRED_TITLE = 'Session Expired';
export const SESSION_EXPIRED_DETAIL = 'you will be log-out';
export const MIN_VALID_LENGTH = 0;
export const ICON_API = 'https://openweathermap.org/img/wn/';
export const TODAY = '/ Today';
export const FEELS_LIKE = 'Feels Like';
export const HUMIDITY = 'Humidity';
export const KM_H = 'km/h';
export const WEEKLY_FORECAST = 'Weekly Forecast';

export const getTempInCelcius = temp => {
  return `${Math.round(temp - 273.15)}°`;
};

export const DEFAULT_LOCATION = {
  coords: {
    accuracy: 600,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    latitude: 37.4214938,
    longitude: -122.083922,
    speed: 0,
  },
  mocked: false,
  provider: 'fused',
  timestamp: 1669970978631,
};
