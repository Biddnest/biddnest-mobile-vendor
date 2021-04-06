import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import {STYLES} from '../../../constant/commonStyle';
import CloseIcon from '../../../components/closeIcon';
import CustomModalAndroid from '../../../components/customModal';
import {useSelector} from 'react-redux';
import moment from 'moment';

const PayOutDetails = (props) => {
  const {data} = props;
  const statusData =
    useSelector((state) => state.Login?.configData?.enums?.payout?.status) ||
    {};
  let total_bookings = data?.meta && JSON.parse(data?.meta?.toString());

  const renderStatus = (item) => {
    if (statusData?.scheduled === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.btnBG}]}>
          scheduled
        </Text>
      );
    } else if (statusData?.processing === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.btnBG}]}>
          processing
        </Text>
      );
    } else if (statusData?.transferred === item?.status) {
      return (
        <Text
          style={[styles.transferView, {backgroundColor: Colors.lightGreen}]}>
          transferred
        </Text>
      );
    } else if (statusData?.suspended === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.red}]}>
          suspended
        </Text>
      );
    } else if (statusData?.cancelled === item?.status) {
      return (
        <Text style={[styles.transferView, {backgroundColor: Colors.red}]}>
          cancelled
        </Text>
      );
    }
    return null;
  };
  return (
    <CustomModalAndroid
      visible={props.visible}
      onPress={() => {
        props.onCloseIcon();
      }}>
      <Text style={STYLES.modalHeaderText}>PAYOUT DETAILS</Text>
      <CloseIcon
        onPress={() => {
          props.onCloseIcon();
        }}
      />
      <View
        style={{
          flex: 1,
          width: '100%',
          marginBottom: hp(2),
        }}>
        <View style={styles.inputForm}>
          <View style={[styles.flexBox, {marginTop: 0}]}>
            <Text style={styles.topText}>
              {moment(data?.dispatch_at).format('Do MMM YYYY')}
            </Text>
            {renderStatus(data)}
          </View>
          <Text style={[styles.bottomText, {width: '100%', marginTop: hp(1)}]}>
            Number of Orders: {total_bookings?.total_bookings}
          </Text>
          <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
            Transaction Id: {data?.bank_transaction_id}
          </Text>
          <View style={styles.separatorView} />
          <View style={[styles.flexBox, {marginTop: 0}]}>
            <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
              Total Amount
            </Text>
            <Text style={[styles.bottomText, {maxWidth: '35%'}]}>
              Rs. {data?.amount}
            </Text>
          </View>
          <View style={styles.flexBox}>
            <Text style={[styles.bottomText, {maxWidth: '65%'}]}>
              Commission(10%)
            </Text>
            <Text style={[styles.bottomText, {maxWidth: '35%'}]}>
              Rs. {data?.commission}
            </Text>
          </View>
          {/*<View style={styles.flexBox}>*/}
          {/*  <Text style={[styles.bottomText, {maxWidth: '65%'}]}>Taxes</Text>*/}
          {/*  <Text style={[styles.bottomText, {maxWidth: '35%'}]}>50</Text>*/}
          {/*</View>*/}
          {/*<View style={styles.flexBox}>*/}
          {/*  <Text style={[styles.bottomText, {maxWidth: '65%'}]}>*/}
          {/*    Other Adjustments*/}
          {/*  </Text>*/}
          {/*  <Text style={[styles.bottomText, {maxWidth: '35%'}]}>50</Text>*/}
          {/*</View>*/}
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
              Rs. {data?.final_payout}
            </Text>
          </LinearGradient>
        </View>
      </View>
    </CustomModalAndroid>
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
    // borderWidth: 0.5,
    // borderColor: Colors.inputTextColor,
    borderRadius: 5,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: wp(3.8),
    maxWidth: '35%',
    textTransform: 'uppercase',
    color: Colors.white,
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
