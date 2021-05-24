import React, {useState} from 'react';
import {Pressable, View, Text, StyleSheet, Linking} from 'react-native';
import {boxShadow, Colors, wp, hp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BackArrow from '../assets/svg/back_arrow.svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomModalAndroid from './customModal';
import CloseIcon from './closeIcon';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const SimpleHeader = (props) => {
  const configData =
    useSelector((state) => state.Login?.configData?.contact_us?.details) || '';
  let data = JSON.parse(configData.toString());
  const [openModal, setOpenModal] = useState(false);
  return (
    <View
      style={[
        boxShadow,
        {
          height: hp(7.5),
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
        <BackArrow width={wp(20)} height={hp(20)} />
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
                size={hp(2.7)}
              />
            </Pressable>
          )}
          <Pressable
            style={{...STYLES.common, width: wp(13)}}
            onPress={() => setOpenModal(true)}>
            <SimpleLineIcons
              name={'earphones-alt'}
              color={Colors.darkBlue}
              size={hp(2.7)}
            />
          </Pressable>
        </View>
      ) : null}
      <CustomModalAndroid
        visible={openModal}
        title={'Support'}
        onPress={() => setOpenModal(false)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginVertical: hp(3),
            width: wp(100),
          }}>
          <View style={styles.common}>
            <Pressable
              style={[STYLES.selectionView, STYLES.common]}
              onPress={() => {
                setOpenModal(false);
                data?.contact_no?.length > 0 &&
                  Linking.openURL(`tel:${data?.contact_no[0]}`);
              }}>
              <Ionicons name={'call'} color={Colors.darkBlue} size={hp(6)} />
            </Pressable>
            <Text style={STYLES.selectionText}>Call</Text>
          </View>
          <View style={styles.common}>
            <Pressable
              onPress={() => {
                setOpenModal(false);
                props.navigation.navigate('ChatRedirect');
              }}
              style={[STYLES.selectionView, STYLES.common]}>
              <Entypo name={'chat'} color={Colors.darkBlue} size={hp(6)} />
            </Pressable>
            <Text style={STYLES.selectionText}>Chat</Text>
          </View>
        </View>
      </CustomModalAndroid>
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
