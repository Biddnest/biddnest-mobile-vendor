import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {boxShadow, Colors, wp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BackArrow from '../assets/svg/back_arrow.svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SimpleHeader = (props) => {
  return (
    <View
      style={[
        boxShadow,
        {
          height: 55,
          backgroundColor: Colors.white,
          flexDirection: 'row',
        },
      ]}>
      <Pressable
        style={{
          width: wp(13),
          height: '100%',
          ...styles.common,
        }}
        onPress={() => {
          props.onBack();
        }}>
        <BackArrow width={100} height={100} />
      </Pressable>
      <View
        style={{
          width: props.right ? (props.isBookmark ? wp(66) : wp(74)) : wp(87),
          height: '100%',
          ...styles.common,
        }}>
        <Text
          style={{
            fontFamily: 'Gilroy-Bold',
            fontSize: wp(5),
            color: Colors.inputTextColor,
            marginRight: props.right ? wp(0) : wp(13),
            textTransform: 'capitalize',
          }}>
          {props.headerText}
        </Text>
      </View>
      {props.right ? (
        <View
          style={[STYLES.common, {alignItems: 'center', flexDirection: 'row'}]}>
          {props.isBookmark && (
            <Pressable
              style={{...STYLES.common, width: wp(8)}}
              onPress={props.onheartPress}>
              <FontAwesome
                name={props.heart ? 'heart' : 'heart-o'}
                color={Colors.darkBlue}
                size={20}
              />
            </Pressable>
          )}
          <Pressable
            style={{...STYLES.common, width: wp(13)}}
            onPress={() => props.navigation.navigate('ChatRedirect')}>
            <SimpleLineIcons
              name={'earphones-alt'}
              color={Colors.darkBlue}
              size={20}
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default SimpleHeader;

const styles = StyleSheet.create({
  common: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
