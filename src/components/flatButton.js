import React from 'react';
import {Colors, hp, wp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import {ActivityIndicator, Text} from 'react-native';
import Ripple from 'react-native-material-ripple';

const FlatButton = (props) => {
  return (
    <Ripple
      rippleColor={Colors.white}
      onPress={() => !props.isLoading && props.onPress()}
      style={{
        height: hp(7),
        backgroundColor: Colors.btnBG,
        width: wp(100),
        marginTop: hp(2),
        ...STYLES.common,
      }}>
      {(props.isLoading && (
        <ActivityIndicator size="small" color={Colors.white} />
      )) || (
        <Text
          style={{
            fontFamily: 'Roboto-Bold',
            color: Colors.white,
            fontSize: hp(2.8),
            textTransform: 'uppercase',
          }}>
          {props.label}
        </Text>
      )}
    </Ripple>
  );
};

export default FlatButton;
