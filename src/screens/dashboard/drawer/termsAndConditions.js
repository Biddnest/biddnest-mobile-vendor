import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import {APICall} from '../../../redux/actions/user';
import {STORE} from '../../../redux';
import {decode} from 'html-entities';
import RenderHtml from 'react-native-render-html';
import {
  CustomAlert,
  CustomConsole,
  LoadingScreen,
} from '../../../constant/commonFun';

const TermsAndConditions = (props) => {
  const [termsText, setTermsText] = useState('');
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let obj = {
      url: 'page/vendor-terms-and-conditions',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          // let temp = decode(res?.data?.data?.page?.content, {level: 'html5'});
          setTermsText(res?.data?.data?.page.content);
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomConsole(err);
      });
  }, []);
  console.log({termsText});
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Terms and Conditions'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
        right={true}
        onRightPress={() => {}}
      />
      {isLoading && <LoadingScreen />}
      <ScrollView
        style={{flex: 1, marginBottom: wp(5)}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.inputForm}>
          {/* <Text style={styles.bottomText}>{termsText}</Text> */}
          <RenderHtml source={{html: termsText}} contentWidth={250} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({
  inputForm: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: wp(5),
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: hp(1.9),
  },
});
