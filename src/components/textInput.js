import React from 'react';
import {Input, Text} from 'react-native-elements';
import {hp, Colors, wp} from '../constant/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../constant/commonStyle';
import {View} from 'react-native';

const TextInput = (props) => {
  return (
    <Input
      disabled={props.disable || false}
      keyboardType={props.keyboard || 'default'}
      placeholder={props.placeHolder}
      multiline={!!props.numberOfLines}
      numberOfLines={props.numberOfLines || 1}
      secureTextEntry={props.secureTextEntry || false}
      value={props.value}
      onFocus={props.onFocus}
      label={props.label}
      rightIcon={() => {
        if (props.isRight === true) {
          return (
            <Ionicons
              name="checkmark-sharp"
              size={25}
              color={Colors.lightGreen}
            />
          );
        } else if (props.isRight === false) {
          return <Ionicons name="close-outline" size={25} color={Colors.red} />;
        }
      }}
      onChangeText={props.onChange}
      inputContainerStyle={{
        borderWidth: 2,
        paddingHorizontal: 15,
        borderRadius: 10,
        height: props.numberOfLines
          ? props.height
            ? props.height
            : hp(12)
          : hp(6.5),
        marginTop: hp(1),
        borderColor: props.isRight === false ? Colors.red : Colors.silver,
        backgroundColor: Colors.white,
        borderBottomWidth: 2,
        alignItems: 'center',
      }}
      labelStyle={STYLES.inputTextLabel}
      inputStyle={[
        STYLES.inputTextStyle,
        props.inputStyle,
        {textAlignVertical: props.numberOfLines ? 'top' : 'center'},
      ]}
    />
  );
};

export default TextInput;
