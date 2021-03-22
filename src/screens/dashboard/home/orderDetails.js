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
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {APICall} from '../../../redux/actions/user';
import {getDistance} from 'geolib';
import moment from 'moment';

const OrderDetails = (props) => {
  const [orderDetails, setOrderDetails] = useState(
    props?.route?.params?.orderData || {},
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [placedSuccessVisible, setPlacedSuccessVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    let obj = {
      url: `v1/bookings?id=${orderDetails?.public_booking_id}`,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        if (res?.data?.status === 'success') {
          setOrderDetails(res?.data?.data?.booking);
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        CustomAlert(err?.message);
      });
  }, []);

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
  console.log(orderDetails);
  let dateArray = [];
  let source_meta = JSON.parse(orderDetails?.source_meta?.toString()) || {};
  let destination_meta =
    JSON.parse(orderDetails?.destination_meta?.toString()) || {};
  let meta = JSON.parse(orderDetails?.meta?.toString()) || {};
  orderDetails?.movement_dates?.forEach((i) => {
    dateArray.push(moment(i.date).format('D MMM yyyy'));
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
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <SimpleHeader
        heart={true}
        headerText={'Order Details'}
        right={true}
        onRightPress={() => {}}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          <View
            style={{
              flex: 1,
              marginHorizontal: wp(5),
              marginTop: hp(2),
            }}>
            <View style={STYLES.flexBoxOrders}>
              <View style={[STYLES.priceView, {width: '40%'}]}>
                <Text style={STYLES.participatedText}>Rs. 4000</Text>
              </View>
              <View style={[STYLES.priceView, {width: '40%'}]}>
                <Text style={STYLES.participatedText}>
                  {DiffMin(
                    new Date(),
                    new Date(
                      JSON.parse(
                        orderDetails.meta?.toString(),
                      ).timings?.bid_result,
                    ),
                  )}
                </Text>
              </View>
            </View>
            <View style={STYLES.flexBoxOrders}>
              <Text style={STYLES.labelText}>Expected Rate</Text>
              <Text style={STYLES.labelText}>Time Left</Text>
            </View>
          </View>
          <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
          <View
            style={{
              marginHorizontal: wp(5),
            }}>
            <View style={[STYLES.flexBox, {marginTop: 0}]}>
              <Text style={STYLES.leftText}>order id</Text>
              <Text style={[STYLES.rightText, {marginBottom: hp(2)}]}>
                #{orderDetails?.public_booking_id}
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: wp(5),
              backgroundColor: Colors.pageBG,
            }}>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>DISTANCE</Text>
              <Text style={STYLES.rightText}>
                {parseInt(
                  getDistance(
                    {
                      latitude: orderDetails?.source_lat,
                      longitude: orderDetails?.source_lng,
                    },
                    {
                      latitude: orderDetails?.destination_lat,
                      longitude: orderDetails?.destination_lng,
                    },
                  ) / 1000,
                )}{' '}
                KM
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>MOVING DATE</Text>
              <Text style={STYLES.rightText}>{dateArray.join(', ')}</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Category</Text>
              <Text style={STYLES.rightText}>
                {meta?.subcategory || 'null'}
              </Text>
            </View>
            <View style={[STYLES.flexBox, {marginBottom: hp(2)}]}>
              <Text style={STYLES.leftText}>TYPE OF MOVEMENT</Text>
              <Text style={STYLES.rightText}>Shared</Text>
            </View>
          </View>
          <View style={STYLES.tabView}>
            {['Order Details', 'Requirements', 'Order Status'].map(
              (item, index) => {
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
              },
            )}
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
                <View>
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
                <View>
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
              <TwoButton
                leftLabel={'REJECT'}
                rightLabel={'ACCEPT'}
                leftOnPress={() => setRejectVisible(true)}
                rightOnPress={() => props.navigation.navigate('AcceptOrder')}
              />
            </View>
          )}
          {selectedTab === 1 && <Requirements navigation={props.navigation} />}
          {selectedTab === 2 && (
            // <OrderStatusWin />
            // <OrderStatusPending />
            <OrderStatusLost />
          )}
        </View>
      </ScrollView>
      <CustomModalAndroid
        visible={rejectVisible}
        onPress={() => setRejectVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>REJECT ORDER</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setRejectVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
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
              url: 'vendors/reject',
              method: 'delete',
              headers: {
                Authorization:
                  'Bearer ' + STORE.getState().Login?.loginData?.token,
              },
              data: {},
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
      <CustomModalAndroid
        visible={placedSuccessVisible}
        onPress={() => setPlacedSuccessVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setPlacedSuccessVisible(false)}
          />
        </View>
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
              right: 15,
              top: 15,
              height: 40,
              width: 40,
              borderRadius: 20,
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
});
