import React from 'react';
import {Text, View} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import {DiffMin} from '../../../constant/commonFun';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const OrderStatusPending = (props) => {
  const {orderDetails} = props;
  const children = ({remainingTime}) => {
    return (
      <Text
        style={{
          color: Colors.darkBlue,
          fontSize: wp(5),
          fontFamily: 'Gilroy-Bold',
        }}>
        {new Date(remainingTime * 1000).toISOString().substr(11, 8)}
      </Text>
    );
  };
  return (
    <View style={{backgroundColor: Colors.white, marginBottom: hp(3)}}>
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
            width: wp(40),
            height: wp(40),
            alignSelf: 'center',
            marginTop: hp(2),
            marginBottom: hp(1.5),
          }}>
          <CountdownCircleTimer
            key={new Date()}
            size={hp(21)}
            isPlaying
            duration={300}
            initialRemainingTime={DiffMin(orderDetails?.bid_result_at)}
            children={children}
            colors={[[Colors.darkBlue, 0.4]]}
          />
        </View>
        <Text style={[STYLES.inputTextLabel, {textAlign: 'center'}]}>
          Time at which the Bid ends
        </Text>
      </View>
    </View>
  );
};

export default OrderStatusPending;
