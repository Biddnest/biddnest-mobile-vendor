import instance from '../../constant/baseService';
import {LOGIN_USER_DATA, CONFIG_DATA, ORDERS} from '../types';
import {CustomAlert} from '../../constant/commonFun';
import {STORE} from '../index';
import axios from 'axios';

export const APICall = (obj) => {
  return new Promise((resolve, reject) => {
    instance(obj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err?.response) {
          reject(err.response);
        } else {
          CustomAlert('Server Down');
          reject(false);
        }
      });
  });
};

export const initialConfig = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          'https://dashboard-biddnest.dev.diginnovators.com/api/v1/configuration',
        )
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

export const getOrders = (url, page) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: `bookings/${url}?page=${page}`,
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
          if (err?.status === 401) {
            // dispatch({
            //   type: RESET_STORE,
            // });
            // CommonActions.reset({
            //   index: 0,
            //   routes: [{name: 'Login'}],
            // });
          }
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
        if (err?.status === 401) {
          // dispatch({
          //   type: RESET_STORE,
          // });
          // CommonActions.reset({
          //   index: 0,
          //   routes: [{name: 'Login'}],
          // });
        }
        CustomAlert(err?.data?.message);
        reject(err);
      });
  });
};
