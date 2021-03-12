import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import Switch from '../../../components/switch';
import FilterButton from '../../../components/filterButton';
import CloseIcon from '../../../components/closeIcon';
import CustomModalAndroid from '../../../components/customModal';
import TwoButton from '../../../components/twoButton';
import FlatButton from '../../../components/flatButton';
import Slider from 'rn-range-slider';
import DropDownAndroid from '../../../components/dropDown';

const PayOutDetails = (props) => {
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'PayOuts'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.inputForm}>
          <View style={[styles.flexBox, {marginTop: 0}]}>
            <Text style={styles.topText}>3rd Feb 2021</Text>
            <Text style={[styles.bottomText, styles.transferView]}>
              TRANSFERRED
            </Text>
          </View>
          <Text style={[styles.bottomText, {width: '100%', marginTop: hp(1)}]}>
            Number of Orders: 2
          </Text>
          <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
            Transaction Id: 12345678987
          </Text>
          <View style={styles.separatorView} />
          <View style={[styles.flexBox, {marginTop: 0}]}>
            <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
              Total Amount
            </Text>
            <Text style={[styles.bottomText, {maxWidth: '35%'}]}>9000</Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
              Commission(10%)
            </Text>
            <Text style={[styles.bottomText, {maxWidth: '35%'}]}>900</Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={[styles.bottomText, {maxWidth: '65%'}]}>Taxes</Text>
            <Text style={[styles.bottomText, {maxWidth: '35%'}]}>50</Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
              Other Adjustments
            </Text>
            <Text style={[styles.bottomText, {maxWidth: '35%'}]}>50</Text>
          </View>
          <View style={styles.separatorView} />
          <LinearGradient
            colors={[Colors.darkBlue, '#462F97']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              borderRadius: 10,
              height: hp(6.5),
              backgroundColor: Colors.darkBlue,
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: wp(3),
              marginVertical: hp(0.5),
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: wp(4),
                fontFamily: 'Roboto-Regular',
              }}>
              Grand Total
            </Text>
            <Text
              style={{
                fontSize: wp(5.5),
                fontFamily: 'Roboto-Bold',
                color: Colors.white,
              }}>
              Rs. 10,000
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default PayOutDetails;

const styles = StyleSheet.create({
  inputForm: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: wp(5),
  },
  topText: {
    fontFamily: 'Roboto-Bold',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  bottomText: {
    fontFamily: 'Roboto-Light',
    color: Colors.inputTextColor,
    fontSize: wp(3.8),
  },
  transferView: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: Colors.inputTextColor,
    borderRadius: 5,
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: hp(1),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginVertical: hp(2),
  },
});
