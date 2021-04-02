import {CONFIG_DATA, DRIVER_VEHICLE_LIST, LOGIN_USER_DATA, ORDERS} from '../types';
import {appDefaultReducer} from './default';
const INITIAL_STATE = appDefaultReducer.Login;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_DATA: {
      return {...state, loginData: action.payload};
    }
    case DRIVER_VEHICLE_LIST: {
      return {...state, driverVehicleList: action.payload};
    }
    case CONFIG_DATA: {
      return {...state, configData: action.payload};
    }
    case ORDERS: {
      return {...state, orders: action.payload};
    }
    default:
      return state;
  }
};
