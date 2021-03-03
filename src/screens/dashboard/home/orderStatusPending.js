import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';

const OrderStatusPending = (props) => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginVertical: hp(3),
        }}>
        <Text
          style={{
            fontFamily: 'Roboto-Italic',
            fontSize: wp(3.8),
            color: Colors.darkBlue,
            marginHorizontal: wp(10),
            textAlign: 'center',
          }}>
          You’ll get status graph once the time is up
        </Text>
      </View>
      <View style={[STYLES.inputForm, {borderRadius: hp(1), marginTop: 0}]}>
        <Image
          source={require('../../../assets/images/timer_clock.png')}
          style={{
            width: wp(30),
            height: wp(30),
            alignSelf: 'center',
            marginTop: hp(2),
            marginBottom: hp(1.5),
          }}
          resizeMode={'contain'}
        />
        <Text
          style={{
            color: Colors.darkBlue,
            position: 'absolute',
            top: wp(30),
            fontFamily: 'Roboto-Medium',
            fontSize: wp(3.8),
            textAlign: 'center',
            alignSelf: 'center',
          }}>
          11:00
        </Text>
        <Text style={[STYLES.inputTextLabel, {textAlign: 'center'}]}>
          Time at which the Bid ends
        </Text>
      </View>
    </View>
  );
};

export default OrderStatusPending;

const styles = StyleSheet.create({});
