import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  RefreshControl,
  Pressable,
  FlatList,
  ScrollView,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';
import FinishMapPin from '../../../assets/svg/finish_map_pin.svg';
import Email from '../../../assets/svg/email.svg';
import {useSelector} from 'react-redux';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert, CustomConsole} from '../../../constant/commonFun';
import {STYLES} from '../../../constant/commonStyle';
import moment from 'moment';

const Support = (props) => {
  const [recentTicket, setRecentTicket] = useState([]);
  const configData =
    useSelector((state) => state.Login?.configData?.contact_us?.details) || '';
  const [requestCallBackLoading, setRequestCallBackLoading] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const ticketStatus =
    useSelector((state) => state.Login?.configData?.enums?.ticket?.status) ||
    {};
  let data = JSON.parse(configData.toString());
  useEffect(() => {
    fetchTicket();
  }, []);
  const fetchTicket = () => {
    let obj = {
      url: 'tickets',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          setRecentTicket(res?.data?.data?.ticket);
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomConsole(err);
      });
  };
  const renderItem = ({item, index}) => {
    let status = '';
    console.log(status, ticketStatus);
    Object.values(ticketStatus).forEach((i, ind) => {
      if (i === item.status) {
        status = Object.keys(ticketStatus)[ind];
      }
    });
    return (
      <Pressable
        key={index}
        onPress={() =>
          props.navigation.navigate('SingleTicket', {
            ticket: {id: item?.id},
          })
        }>
        {item?.meta && JSON.parse(item?.meta?.toString())?.public_booking_id && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...styles.locationText,
                marginTop: 0,
                fontSize: wp(3.8),
                fontFamily: 'Roboto-Medium',
                width: '30%',
              }}>
              ORDER ID
            </Text>
            <View
              style={{
                height: hp(3.5),
                ...STYLES.common,
              }}>
              <Text
                style={{
                  color: Colors.inputTextColor,
                  fontSize: wp(3.8),
                  fontFamily: 'Gilroy-SemiBold',
                  textTransform: 'uppercase',
                }}>
                {item?.meta &&
                  JSON.parse(item?.meta?.toString())?.public_booking_id}
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            marginTop: hp(0.5),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              ...styles.locationText,
              marginTop: 0,
              fontSize: wp(3.8),
              fontFamily: 'Roboto-Medium',
              width: '70%',
            }}>
            {item?.heading}
            {/*<Text*/}
            {/*  style={{*/}
            {/*    fontFamily: 'Roboto-Bold',*/}
            {/*  }}>*/}
            {/*  #123456*/}
            {/*</Text>*/}
          </Text>
          <View
            style={{
              backgroundColor:
                ticketStatus?.open === item?.status
                  ? Colors.btnBG
                  : ticketStatus?.resolved === item?.status
                  ? Colors.lightGreen
                  : Colors.error,
              height: hp(3.5),
              borderRadius: hp(2),
              paddingHorizontal: wp(3),
              paddingVertical: hp(1),
              ...STYLES.common,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontSize: wp(3.8),
                fontFamily: 'Gilroy-SemiBold',
                textTransform: 'capitalize',
              }}>
              {status}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: hp(1),
          }}>
          <Text
            style={[
              styles.locationText,
              {
                fontFamily: 'Roboto-Light',
                fontSize: wp(3.8),
              },
            ]}>
            {item?.desc}
          </Text>
        </View>
        <Text
          style={{
            ...styles.locationText,
            marginTop: 0,
            fontFamily: 'Roboto-Light',
            fontSize: wp(3.8),
            textAlign: 'right',
          }}>
          {moment(item?.created_at).format('D MMM')}
        </Text>
      </Pressable>
    );
  };

  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Support'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
        right={true}
        onRightPress={() => {}}
      />
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={fetchTicket} />
          }
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.inputForm}>
            <View style={styles.flexBox}>
              <View style={{height: wp(10), width: wp(10)}}>
                <FinishMapPin width={'60%'} height={'60%'} />
              </View>
              <Text style={styles.bottomText}>{data?.address}</Text>
            </View>
            <View style={[styles.flexBox, {marginTop: hp(2)}]}>
              <View style={{height: wp(10), width: wp(10)}}>
                <Email width={'60%'} height={'60%'} />
              </View>
              <Text style={styles.bottomText}>
                {data?.email_id?.join(', ')}
              </Text>
            </View>
            <View style={[styles.flexBox, {marginTop: hp(2)}]}>
              <View style={{height: wp(10), width: wp(10)}}>
                <Ionicons
                  name={'call-outline'}
                  color={Colors.darkBlue}
                  size={wp(6)}
                />
              </View>
              <Text style={styles.bottomText}>
                {data?.contact_no?.join(', ')}
              </Text>
            </View>
          </View>

          {recentTicket.length > 0 && (
            // recentTicket?.status > 4 &&
            // recentTicket?.status < 8 &&
            <View style={styles.inputForm}>
              <Text style={styles.headerText}>RECENT TICKETS</Text>
              <View style={styles.separatorView} />
              <View>
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  data={recentTicket || []}
                  renderItem={renderItem}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separatorView} />
                  )}
                />
              </View>
            </View>
          )}
        </ScrollView>
        <View style={{alignSelf: 'center'}}>
          <Button
            isLoading={requestCallBackLoading}
            label={'REQUEST A CALL BACK'}
            onPress={() => {
              // call Request a call back api
              setRequestCallBackLoading(true);
              let obj = {
                url: 'tickets/callback',
                method: 'post',
                headers: {
                  Authorization:
                    'Bearer ' + STORE.getState().Login?.loginData?.token,
                },
              };
              APICall(obj)
                .then((res) => {
                  setRequestCallBackLoading(false);
                  CustomAlert('Request a Call Back Successfully');
                })
                .catch((err) => {
                  setRequestCallBackLoading(false);
                  CustomConsole(err);
                });
            }}
            spaceBottom={wp(0.1)}
            width={wp(90)}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label={'raise a request'}
            width={wp(43)}
            spaceBottom={wp(0.1)}
            backgroundColor={Colors.white}
            onPress={() => props.navigation.navigate('RaiseRequest')}
          />
          <Button
            label={'faqs'}
            width={wp(43)}
            spaceBottom={wp(0.1)}
            backgroundColor={Colors.white}
            onPress={() => props.navigation.navigate('FAQs')}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label={'call us'}
            width={wp(43)}
            onPress={() =>
              data?.contact_no?.length > 0 &&
              Linking.openURL(`tel:${data?.contact_no[0]}`)
            }
          />
          <Button
            label={'email us'}
            width={wp(43)}
            onPress={() =>
              data?.email_id?.length > 0 &&
              Linking.openURL(`mailto:${data?.email_id[0]}`)
            }
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Support;

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
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: hp(1.9),
    width: wp(71),
  },
  flexBox: {
    flexDirection: 'row',
    width: wp(10),
  },
  btnWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginTop: hp(3),
    marginBottom: hp(2),
  },
  locationText: {
    fontFamily: 'Gilroy-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  headerText: {
    textTransform: 'uppercase',
    fontFamily: 'Gilroy-Bold',
    fontSize: wp(3.8),
    color: Colors.inputTextColor,
    textAlign: 'center',
    marginTop: hp(1),
  },
  assistantView: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: wp(5),
    alignItems: 'center',
    width: wp(90),
    alignSelf: 'center',
  },
});
