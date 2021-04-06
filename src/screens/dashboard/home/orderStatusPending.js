import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import TimerClock from '../../../assets/svg/timer_clock.svg';
import CountDown from '../../../components/countDown';
import {DiffMin} from '../../../constant/commonFun';

const OrderStatusPending = (props) => {
  const {orderDetails} = props;
  console.log('===========', orderDetails);
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
        <View
          style={{
            width: wp(30),
            height: wp(30),
            alignSelf: 'center',
            marginTop: hp(2),
            marginBottom: hp(1.5),
          }}>
          <TimerClock width={wp(30)} height={wp(30)} />
        </View>
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
          <CountDown
            until={
              (DiffMin(orderDetails?.bid_result_at) > 0 &&
                DiffMin(orderDetails?.bid_result_at) * 60) ||
              0
            }
            onFinish={() => {}}
            size={18}
            digitStyle={{height: '100%'}}
            digitTxtStyle={[STYLES.participatedText, {fontSize: wp(3.5)}]}
            separatorStyle={{color: '#000'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{h: null, m: null, s: null}}
            showSeparator
          />
        </Text>
        <Text style={[STYLES.inputTextLabel, {textAlign: 'center'}]}>
          Time at which the Bid ends
        </Text>
      </View>
    </View>
  );
};

export default OrderStatusPending;
