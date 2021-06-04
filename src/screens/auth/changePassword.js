import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, hp, wp} from '../../constant/colors';
import Header from './header';
import TextInput from '../../components/textInput';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {STYLES} from '../../constant/commonStyle';
import {CustomAlert, resetNavigator} from '../../constant/commonFun';
import {STORE} from '../../redux';
import {APICall} from '../../redux/actions/user';

const ChangePassword = (props) => {
  const details = props?.route?.params;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = React.useState({
    phone: details?.phone,
    otp: details?.otp,
    new_password: '',
    confirm_password: '',
  });
  const [error, setError] = React.useState({
    new_password: undefined,
    confirm_password: undefined,
  });
  const handleState = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  return (
    <View style={[styles.container, {...styles.common}]}>
      <Header />
      <LinearGradient
        colors={[Colors.darkBlue, '#333092']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: hp(70),
          width: wp(100),
        }}>
        <KeyboardAwareScrollView
          enableOnAndroid={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={styles.bottomView}>
            <Text style={STYLES.authScreenHeader}>Change Password</Text>
            <TextInput
              label={'New Password *'}
              value={data?.new_password}
              placeHolder={'New Password'}
              isRight={error.new_password}
              secureTextEntry={true}
              onChange={(text) => handleState('new_password', text)}
            />
            <TextInput
              label={'Confirm New Password *'}
              value={data?.confirm_password}
              placeHolder={'Confirm New Password'}
              isRight={error.confirm_password}
              secureTextEntry={true}
              onChange={(text) => handleState('confirm_password', text)}
            />
            <Button
              isLoading={isLoading}
              label={'submit'}
              onPress={() => {
                let tempError = {};
                setLoading(true);
                tempError.new_password = !(
                  !data.new_password || data.new_password.length === 0
                );
                tempError.confirm_password = !(
                  !data.confirm_password || data.confirm_password.length === 0
                );
                setError(tempError);
                if (
                  Object.values(tempError).findIndex(
                    (item) => item === false,
                  ) === -1
                ) {
                  let obj = {
                    url: 'auth/reset-password',
                    method: 'post',
                    headers: {
                      Authorization:
                        'Bearer ' + STORE.getState().Login?.loginData?.token,
                    },
                    data: data,
                  };
                  APICall(obj)
                    .then((res) => {
                      setLoading(false);
                      if (res?.data?.status === 'success') {
                        CustomAlert('Updated Password Successfully');
                        resetNavigator(props, 'Login');
                      } else {
                        CustomAlert(res?.data?.message);
                      }
                    })
                    .catch((err) => {
                      setLoading(false);
                      CustomAlert(err.data.message);
                    });
                } else {
                  setLoading(false);
                }
              }}
            />
            <Text
              onPress={() => props.navigation.navigate('Login')}
              style={{
                color: Colors.darkBlue,
                fontFamily: 'Roboto-Bold',
                fontSize: wp(3.8),
              }}>
              Login Now
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    height: hp(6.5),
    marginTop: hp(1),
    borderColor: Colors.silver,
    color: Colors.textLabelColor,
    fontSize: wp(6),
  },
  bottomView: {
    height: hp(70),
    backgroundColor: Colors.white,
    borderTopLeftRadius: wp(7),
    borderTopRightRadius: wp(7),
    overflow: 'hidden',
    width: wp(100),
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
    alignItems: 'center',
  },
  customDropDown: {
    backgroundColor: Colors.textBG,
  },
});
