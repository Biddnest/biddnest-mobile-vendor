import React from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import {Colors, wp, hp} from '../constant/colors';

const Switch = (props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          color: !props.switchValue ? '#3B4B58' : '#99A0A5',
          fontSize: hp(1.9),
        }}>
        {props.left}
      </Text>
      <Pressable
        onPress={props.onChange}
        style={{
          height: hp(3),
          width: hp(6),
          backgroundColor: props.switchValue ? Colors.darkBlue : '#98A0A6',
          marginHorizontal: 5,
          borderRadius: hp(0.5),
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            height: hp(1.8),
            width: hp(2.2),
            backgroundColor: Colors.white,
            marginHorizontal: 3,
            borderRadius: hp(0.3),
            transform: [
              {
                translateX: props.switchValue ? hp(2.8) : hp(0.2),
              },
            ],
          }}
        />
      </Pressable>
      <Text
        style={{
          fontFamily: 'Roboto-Regular',
          color: props.switchValue ? '#3B4B58' : '#99A0A5',
          fontSize: hp(1.9),
        }}>
        {props.right}
      </Text>
    </View>
  );
};

export default Switch;
