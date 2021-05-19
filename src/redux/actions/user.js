import instance from '../../constant/baseService';
import {
  LOGIN_USER_DATA,
  CONFIG_DATA,
  ORDERS,
  DRIVER_VEHICLE_LIST,
  RESET_STORE,
} from '../types';
import {CustomAlert} from '../../constant/commonFun';
import {STORE} from '../index';
import {CommonActions} from '@react-navigation/native';
import {navigationRef} from '../../navigation/RootNavigation';
import moment from 'moment';
import {Alert} from 'react-native';

export const APICall = (obj) => {
  return new Promise((resolve, reject) => {
    instance(obj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          CustomAlert('Try to login again');
          navigationRef.current?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'Login'}],
            }),
          );
        } else if (err?.response?.status === 500) {
          Alert.alert(
            'oops!!',
            'Something Went wrong!! Please try again later',
            [{text: 'Retry', onPress: () => console.log('OK Pressed')}],
          );
        } else if (err?.response) {
          reject(err.response);
        } else {
          Alert.alert(
            'oops!!',
            'Something Went wrong!! Please try again later',
            [{text: 'Retry', onPress: () => console.log('OK Pressed')}],
          );
        }
      });
  });
};

export const initialConfig = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: 'configuration',
        method: 'get',
      };
      APICall(obj)
        .then((res) => {
          dispatch({
            type: CONFIG_DATA,
            payload: res?.data?.data || {},
          });
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const signIn = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: 'auth/login',
        method: 'post',
        data: data,
      };
      APICall(obj)
        .then((res) => {
          if (res?.data?.status === 'success') {
            dispatch({
              type: LOGIN_USER_DATA,
              payload: res?.data?.data,
            });
          }
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_STORE,
    });
  };
};

export const getDriverOrders = (url, data, page) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url:
          Object.keys(data)?.length > 0
            ? `bookings/driver/${url}?page=${page}&from=${moment(
                data?.from,
              ).format('yyyy/MM/DD')}&to=${moment(data?.to).format(
                'yyyy/MM/DD',
              )}&status=${data?.status}&service_id=${data?.service_id}`
            : `bookings/driver/${url}?page=${page}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {
          dispatch({
            type: ORDERS,
            payload: res?.data?.data || {},
          });
          resolve(res.data);
        })
        .catch((err) => {
          CustomAlert(err?.data?.message);
          reject(err);
        });
    });
  };
};

export const getOrders = (url, data, page) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url:
          Object.keys(data)?.length > 0
            ? `bookings/${url}?page=${page}&from=${moment(data?.from).format(
                'yyyy/MM/DD',
              )}&to=${moment(data?.to).format('yyyy/MM/DD')}&status=${
                data?.status
              }&service_id=${data?.service_id}`
            : `bookings/${url}?page=${page}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {
          dispatch({
            type: ORDERS,
            payload: res?.data?.data || {},
          });
          resolve(res.data);
        })
        .catch((err) => {
          CustomAlert(err?.data?.message);
          reject(err);
        });
    });
  };
};

export const checkPinStatus = (url) => {
  return new Promise((resolve, reject) => {
    let obj = {
      url: 'pin/status',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        CustomAlert(err?.data?.message);
        reject(err);
      });
  });
};

export const getDriver = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: 'drivers',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {
          if (res?.data?.status === 'success') {
            dispatch({
              type: DRIVER_VEHICLE_LIST,
              payload: {
                ...STORE.getState().Login?.driverVehicleList,
                drivers: res?.data?.data?.drivers,
              },
            });
          }
          resolve(res.data);
        })
        .catch((err) => {
          CustomAlert(err?.data?.message);
          reject(err);
        });
    });
  };
};

export const getVehicle = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: 'vehicles',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {
          if (res?.data?.status === 'success') {
            dispatch({
              type: DRIVER_VEHICLE_LIST,
              payload: {
                ...STORE.getState().Login?.driverVehicleList,
                vehicles: res?.data?.data?.vehicles,
              },
            });
          }
          resolve(res.data);
        })
        .catch((err) => {
          CustomAlert(err?.data?.message);
          reject(err);
        });
    });
  };
};

export const sendOTP = (data) => {
  return new Promise((resolve, reject) => {
    let obj = {
      url: 'auth/verification/phone',
      method: 'post',
      data: data,
    };
    APICall(obj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const verifyOTP = (data) => {
  return new Promise((resolve, reject) => {
    let obj = {
      url: 'auth/verification/otp',
      method: 'post',
      data: data,
    };
    APICall(obj)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProfile = (data, type = '') => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url:
          type === 'organization'
            ? 'organization/update'
            : type === 'vendor'
            ? 'profile/update'
            : type === 'location'
            ? 'location/update'
            : 'details/update',
        method: 'put',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
        data: data,
      };
      APICall(obj)
        .then((res) => {
          dispatch({
            type: LOGIN_USER_DATA,
            payload: {
              ...STORE.getState().Login?.loginData,
              vendor: res?.data?.data?.vendor,
            },
          });
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
};
