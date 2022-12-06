import {
  LOGIN_SUCCESS,
  LOGOUT,
  GET_USER_LOCATION_ACCESS_STATUS,
  GET_WAETHER_LIST,
  GET_WAETHER_FAIL,
  GET_USER,
} from './../action/type';
const initialState = {
  user: '',
  weatherData: {},
};
export const auth = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        // isLoggedIn: true,
        user: payload.user,
        weatherData: null,
      };
    case LOGOUT:
      return {
        ...state,
        // isLoggedIn: false,
        user: null,
        waetherData: null,
      };
    case GET_WAETHER_LIST:
      return {
        ...state,
        // isLoggedIn: true,
        weatherData: payload.weatherData,
      };
    case GET_WAETHER_FAIL:
      return {
        ...state,
        // isLoggedIn: true,
      };

    case GET_USER:
      return {
        ...state,
        // isLoggedIn: true,
        user: payload.user,
        // data: null,
      };
    case GET_USER_LOCATION_ACCESS_STATUS:
      return {
        ...state,
        // isLoggedIn: true,
        user: null,
        // locationAccess: payload.locationAccess,
      };

    default:
      return state;
  }
};
