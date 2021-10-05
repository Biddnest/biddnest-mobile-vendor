import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';

const OrderStatusAwaiting = (props) => {
  return (
    <View style={{marginVertical: hp(3)}}>
      <Text style={styles.rankText}>Awaiting final quote</Text>
    </View>
  );
};

export default OrderStatusAwaiting;

const styles = StyleSheet.create({
  rankText: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.pageBG,
    color: Colors.darkBlue,
    fontFamily: 'Roboto-Regular',
    fontSize: hp(2.2),
    borderRadius: 10,
    overflow: 'hidden',
  },
});
