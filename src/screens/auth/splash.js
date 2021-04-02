import React, {useEffect, useState} from 'react';
import {View, ImageBackground, StyleSheet, Image, ActivityIndicator} from 'react-native';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import {CustomAlert, resetNavigator} from '../../constant/commonFun';
import {Colors, hp, wp} from '../../constant/colors';
import {initialConfig} from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {STYLES} from '../../constant/commonStyle';

const Splash = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const userData = useSelector((state) => state.Login?.loginData);
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);

    OneSignal.init('42d0f367-a40c-41e2-a9e3-95d62e38ad99', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
  }, []);
  function myiOSPromptCallback(permission) {
    // do something with permission value
  }
  function onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  function onIds(device) {
    console.log('Device info: ', device);
  }
  const callServiceAPI = () => {
    setLoading(true);
    dispatch(initialConfig())
      .then((res) => {
        setLoading(false);
        if (res.status === 'success') {
          if (userData?.token) {
            resetNavigator(props, 'Dashboard');
          } else {
            resetNavigator(props, 'Login');
          }
        }
      })
      .catch((err) => {
        console.log('call', err);
        checkConnectivity();
        setLoading(false);
        err?.data && CustomAlert(err?.data?.message);
      });
  };
  useEffect(() => {
    checkConnectivity();
    callServiceAPI();
  }, []);
  const checkConnectivity = () => {
    NetInfo.addEventListener((state) => {
      if (state.isConnected === false) {
        CustomAlert('Check your internet connectivity');
      }
    });
  };
  return (
    <ImageBackground
      source={require('../../assets/images/logo_background.png')}
      style={{height: '100%', width: '100%', ...STYLES.common}}
      resizeMode={'stretch'}>
      {!!isLoading && (
        <View style={{position: 'absolute', bottom: hp(20), zIndex: 111}}>
          <ActivityIndicator size="large" color={Colors.btnBG} />
        </View>
      )}
      <Image
        source={require('../../assets/images/logo.png')}
        style={{height: hp(50), width: wp(80)}}
        resizeMode={'contain'}
      />
    </ImageBackground>
  );
};

export default Splash;
