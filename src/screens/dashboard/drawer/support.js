import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';

const Support = (props) => {
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Support'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
        right={true}
        onRightPress={() => {}}
      />
      <View style={{flex: 1}}>
        <View style={styles.inputForm}>
          <View style={styles.flexBox}>
            <View style={{height: wp(10), width: wp(10)}}>
              <Image
                source={require('../../../assets/images/finish_map_pin.png')}
                style={{height: '60%', width: '60%'}}
                resizeMode={'contain'}
              />
            </View>
            <Text style={styles.bottomText}>
              ABC Studio, ABC Street, KBC, Chennai 4904390
            </Text>
          </View>
          <View style={[styles.flexBox, {marginTop: hp(2)}]}>
            <View style={{height: wp(10), width: wp(10)}}>
              <Image
                source={require('../../../assets/images/email.png')}
                style={{height: '60%', width: '60%'}}
                resizeMode={'contain'}
              />
            </View>
            <Text style={styles.bottomText}>hello@gmail.com</Text>
          </View>
          <View style={[styles.flexBox, {marginTop: hp(2)}]}>
            <View style={{height: wp(10), width: wp(10)}}>
              <Ionicons
                name={'call-outline'}
                color={Colors.darkBlue}
                size={wp(6)}
              />
            </View>
            <Text style={styles.bottomText}>+91 - 8989898989</Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label={'raise a request'}
            width={wp(43)}
            spaceBottom={wp(0.1)}
            backgroundColor={Colors.white}
            onPress={() => props.navigation.navigate('RaiseRequest')}
          />
          <Button
            label={'faqs'}
            width={wp(43)}
            spaceBottom={wp(0.1)}
            backgroundColor={Colors.white}
            onPress={() => props.navigation.navigate('FAQS')}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button label={'call us'} width={wp(43)} />
          <Button label={'email us'} width={wp(43)} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Support;

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
    fontSize: wp(3.6),
    width: wp(71),
  },
  flexBox: {
    flexDirection: 'row',
    width: wp(10),
  },
  btnWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
});
