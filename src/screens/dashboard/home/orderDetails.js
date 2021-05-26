import React, {useEffect, useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
  Image,
  RefreshControl,
} from 'react-native';
import {boxShadow, Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import Feather from 'react-native-vector-icons/Feather';
import TwoButton from '../../../components/twoButton';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import AcceptOrder from './acceptOrder';
import MapModalAndroid from '../../../components/mapModal';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import FlatButton from '../../../components/flatButton';
import OrderStatusWin from './orderStatusWin';
import OrderStatusPending from './orderStatusPending';
import OrderStatusLost from './orderStatusLost';
import Requirements from './requirements';
import {STORE} from '../../../redux';
import {
  CustomAlert,
  DiffMin,
  resetNavigator,
} from '../../../constant/commonFun';
import {APICall, getDriver, getVehicle} from '../../../redux/actions/user';
import moment from 'moment';
import CountDown from '../../../components/countDown';
import {useDispatch} from 'react-redux';

const OrderDetails = (props) => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(
    props?.route?.params?.orderData || {},
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [placedSuccessVisible, setPlacedSuccessVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);
  const [tab, setTab] = useState(['Order Details', 'Requirements']);
  const [priceList, setPriceList] = useState({});
  const [isBookedMark, setBookedMark] = useState(false);

  useEffect(() => {
    fetchOrderData();
    dispatch(getDriver());
    dispatch(getVehicle());
  }, []);

  useEffect(() => {
    if (orderDetails?.public_booking_id) {
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
    }
  }, []);

  const fetchOrderData = () => {
    if (orderDetails?.public_booking_id) {
      let obj = {
        url: `bookings/details?public_booking_id=${orderDetails?.public_booking_id}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {
          if (res?.data?.status === 'success') {
            setOrderDetails(res?.data?.data?.booking);
            setBookedMark(!!res?.data?.data?.booking?.bid?.bookmarked);
            if (
              res?.data?.data?.booking?.bid?.status !== 0 &&
              res?.data?.data?.booking?.bid?.status !== 5
            ) {
              if (orderDetails?.final_quote) {
                setSelectedTab(2);
              }
              setTab(['Order Details', 'Requirements', 'My Bid']);
            }
          } else {
            CustomAlert(res?.data?.message);
          }
        })
        .catch((err) => {
          CustomAlert(err?.message);
        });
    }
  };

  const renderText = (key, value) => {
    return (
      <View>
        <Text style={STYLES.staticLabel}>{key}</Text>
        <Text
          style={[
            STYLES.staticLabel,
            {
              fontFamily: 'Roboto-Regular',
              marginTop: 5,
            },
          ]}>
          {value}
        </Text>
      </View>
    );
  };
  let dateArray = [];
  let source_meta =
    (orderDetails?.source_meta &&
      JSON.parse(orderDetails?.source_meta?.toString())) ||
    {};
  let destination_meta =
    (orderDetails?.destination_meta &&
      JSON.parse(orderDetails?.destination_meta?.toString())) ||
    {};
  let meta =
    (orderDetails?.meta && JSON.parse(orderDetails?.meta?.toString())) || {};
  orderDetails?.movement_dates?.forEach((i) => {
    dateArray.push(moment(i.date).format('D MMM'));
  });
  let coordinates =
    mapVisible === 'pickup'
      ? {
          latitude: parseFloat(orderDetails?.source_lat),

          longitude: parseFloat(orderDetails?.source_lng),
        }
      : {
          latitude: parseFloat(orderDetails?.destination_lat),
          longitude: parseFloat(orderDetails?.destination_lng),
        };
  const renderOrderStatus = () => {
    if (orderDetails?.bid?.status === 1) {
      return (
        <OrderStatusPending
          orderDetails={orderDetails}
          fetchOrderData={fetchOrderData}
        />
      );
    } else if (orderDetails?.bid?.status === 3) {
      return (
        <OrderStatusWin
          orderDetails={orderDetails}
          fetchOrderData={fetchOrderData}
        />
      );
    } else if (orderDetails?.bid?.status === 4) {
      return (
        <OrderStatusLost
          orderDetails={orderDetails}
          fetchOrderData={fetchOrderData}
        />
      );
    } else {
      return null;
    }
  };
  const renderRightDate = () => {
    if (orderDetails?.bid?.status === 0) {
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: '50%',
            justifyContent: 'flex-end',
          }}>
          {dateArray?.map((item, index) => {
            return (
              <View style={STYLES.categoryView} key={index}>
                <Text
                  style={{
                    color: Colors.inputTextColor,
                    fontSize: wp(3.8),
                    fontFamily: 'Roboto-Bold',
                  }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '50%',
          justifyContent: 'flex-end',
        }}>
        <View style={STYLES.categoryView}>
          <Text
            style={{
              color: Colors.inputTextColor,
              fontSize: wp(3.8),
              fontFamily: 'Roboto-Bold',
            }}>
            {orderDetails?.bid &&
              moment(JSON.parse(orderDetails?.bid?.meta)?.moving_date).format(
                'D MMM yyyy',
              )}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <SimpleHeader
        heart={isBookedMark}
        headerText={'Order Details'}
        right={true}
        onRightPress={() => {}}
        isBookmark={
          orderDetails?.bid?.status === 0 || orderDetails?.bid?.status === 1
        }
        onheartPress={() => {
          // Add into bookmark API
          setBookedMark(!isBookedMark);
          let obj = {
            url: 'bookings/bookmark',
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
              if (res?.data?.status === 'success') {
                fetchOrderData();
              } else {
                CustomAlert(res?.data?.message);
              }
            })
            .catch((err) => {
              CustomAlert(err?.message);
            });
        }}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchOrderData} />
        }
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          {!orderDetails?.final_quote && (
            <View
              style={{
                flex: 1,
                marginHorizontal: wp(5),
                marginTop: hp(2),
              }}>
              <View style={STYLES.flexBoxOrders}>
                <View style={[STYLES.priceView, {width: '40%'}]}>
                  <Text style={STYLES.participatedText}>
                    Rs. {orderDetails?.final_estimated_quote}
                  </Text>
                </View>
                <View style={[STYLES.priceView, {width: '40%'}]}>
                  <CountDown
                    key={new Date()}
                    until={DiffMin(orderDetails?.bid_result_at)}
                    onFinish={() => fetchOrderData()}
                    digitStyle={{height: '100%'}}
                    digitTxtStyle={STYLES.participatedText}
                    separatorStyle={{color: '#000'}}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{h: null, m: null, s: null}}
                    showSeparator
                  />
                </View>
              </View>
              <View style={STYLES.flexBoxOrders}>
                <Text style={STYLES.labelText}>Expected Price</Text>
                <Text style={STYLES.labelText}>Time Left</Text>
              </View>
            </View>
          )}
          {orderDetails?.status < 4 && (
            <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
          )}
          <View
            style={{
              marginHorizontal: wp(5),
            }}>
            <View
              style={[
                STYLES.flexBox,
                {marginTop: orderDetails?.status < 4 ? 0 : hp(2)},
              ]}>
              <Text style={STYLES.leftText}>order id</Text>
              <Text style={[STYLES.rightText, {marginBottom: hp(2)}]}>
                {orderDetails?.status > 4
                  ? orderDetails?.public_booking_id
                  : orderDetails?.public_enquiry_id}
              </Text>
            </View>
          </View>
          {!orderDetails?.final_quote &&
            (orderDetails?.bid?.bid_type === 1
              ? orderDetails?.bid?.status === 1
              : orderDetails?.bid?.status !== 1) && (
              <View style={styles.flexBoxWrapper}>
                <Text style={styles.warningText}>
                  You already submitted a bid for this order but its happened
                  that your bid amount is the same as submitted by one or more
                  other vendors. So this order has been put up for bid once
                  again. Please submit your bid again with a lower amount to
                  increase your chances of winning this bid.
                </Text>
              </View>
            )}
          {!orderDetails?.final_quote && (
            <View
              style={{
                paddingHorizontal: wp(5),
                backgroundColor: Colors.pageBG,
                paddingBottom: hp(2),
              }}>
              <View style={STYLES.flexBox}>
                <Text style={STYLES.leftText}>DISTANCE</Text>
                {orderDetails?.source_lat && (
                  <Text style={STYLES.rightText}>
                    {JSON.parse(orderDetails?.meta?.toString()).distance} KM
                  </Text>
                )}
              </View>
              <View style={[STYLES.flexBox, {alignItems: 'center'}]}>
                <Text style={STYLES.leftText}>MOVING DATE</Text>
                {renderRightDate()}
              </View>
              <View style={STYLES.flexBox}>
                <Text style={STYLES.leftText}>Category</Text>
                <Text style={STYLES.rightText}>
                  {orderDetails?.service?.name}
                </Text>
              </View>
              <View style={STYLES.flexBox}>
                <Text style={STYLES.leftText}>TYPE OF MOVEMENT</Text>
                <Text style={[STYLES.rightText, {textTransform: 'capitalize'}]}>
                  {source_meta?.shared_service == true ? 'Shared' : 'Dedicated'}
                </Text>
              </View>
            </View>
          )}
          <View style={STYLES.tabView}>
            {tab.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  style={{
                    ...STYLES.common,
                    borderColor:
                      selectedTab === index ? Colors.darkBlue : '#ACABCD',
                    borderBottomWidth: selectedTab === index ? 2 : 0,
                  }}
                  onPress={() => setSelectedTab(index)}>
                  <Text
                    style={{
                      ...STYLES.tabText,
                      color:
                        selectedTab === index ? Colors.darkBlue : '#ACABCD',
                    }}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selectedTab === 0 && (
            <View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{maxWidth: '80%'}}>
                  {renderText('Pickup Address', source_meta?.address)}
                </View>
                <Pressable
                  style={STYLES.mapPinCircle}
                  onPress={() => setMapVisible('pickup')}>
                  <Feather
                    name={'map-pin'}
                    color={Colors.darkBlue}
                    size={wp(7)}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                }}>
                {renderText('Pincode', source_meta?.pincode)}
              </View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  {renderText('Floor', source_meta?.floor)}
                </View>
                <View style={{flex: 1}}>
                  {renderText('Lift', source_meta?.lift == 1 ? 'Yes' : 'No')}
                </View>
              </View>
              <View
                style={[
                  STYLES.separatorView,
                  {width: '90%', alignSelf: 'center'},
                ]}
              />
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{maxWidth: '80%'}}>
                  {renderText('Drop Address', destination_meta?.address)}
                </View>
                <Pressable
                  style={STYLES.mapPinCircle}
                  onPress={() => setMapVisible('drop')}>
                  <Feather
                    name={'map-pin'}
                    color={Colors.darkBlue}
                    size={wp(7)}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                }}>
                {renderText('Pincode', destination_meta?.pincode)}
              </View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  {renderText('Floor', destination_meta?.floor)}
                </View>
                <View style={{flex: 1}}>
                  {renderText(
                    'Lift',
                    destination_meta?.lift == 1 ? 'Yes' : 'No',
                  )}
                </View>
              </View>
              {!orderDetails?.final_quote &&
                orderDetails?.bid?.status !== 1 && (
                  <TwoButton
                    leftLabel={'REJECT'}
                    rightLabel={
                      !orderDetails?.final_quote &&
                      orderDetails?.bid?.status === 1
                        ? 'submit bid again'
                        : 'ACCEPT'
                    }
                    leftOnPress={() => setRejectVisible(true)}
                    rightOnPress={() => setAcceptVisible(true)}
                  />
                )}
              {orderDetails?.final_quote && (
                <View
                  style={{
                    paddingHorizontal: wp(5),
                    marginTop: hp(2),
                  }}>
                  <View style={STYLES.flexBox}>
                    <Text style={STYLES.leftText}>DISTANCE</Text>
                    {orderDetails?.source_lat && (
                      <Text style={STYLES.rightText}>
                        {JSON.parse(orderDetails?.meta?.toString()).distance} KM
                      </Text>
                    )}
                  </View>
                  {orderDetails?.bid?.status !== 0 && (
                    <View style={STYLES.flexBox}>
                      <Text style={STYLES.leftText}>TYPE OF MOVEMENT</Text>
                      <Text
                        style={[
                          STYLES.rightText,
                          {textTransform: 'capitalize'},
                        ]}>
                        {orderDetails?.bid?.meta &&
                          JSON.parse(orderDetails?.bid?.meta?.toString())
                            .type_of_movement}
                      </Text>
                    </View>
                  )}
                  <View style={STYLES.flexBox}>
                    <Text style={STYLES.leftText}>Category</Text>
                    <Text style={STYLES.rightText}>
                      {orderDetails?.service?.name}
                    </Text>
                  </View>
                </View>
              )}
              {orderDetails?.final_quote && (
                <View
                  style={{
                    paddingHorizontal: wp(5),
                    backgroundColor: Colors.pageBG,
                    paddingBottom: hp(2),
                    marginTop: hp(2),
                  }}>
                  <View style={STYLES.flexBox}>
                    <Text style={STYLES.leftText}>BID PRICE</Text>
                    <Text style={STYLES.rightText}>
                      Rs. {orderDetails?.final_quote}
                    </Text>
                  </View>

                  <View style={[STYLES.flexBox, {alignItems: 'center'}]}>
                    <Text style={STYLES.leftText}>MOVING DATE</Text>
                    {renderRightDate()}
                  </View>
                </View>
              )}
            </View>
          )}
          {selectedTab === 1 && (
            <Requirements
              fetchOrderData={fetchOrderData}
              navigation={props.navigation}
              orderDetails={orderDetails}
            />
          )}
          {selectedTab === 2 && renderOrderStatus()}
        </View>
      </ScrollView>
      <CustomModalAndroid
        visible={rejectVisible}
        title={'REJECT ORDER'}
        onPress={() => setRejectVisible(false)}>
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
                  fetchOrderData();
                  setRejectVisible(false);
                  resetNavigator(props, 'Dashboard');
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
        onCloseIcon={() => {
          fetchOrderData();
          setAcceptVisible(false);
        }}
      />
      <CustomModalAndroid
        visible={placedSuccessVisible}
        onPress={() => setPlacedSuccessVisible(false)}>
        <Image
          source={require('../../../assets/images/bid_success.png')}
          style={{
            width: wp(30),
            height: wp(30),
          }}
          resizeMode={'contain'}
        />
        <Text style={styles.bidText}>
          You have successfully placed your "BID"
        </Text>
      </CustomModalAndroid>
      <MapModalAndroid
        visible={mapVisible !== null}
        onPress={() => setMapVisible(null)}>
        <View style={styles.mapView}>
          <MapView
            provider={
              Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            style={{flex: 1}}
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker coordinate={coordinates} />
          </MapView>
        </View>
        <CloseIcon
          onPress={() => setMapVisible(null)}
          style={[
            boxShadow,
            {
              position: 'absolute',
              right: hp(2),
              top: hp(2),
              height: hp(5),
              width: hp(5),
              borderRadius: hp(2.5),
              zIndex: 5000,
              backgroundColor: Colors.white,
              ...STYLES.common,
            },
          ]}
        />
        <View style={{marginVertical: hp(3), width: wp(90)}}>
          {renderText(
            mapVisible === 'pickup' ? 'Pickup Address' : 'Drop Address',
            mapVisible === 'pickup'
              ? source_meta?.address
              : destination_meta?.address,
          )}
        </View>
        <View style={{marginTop: hp(1)}}>
          <FlatButton
            label={'open in maps app'}
            onPress={() => {
              let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
              Linking.openURL(
                scheme + `${coordinates.latitude},${coordinates.longitude}`,
              );
            }}
          />
        </View>
      </MapModalAndroid>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  bidText: {
    marginTop: hp(3),
    marginBottom: hp(5),
    color: Colors.darkBlue,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(5),
    marginHorizontal: wp(20),
    textAlign: 'center',
  },
  mapView: {
    height: hp(67),
    width: wp(100),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  flexBoxWrapper: {
    width: '90%',
    marginBottom: hp(3),
    backgroundColor: '#FDFAE8',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.btnBG,
  },
  warningText: {
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Italic',
    color: Colors.inputTextColor,
    marginLeft: 5,
  },
});
