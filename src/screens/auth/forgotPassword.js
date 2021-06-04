import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, hp, wp} from '../../constant/colors';
import TextInput from '../../components/textInput';
import Button from '../../components/button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from './header';
import LinearGradient from 'react-native-linear-gradient';
import {STYLES} from '../../constant/commonStyle';
import {CustomAlert} from '../../constant/commonFun';
import {sendOTP, verifyOTP} from '../../redux/actions/user';

const ForgotPassword = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [phone, setPhone] = useState();
  const [otp, setOTP] = React.useState();
  const [phoneValidate, setPhoneValidate] = useState(undefined);
  const [otpSend, setOtpSend] = useState(false);
  const [isAgree, setAgree] = useState(true);
  const [otpResponse, setOtpResponse] = useState({});

  const sendOTPFun = () => {
    setLoading(true);
    if (!phone?.length || phone?.length !== 10 || /\D/.test(phone)) {
      setPhoneValidate(false);
      setLoading(false);
    } else if (!isAgree) {
      setPhoneValidate(true);
      setLoading(false);
      CustomAlert('Agree to the Terms & Conditions');
    } else {
      setPhoneValidate(true);
      // Send OTP
      sendOTP({phone})
        .then((res) => {
          setLoading(false);
          if (res.status === 'success') {
            CustomAlert(res.message + res.data.otp);
            setOtpResponse(res.data);
            setOtpSend(true);
          } else {
            CustomAlert(res.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          CustomAlert(err?.data?.message);
        });
    }
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
            <Text style={STYLES.authScreenHeader}>Forgot Password</Text>
            <TextInput
              isRight={phoneValidate}
              label={'Phone Number *'}
              placeHolder={'Phone Number'}
              keyboard={'decimal-pad'}
              onChange={(text) => {
                setOtpSend(false);
                setPhone(text);
              }}
            />
            {(!otpSend && (
              <View style={{alignItems: 'center'}}>
                <Button
                  isLoading={isLoading}
                  label={'SEND OTP'}
                  onPress={() => {
                    sendOTPFun();
                  }}
                />
              </View>
            )) || (
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: wp(85),
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Bold',
                      color: Colors.textLabelColor,
                      fontSize: wp(4),
                    }}>
                    Verify OTP
                  </Text>
                  <View
                    style={{
                      height: hp(9),
                    }}>
                    <OTPInputView
                      pinCount={6}
                      onCodeChanged={(code) => setOTP(code)}
                      codeInputFieldStyle={styles.textInput}
                      codeInputHighlightStyle={[
                        styles.textInput,
                        {borderColor: '#243C99'},
                      ]}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: wp(3.8),
                    marginTop: hp(1),
                  }}>
                  Waiting for OTP
                </Text>
                <Button
                  isLoading={isLoading}
                  label={'SUBMIT'}
                  onPress={() => {
                    // Verify OTP
                    setLoading(true);
                    verifyOTP({
                      phone,
                      otp,
                    })
                      .then((res) => {
                        setLoading(false);
                        if (res.status === 'success') {
                          props.navigation.navigate('ChangePasswordAuth', {
                            phone,
                            otp,
                          });
                        } else {
                          CustomAlert(res.message);
                        }
                      })
                      .catch((err) => {
                        setLoading(false);
                        CustomAlert(err?.data?.message);
                      });
                  }}
                />
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: wp(3.8),
                  }}>
                  Did not receive OTP?{' '}
                  <Text
                    onPress={() => sendOTPFun()}
                    style={{
                      fontFamily: 'Roboto-Bold',
                      color: Colors.darkBlue,
                    }}>
                    Resend
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </LinearGradient>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
  common: {
    alignItems: 'center',
    justifyContent: 'center',
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
  checkBoxView: {
    height: 20,
    width: 20,
    borderWidth: 2,
    borderRadius: 3,
    marginRight: wp(2),
  },
});
