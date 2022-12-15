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
        user: payload.user,
        weatherData: null,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        waetherData: null,
      };
    case GET_WAETHER_LIST:
      return {
        ...state,
        weatherData: payload.weatherData,
      };
    case GET_WAETHER_FAIL:
      return {
        ...state,
      };

    case GET_USER:
      return {
        ...state,
        user: payload.user,
      };
    case GET_USER_LOCATION_ACCESS_STATUS:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
