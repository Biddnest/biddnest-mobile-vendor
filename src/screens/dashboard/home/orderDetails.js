import React, {useEffect, useState} from 'react';
import {
  Platform,
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
import {useDispatch, useSelector} from 'react-redux';
import Ripple from 'react-native-material-ripple';
import BookedConfirm from '../../../assets/svg/booked_confirm.svg';
import {SocketURL} from '../../../constant/socketService';
import OrderStatusAwaiting from './orderStatusAwaiting';

const OrderDetails = (props) => {
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState(
    props?.route?.params?.orderData || {},
  );
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const socketURL =
    useSelector(
      (state) => state.Login?.configData?.config?.api?.socket_server_url,
    ) || '';
  const [selectedTab, setSelectedTab] = useState(0);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [placedSuccessVisible, setPlacedSuccessVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);
  const [tab, setTab] = useState(['Order Details', 'Requirements']);
  const [priceList, setPriceList] = useState({});
  const [isBookedMark, setBookedMark] = useState(false);
  let callListener = false;

  useEffect(() => {
    if (orderDetails?.status === 2 || orderDetails?.status === 3) {
      socketCalls();
      return () => {
        // SocketURL.removeAllListeners();
        SocketURL.emit('booking.listen.stop', {
          token: STORE.getState().Login?.loginData?.token,
          data: {
            public_booking_id: orderDetails?.public_booking_id,
            organization_id: userData?.vendor?.organization?.id,
          },
        });
        console.log(callListener);
        if (callListener) {
          SocketURL.emit('booking.watch.stop', {
            token: STORE.getState().Login?.loginData?.token,
            data: {
              public_booking_id: orderDetails?.public_booking_id,
              organization_id: userData?.vendor?.organization?.id,
            },
          });
        }
      };
    }
  }, []);

  const socketCalls = async () => {
    SocketURL.emit('booking.listen.start', {
      token: STORE.getState().Login?.loginData?.token,
      data: {
        public_booking_id: orderDetails?.public_booking_id,
        organization_id: userData?.vendor?.organization?.id,
      },
    });
    SocketURL.on('booking.watch.start', (watchData) => {
      console.log('booking watch start listener', watchData);
      fetchOrderData();
      CustomAlert(
        'You are now watching this booking. You may proceed with placing a bid.',
      );
    });
    SocketURL.on('booking.watch.stop', (watchData) => {
      console.log('booking watch stop listener', watchData);
      fetchOrderData();
      if (
        orderDetails?.bid?.watched_by &&
        orderDetails?.bid?.watched_by?.id !== userData?.vendor?.id
      ) {
        CustomAlert(
          'You are now watching this booking. You may proceed with placing a bid.',
        );
      }
    });
    SocketURL.on('booking.bid.submitted', (watchData) => {
      fetchOrderData();
    });
    SocketURL.on('booking.rejected', (watchData) => {
      CustomAlert('This booking has been rejected.');
      setTimeout(() => {
        props.navigation.goBack();
      }, 1000);
    });
  };

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
    if (orderDetails?.public_booking_id && !isLoading) {
      let obj = {
        url: `bookings/details?public_booking_id=${orderDetails?.public_booking_id}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {
          if (res?.status == 400) {
            resetNavigator(props, 'Dashboard');
          } else if (res?.data?.status === 'success') {
            if (res?.data?.data?.booking?.bid?.status === 2) {
              CustomAlert('This booking has been rejected.');
              setTimeout(() => {
                props.navigation.goBack();
              }, 1000);
            } else {
              if (
                res?.data?.data?.booking?.bid?.watched_by === null &&
                (orderDetails?.status === 2 || orderDetails?.status === 3)
              ) {
                callListener = true;
                SocketURL.emit('booking.watch.start', {
                  token: STORE.getState().Login?.loginData?.token,
                  data: {
                    public_booking_id: orderDetails?.public_booking_id,
                    organization_id: userData?.vendor?.organization?.id,
                  },
                });
              } else if (
                res?.data?.data?.booking?.bid?.watched_by?.id ===
                userData?.vendor?.id
              ) {
                callListener = true;
              }
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
  let temp = orderDetails?.bid?.moving_dates
    ? JSON.parse(orderDetails?.bid?.moving_dates?.toString())
    : [];
  let yourArray = orderDetails?.bid?.moving_dates
    ? [...temp]
    : [...orderDetails?.movement_dates];
  yourArray.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  if (!orderDetails?.bid?.moving_dates) {
    yourArray?.forEach((i) => {
      dateArray.push(moment(i.date).format('Do MMM'));
    });
  } else {
    yourArray?.forEach((i) => {
      dateArray.push(moment(i).format('Do MMM'));
    });
  }
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
    if (orderDetails?.status === 14 || orderDetails?.status === 15) {
      return (
        <OrderStatusAwaiting
          orderDetails={orderDetails}
          fetchOrderData={fetchOrderData}
        />
      );
    } else if (orderDetails?.bid?.status === 1) {
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
    if (orderDetails?.bid?.status <= 4 || orderDetails?.bid?.status === 15) {
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            maxWidth: '65%',
            justifyContent: 'flex-end',
          }}>
          {dateArray?.map((item, index) => {
            return (
              <View style={STYLES.categoryView} key={index}>
                <Text
                  style={{
                    color: Colors.inputTextColor,
                    fontSize: hp(1.5),
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
        <View
          style={[
            STYLES.categoryView,
            {
              width: 'auto',
              paddingHorizontal: wp(2),
            },
          ]}>
          <Text
            style={{
              color: Colors.inputTextColor,
              fontSize: hp(1.9),
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
                CustomAlert(
                  res?.data?.data?.bookmark?.bookmarked == 1
                    ? 'Added into Bookmarked'
                    : 'Remove from Bookmarked',
                );
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
                    ₹{' '}
                    {orderDetails?.bid?.bid_amount ||
                      orderDetails?.organization_rec_quote}
                  </Text>
                </View>
                {orderDetails?.status !== 15 && (
                  <View style={[STYLES.priceView, {width: '40%'}]}>
                    <CountDown
                      key={new Date()}
                      until={DiffMin(orderDetails?.bid_end_at)}
                      onFinish={() => fetchOrderData()}
                      digitStyle={{height: '100%'}}
                      digitTxtStyle={STYLES.participatedText}
                      separatorStyle={{color: '#000'}}
                      timeToShow={['H', 'M', 'S']}
                      timeLabels={{h: null, m: null, s: null}}
                      showSeparator
                    />
                  </View>
                )}
              </View>
              <View style={STYLES.flexBoxOrders}>
                <Text style={STYLES.labelText}>Expected Price</Text>
                {orderDetails?.status !== 15 && (
                  <Text style={STYLES.labelText}>Time Left</Text>
                )}
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
              <Text style={STYLES.leftText}>
                {orderDetails?.status > 4 ? 'order' : 'enquiry'} id
              </Text>
              <Text style={[STYLES.rightText, {marginBottom: hp(2)}]}>
                {orderDetails?.status > 4
                  ? orderDetails?.public_booking_id
                  : orderDetails?.public_enquiry_id}
              </Text>
            </View>
          </View>
          {(orderDetails?.bid?.watched_by &&
            orderDetails?.bid?.watched_by?.id !== userData?.vendor?.id && (
              <View style={styles.flexBoxWrapper}>
                <Text style={styles.warningText}>
                  This order is being watched by{' '}
                  {orderDetails?.bid?.watched_by?.fname +
                    ' ' +
                    orderDetails?.bid?.watched_by?.lname}
                  . Hence You won't be able to submit a bid
                </Text>
              </View>
            )) ||
            orderDetails?.status === 2 ||
            (orderDetails?.status === 3 && (
              <View style={styles.flexBoxWrapper}>
                <Text style={styles.warningText}>
                  Nobody is watching this order from your organization. You may
                  proceed with placing a bid.
                </Text>
              </View>
            ))}
          {!orderDetails?.final_quote &&
            orderDetails?.bid?.bid_type === 1 &&
            orderDetails?.bid?.status === 0 &&
            orderDetails?.status === 3 && (
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
              {meta?.subcategory && (
                <View style={STYLES.flexBox}>
                  <Text style={STYLES.leftText}>sub Category</Text>
                  <Text style={STYLES.rightText}>{meta?.subcategory}</Text>
                </View>
              )}
              <View style={STYLES.flexBox}>
                <Text style={STYLES.leftText}>TYPE OF MOVEMENT</Text>
                <Text style={[STYLES.rightText, {textTransform: 'capitalize'}]}>
                  {source_meta?.shared_service == true ||
                  source_meta?.shared_service == 'true' ||
                  source_meta?.shared_service == 1 ||
                  source_meta?.shared_service == '1'
                    ? 'Shared'
                    : 'Dedicated'}
                </Text>
              </View>
            </View>
          )}
          <View style={STYLES.tabView}>
            {tab.map((item, index) => {
              return (
                <Ripple
                  rippleColor={Colors.darkBlue}
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
                </Ripple>
              );
            })}
          </View>
          {selectedTab === 0 && (
            <View
              style={{
                paddingBottom:
                  !orderDetails?.final_quote &&
                  orderDetails?.bid?.status !== 1 &&
                  orderDetails?.status < 4
                    ? 0
                    : hp(2),
              }}>
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
                <Ripple
                  rippleColor={Colors.white}
                  style={STYLES.mapPinCircle}
                  onPress={() => setMapVisible('pickup')}>
                  <Feather
                    name={'map-pin'}
                    color={Colors.darkBlue}
                    size={wp(7)}
                  />
                </Ripple>
              </View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  {renderText('Pincode', source_meta?.pincode)}
                </View>
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
                <Ripple
                  rippleColor={Colors.white}
                  style={STYLES.mapPinCircle}
                  onPress={() => setMapVisible('drop')}>
                  <Feather
                    name={'map-pin'}
                    color={Colors.darkBlue}
                    size={wp(7)}
                  />
                </Ripple>
              </View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginVertical: hp(2),
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1}}>
                  {renderText('Pincode', destination_meta?.pincode)}
                </View>
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
                orderDetails?.bid?.status !== 1 &&
                orderDetails?.status < 4 &&
                (!orderDetails?.bid?.watched_by ||
                  orderDetails?.bid?.watched_by?.id ===
                    userData?.vendor?.id) && (
                  <TwoButton
                    leftLabel={'REJECT'}
                    rightLabel={
                      !orderDetails?.final_quote && orderDetails?.status === 3
                        ? 'Quote again'
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
                  {meta?.subcategory && (
                    <View style={STYLES.flexBox}>
                      <Text style={STYLES.leftText}>sub Category</Text>
                      <Text style={STYLES.rightText}>{meta?.subcategory}</Text>
                    </View>
                  )}
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
                      ₹ {orderDetails?.final_quote}
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
              socket={socketURL}
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
                  SocketURL.emit('booking.rejected', {
                    token: STORE.getState().Login?.loginData?.token,
                    data: {
                      public_booking_id: orderDetails?.public_booking_id,
                      organization_id: userData?.vendor?.organization?.id,
                    },
                  });
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
        socket={SocketURL}
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
        <BookedConfirm
          height={wp(30)}
          width={wp(30)}
          style={{marginTop: hp(5)}}
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
    fontSize: hp(2.8),
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
    fontSize: hp(1.9),
    fontFamily: 'Roboto-Italic',
    color: Colors.inputTextColor,
    marginLeft: 5,
  },
});
