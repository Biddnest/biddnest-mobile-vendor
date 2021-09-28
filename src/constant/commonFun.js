import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import Snackbar from 'react-native-snackbar';
import {Colors} from './colors';
import {STYLES} from './commonStyle';
import moment from 'moment';

export const resetNavigator = (props, screenName) => {
  props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenName}],
    }),
  );
};

export const CustomAlert = (msg = '') => {
  setTimeout(() => {
    Snackbar.dismiss();
  }, 10000);
  return Snackbar.show({
    text: msg,
    duration: Snackbar.LENGTH_INDEFINITE,
    action: {
      text: 'CLOSE',
      textColor: Colors.btnBG,
      onPress: () => {
        Snackbar.dismiss();
      },
    },
  });
  // return Toast.show(msg, Toast.LONG);
};

export const CustomConsole = (msg) => {
  if (__DEV__) {
    console.log(msg);
  }
};

export const DiffMin = (dt1) => {
  let dif = moment(dt1) - moment();
  dif = Math.round(dif / 1000);
  return dif > 0 ? dif : 0;
};

export const LoadingScreen = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1111,
        ...STYLES.common,
      }}>
      <ActivityIndicator size="large" color={Colors.btnBG} />
    </View>
  );
};

export const ArrayUnique = (array) => {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
};

export const ImageSelection = (type, multiple = false) => {
  let obj = {
    width: 400,
    height: 400,
    cropping: true,
    includeBase64: true,
    multiple: multiple,
    cropperToolbarWidgetColor: Colors.btnBG,
    cropperActiveWidgetColor: Colors.btnBG,
  };
  return new Promise((resolve, reject) => {
    if (type === 'camera') {
      ImagePicker.openCamera(obj)
        .then((response) => {
          resolve('data:image/jpeg;base64,' + response.data);
          reject(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      ImagePicker.openPicker(obj)
        .then((response) => {
          let temp = [];
          if (multiple) {
            response.forEach((item) => {
              temp.push('data:image/jpeg;base64,' + item?.data);
            });
            resolve(temp);
          } else {
            resolve('data:image/jpeg;base64,' + response.data);
          }
          reject(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};
