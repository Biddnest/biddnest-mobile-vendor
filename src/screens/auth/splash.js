import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import {CustomAlert, resetNavigator} from '../../constant/commonFun';
import {Colors, hp, wp} from '../../constant/colors';
import {initialConfig} from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import {STYLES} from '../../constant/commonStyle';
import AsyncStorage from '@react-native-community/async-storage';
import {CustomTabs} from 'react-native-custom-tabs';
import {isAndroid} from 'react-native-calendars/src/expandableCalendar/commons';
import * as Sentry from '@sentry/react-native';
import DeviceInfo from 'react-native-device-info';

const Splash = (props) => {
  const dispatch = useDispatch();
  const notificationData =
    useSelector(
      (state) => state.Login?.configData?.enums?.notification?.type,
    ) || {};
  const notificationValue = useSelector((state) => state.Login?.notification);
  const [isLoading, setLoading] = useState(false);
  const userData = useSelector((state) => state.Login?.loginData);
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.init('42d0f367-a40c-41e2-a9e3-95d62e38ad99', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    Sentry.init({
      dsn: 'https://624a601b3d6b4e90a747c49138e3aa8a@o939247.ingest.sentry.io/5899841',
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    OneSignal.setSubscription(notificationValue);
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
    console.log('Data: ', openResult);
    let temp = openResult?.notification?.payload?.additionalData || {};
    if (temp?.type === notificationData?.booking) {
      props.navigation.navigate('OrderDetails', {
        orderData: {public_booking_id: temp?.public_booking_id},
      });
    } else if (temp?.type === notificationData?.link) {
      if (isAndroid) {
        CustomTabs.openURL(temp?.url, {
          toolbarColor: Colors.darkBlue,
        })
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      } else {
        Linking.openURL(temp?.url);
      }
    }
  }
  function onIds(device) {
    if (device && device.userId) {
      AsyncStorage.setItem('oneSignalData', JSON.stringify(device));
    }
    console.log('Device info: ', device);
  }
  const callServiceAPI = () => {
    setLoading(true);
    dispatch(initialConfig())
      .then((res) => {
        setLoading(false);
        if (res.status === 'success') {
          if (res?.data?.config?.service_live) {
            if (
              res?.data?.config?.app?.version_code <=
              DeviceInfo.getBuildNumber()
            ) {
              if (userData?.token) {
                resetNavigator(props, 'Dashboard');
              } else {
                resetNavigator(props, 'Login');
              }
            } else {
              Alert.alert(
                'Update Available',
                'App must be updated for use new features',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      Linking.openURL(
                        isAndroid
                          ? 'https://play.google.com/store/apps'
                          : 'https://www.apple.com/in/store',
                      );
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          } else {
            Alert.alert(
              'Please try again later',
              res?.data?.config?.message,
              [
                {
                  text: 'OK',
                },
              ],
              {cancelable: false},
            );
          }
        }
      })
      .catch((err) => {
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
      source={require('../../assets/images/blue_back.png')}
      style={{height: '100%', width: '100%', ...STYLES.common}}
      resizeMode={'stretch'}>
      {!!isLoading && (
        <View style={{position: 'absolute', bottom: hp(20), zIndex: 111}}>
          <ActivityIndicator size="large" color={Colors.btnBG} />
        </View>
      )}
      <Image
        source={require('../../assets/images/splash_logo.png')}
        style={{height: hp(50), width: wp(70)}}
        resizeMode={'contain'}
      />
    </ImageBackground>
  );
};

export default Splash;
