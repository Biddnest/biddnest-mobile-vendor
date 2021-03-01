import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors, hp, wp} from '../../constant/colors';
import TextInput from '../../components/textInput';
import Button from '../../components/button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from './header';
import CheckBox from '../../components/checkBox';
import LinearGradient from 'react-native-linear-gradient';
import {STYLES} from '../../constant/commonStyle';

const ForgotPassword = (props) => {
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [phoneValidate, setPhoneValidate] = React.useState(undefined);
  const [otpSend, setOtpSend] = React.useState(false);
  const [isAgree, setAgree] = React.useState(true);
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
              disable={otpSend}
              isRight={phoneValidate}
              label={'Phone Number'}
              placeHolder={'Phone Number'}
              keyboard={'decimal-pad'}
              onChange={(text) => setPhoneNumber(text)}
            />
            {(!otpSend && (
              <View style={{alignItems: 'center'}}>
                <Button
                  label={'SEND OTP'}
                  onPress={() => {
                    if (
                      !phoneNumber?.length ||
                      phoneNumber?.length !== 10 ||
                      /\D/.test(phoneNumber)
                    ) {
                      setPhoneValidate(false);
                    } else if (!isAgree) {
                    } else {
                      setPhoneValidate(true);
                      setOtpSend(true);
                    }
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
                      onCodeChanged={(code) => console.log(code)}
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
                  label={'SUBMIT'}
                  onPress={() => props.navigation.navigate('ChangePassword')}
                />
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: wp(3.8),
                  }}>
                  Did not receive OTP?{' '}
                  <Text
                    onPress={() => setOtpSend(false)}
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
