import {
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_REQUEST_ERROR,
  AUTH_REQUEST_SUCCESS
} from './authAction';

const initialState = {
  status: '',
  data: {},
  error: '',
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        status: 'loading',
        error: '',
      };
    case AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        status: 'loaded',
        data: action.data,
        error: '',
      };
    case AUTH_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        data: {},
        status: '',
      };
    default:
      return state;
  }
};
