import instance from '../../constant/baseService';
import {LOGIN_USER_DATA, RESET_STORE} from '../types';

export const APICall = (obj) => {
  return new Promise((resolve, reject) => {
    instance(obj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err.response) {
          reject(err.response);
        } else {
          reject('Something went wrong!');
        }
      });
  });
};

export const signIn = (data, type, collectorType) => {
  let url;
  if (type === 'vendor') {
    url = 'login_vendor';
  } else if (type === '' && collectorType === 'vendor') {
    url = 'login_driver';
  } else if (type === '' && collectorType === 'buyers') {
    url = 'login_buyersdriver';
  } else if (type === 'buyers') {
    url = 'login_buyers';
  }
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      let obj = {
        url: url,
        method: 'post',
        data: data,
      };
      APICall(obj)
        .then((res) => {
          if (res && res.data && res.data.status === 'success') {
            dispatch({
              type: LOGIN_USER_DATA,
              payload: res.data,
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

export const signOut = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      APICall(data)
        .then((res) => {
          if (res && res.data && res.data.status === 'success') {
            dispatch({
              type: RESET_STORE,
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
