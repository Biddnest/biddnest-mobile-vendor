import React from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {Colors, hp, wp} from '../constant/colors';
import Ripple from 'react-native-material-ripple';

const Button = (props) => {
  return (
    <Ripple
      rippleColor={Colors.white}
      onPress={() => {
        if (!props.isLoading) {
          props.onPress();
        }
      }}
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : Colors.btnBG,
        borderColor: Colors.btnBG,
        borderWidth: props.backgroundColor ? 2 : 0,
        height: hp(6),
        width: props.width ? props.width : wp(85),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: props.spaceTop ? props.spaceTop : hp(2.5),
        marginBottom: props.spaceBottom ? props.spaceBottom : hp(2.5),
        borderRadius: hp(1),
      }}>
      {(props.isLoading && (
        <ActivityIndicator size="small" color={Colors.white} />
      )) || (
        <Text
          style={{
            fontSize: hp(2),
            color: props.backgroundColor ? Colors.btnBG : Colors.white,
            fontFamily: 'Roboto-Bold',
            textTransform: 'uppercase',
          }}>
          {props.label}
        </Text>
      )}
    </Ripple>
  );
};

export default Button;
