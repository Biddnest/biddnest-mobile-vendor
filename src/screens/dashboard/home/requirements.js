import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import TwoButton from '../../../components/twoButton';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import AcceptOrder from './acceptOrder';
import {useSelector} from 'react-redux';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert, resetNavigator} from '../../../constant/commonFun';
import {Html5Entities} from 'html-entities';

const Requirements = (props) => {
  const entities = new Html5Entities();
  const {orderDetails} = props;
  const [rejectVisible, setRejectVisible] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const configData =
    useSelector((state) => state.Login?.configData?.enums?.service) || {};
  let meta =
    (orderDetails?.meta && JSON.parse(orderDetails?.meta?.toString())) || {};
  const [priceList, setPriceList] = useState({});

  useEffect(() => {
    let obj = {
      url: `bid/price-list?public_booking_id=${orderDetails?.public_booking_id}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        if (res?.data?.status === 'success') {
          setPriceList(res?.data?.data?.price_list);
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        CustomAlert(err?.message);
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          <View
            style={{
              marginHorizontal: wp(10),
              marginTop: hp(2),
            }}>
            <View style={[STYLES.flexBox, {marginTop: 0}]}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={[STYLES.rightText, {marginBottom: hp(2)}]}>
                {orderDetails?.service?.name}
              </Text>
            </View>
          </View>
          <View style={[STYLES.inputForm, {marginTop: 0}]}>
            <Text
              style={{
                fontFamily: 'Gilroy-SemiBold',
                fontSize: wp(4),
                color: Colors.inputTextColor,
                textAlign: 'center',
                marginVertical: hp(1.5),
              }}>
              ITEM LIST
            </Text>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginTop: hp(2)}}
              data={orderDetails?.inventories || []}
              extraData={orderDetails?.inventories}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.textWrapper} key={index}>
                    <View style={{width: '75%'}}>
                      <Text style={styles.headerText}>{item.name}</Text>
                      <Text
                        style={[
                          styles.headerText,
                          {
                            fontFamily: 'Roboto-Regular',
                            marginTop: 5,
                            fontSize: wp(3.5),
                            textTransform: 'capitalize',
                          },
                        ]}>
                        {item?.material}, {item?.size}
                      </Text>
                    </View>
                    <Text style={styles.rightText}>
                      x
                      {configData?.inventory_quantity_type.range ===
                      item?.quantity_type
                        ? JSON.parse(item?.quantity?.toString()).min +
                          '-' +
                          JSON.parse(item?.quantity?.toString()).max
                        : item?.quantity}
                    </Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
              )}
            />
          </View>
          {meta?.customer &&
            JSON.parse(meta?.customer?.toString()).remarks !== null && (
              <View style={STYLES.inputForm}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: wp(4),
                    color: Colors.inputTextColor,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}>
                  Comments from customer
                </Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Italic',
                    fontSize: wp(3.6),
                    color: Colors.inputTextColor,
                    marginTop: hp(2),
                  }}>
                  {meta?.customer
                    ? entities.decode(
                        JSON.parse(meta?.customer?.toString()).remarks,
                      )
                    : 'No Any comments'}
                </Text>
              </View>
            )}
          {meta?.images?.length > 0 && (
            <View style={STYLES.inputForm}>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: wp(4),
                  color: Colors.inputTextColor,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}>
                Pictures uploaded by the customer
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={{
                  paddingTop: hp(2),
                }}>
                {meta?.images?.map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {}}
                      style={{
                        height: wp(16),
                        width: wp(16),
                        borderRadius: wp(3),
                        backgroundColor: Colors.silver,
                        marginRight: wp(3),
                      }}>
                      <Image
                        source={{uri: item}}
                        style={{height: '100%', width: '100%'}}
                        resizeMode={'contain'}
                      />
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          )}
          {!orderDetails?.final_quote && (
            <TwoButton
              leftLabel={'REJECT'}
              rightLabel={
                !orderDetails?.final_quote && orderDetails?.bid?.status === 1
                  ? 'submit bid again'
                  : 'ACCEPT'
              }
              leftOnPress={() => setRejectVisible(true)}
              rightOnPress={() => setAcceptVisible(true)}
            />
          )}
        </View>
      </ScrollView>
      <CustomModalAndroid
        visible={rejectVisible}
        onPress={() => setRejectVisible(false)}>
        <Text style={STYLES.modalHeaderText}>REJECT ORDER</Text>
        <CloseIcon onPress={() => setRejectVisible(false)} />
        <Text style={STYLES.rejectText}>
          Are you sure you want to REJECT the order?
        </Text>
        <TwoButton
          isLoading={isLoading}
          leftLabel={'NO'}
          rightLabel={'YES'}
          leftOnPress={() => setRejectVisible(false)}
          rightOnPress={() => {
            setLoading(true);
            let obj = {
              url: 'bookings/reject',
              method: 'post',
              headers: {
                Authorization:
                  'Bearer ' + STORE.getState().Login?.loginData?.token,
              },
              data: {
                public_booking_id: orderDetails?.public_booking_id,
              },
            };
            APICall(obj)
              .then((res) => {
                setLoading(false);
                if (res?.data?.status === 'success') {
                  setRejectVisible(false);
                  resetNavigator(props.navigation, 'Dashboard');
                } else {
                  CustomAlert(res?.data?.message);
                }
              })
              .catch((err) => {
                setLoading(false);
                CustomAlert(err?.message);
              });
          }}
        />
      </CustomModalAndroid>
      <AcceptOrder
        navigator={props}
        public_booking_id={orderDetails?.public_booking_id}
        priceList={priceList}
        orderDetails={orderDetails}
        visible={acceptVisible}
        onCloseIcon={() => setAcceptVisible(false)}
      />
    </View>
  );
};

export default Requirements;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightText: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: Colors.pageBG,
    overflow: 'hidden',
    fontSize: wp(3.5),
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4),
    color: Colors.inputTextColor,
  },
});
