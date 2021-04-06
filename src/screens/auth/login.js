import React, {useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, hp, wp} from '../../constant/colors';
import Header from './header';
import TextInput from '../../components/textInput';
import Button from '../../components/button';
import LinearGradient from 'react-native-linear-gradient';
import {STYLES} from '../../constant/commonStyle';
import {useDispatch} from 'react-redux';
import {signIn} from '../../redux/actions/user';
import {CustomAlert, resetNavigator} from '../../constant/commonFun';

const Login = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: 'dhanashree18@gmail.com',
    password: 'admin123',
  });
  const [error, setError] = useState({});
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
          bounces={false}
          enableOnAndroid={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
          }}>
          <View style={styles.bottomView}>
            <Text style={STYLES.authScreenHeader}>Login</Text>
            <TextInput
              label={'Email/Username'}
              placeHolder={'Email'}
              value={data?.username}
              isRight={error.username}
              keyboard={'email-address'}
              onChange={(text) => handleState('username', text)}
            />
            <TextInput
              label={'Password'}
              placeHolder={'Password'}
              value={data?.password}
              isRight={error.password}
              secureTextEntry={true}
              onChange={(text) => handleState('password', text)}
            />
            <Button
              label={'login'}
              isLoading={isLoading}
              onPress={() => {
                let tempError = {};
                setLoading(true);
                tempError.username = !(
                  !data.username ||
                  data.username.length === 0 ||
                  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    data.username,
                  )
                );
                tempError.password = !!data.password;
                setError(tempError);
                if (
                  Object.values(tempError).findIndex(
                    (item) => item === false,
                  ) === -1
                ) {
                  dispatch(signIn(data))
                    .then((res) => {
                      setLoading(false);
                      if (res.status === 'success') {
                        resetNavigator(props, 'Dashboard');
                      } else {
                        CustomAlert(res.message);
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
              onPress={() => props.navigation.navigate('ForgotPassword')}
              style={{
                color: Colors.darkBlue,
                fontFamily: 'Roboto-Bold',
                fontSize: wp(3.8),
              }}>
              Forgot Password?
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
};

export default Login;

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
    borderColor: 'red',
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
