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
            onPress={() => setOpenModal(true)}>
            <SimpleLineIcons
              name={'earphones-alt'}
              color={Colors.darkBlue}
              size={20}
            />
          </Pressable>
        </View>
      ) : null}
      <CustomModalAndroid
        visible={openModal}
        onPress={() => setOpenModal(false)}>
        <Text style={STYLES.modalHeaderText}>Support</Text>
        <CloseIcon
          onPress={() => {
            setOpenModal(false);
          }}
        />
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
              {/*<MySelf width={60} height={60} />*/}
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
              {/*<Friends width={60} height={60} />*/}
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
