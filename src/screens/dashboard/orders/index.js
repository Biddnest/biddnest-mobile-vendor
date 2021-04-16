import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, FlatList, ActivityIndicator} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {HomeHeader} from '../home';
import {STYLES} from '../../../constant/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import {getDriverOrders, getOrders} from '../../../redux/actions/user';
import {CustomAlert, DiffMin} from '../../../constant/commonFun';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import CountDown from '../../../components/countDown';
import MapPin from '../../../assets/svg/map_pin.svg';

const Orders = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const statusData =
    useSelector((state) => state.Login?.configData?.enums?.bid?.status) || {};
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const roles =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.roles) || {};
  const [selectedTab, setSelectedTab] = useState(
    roles?.driver === userData?.vendor?.user_role ? 'past' : 'participated',
  );
  const [order, setOrder] = useState({});
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (isFocused && userData?.token) {
      setLoading(true);
      getOrdersList();
    }
  }, [selectedTab]);
  const getOrdersList = (pageNo = 1) => {
    if (roles?.driver === userData?.vendor?.user_role) {
      dispatch(getDriverOrders(selectedTab, {}, pageNo))
        .then((res) => {
          setLoading(false);
          if (res?.status === 'success' && res?.data) {
            setOrder(res?.data);
          } else {
            CustomAlert(res?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          CustomAlert(err?.data?.message);
        });
    } else {
      dispatch(getOrders(selectedTab, {}, pageNo))
        .then((res) => {
          setLoading(false);
          if (res?.status === 'success' && res?.data) {
            setOrder(res?.data);
          } else {
            CustomAlert(res?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          CustomAlert(err?.data?.message);
        });
    }
  };
  const handleOrderClicked = (item) => {
    if (selectedTab === 'past') {
      if (item?.status === 8) {
        props.navigation.navigate('OrderDetails', {orderData: item});
      }
    } else {
      props.navigation.navigate('OrderDetails', {orderData: item});
    }
  };
  const renderItem = ({item, index}) => {
    let source_meta = JSON.parse(item?.source_meta?.toString()) || {};
    let destination_meta = JSON.parse(item?.destination_meta?.toString()) || {};
    let meta = JSON.parse(item?.meta?.toString()) || {};
    let started_at = {};
    let completed_at = {};
    let status;
    Object.values(statusData)?.forEach((i, ind) => {
      if (i === item?.bid?.status) {
        status = Object.keys(statusData)[ind].replace('_', ' ');
      }
    });

    item?.status_history.forEach((ele) => {
      if (ele.status === 1) {
        started_at = ele;
      } else if (ele.status === 8) {
        completed_at = ele;
      }
    });
    return (
      <Pressable
        style={STYLES.inputForm}
        key={index}
        onPress={() => handleOrderClicked(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {selectedTab === 'participated' ? (
            <Text style={STYLES.leftText}>ORDER ID</Text>
          ) : (
            <Text
              style={[
                STYLES.statusView,
                {
                  backgroundColor:
                    item?.status === 8 ? Colors.lightGreen : Colors.error,
                },
              ]}>
              {item?.status === 8 ? 'Completed' : 'Cancelled'}
            </Text>
          )}
          <Text style={[STYLES.rightText, {width: '60%'}]}>
            {item?.public_booking_id}
          </Text>
        </View>
        <View
          style={[
            STYLES.separatorView,
            {width: wp(90), alignSelf: 'center', marginBottom: hp(2)},
          ]}
        />
        {selectedTab === 'participated' && (
          <View>
            <View
              style={{
                flex: 1,
              }}>
              <View style={STYLES.flexBoxOrders}>
                <View style={STYLES.priceView}>
                  <Text style={STYLES.participatedText}>
                    Rs. {item?.final_quote || item?.final_estimated_quote}
                  </Text>
                </View>
                <View style={STYLES.priceView}>
                  <CountDown
                    until={DiffMin(item?.bid_result_at)}
                    onFinish={() => {
                      // getOrdersList()
                    }}
                    size={18}
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
            <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
          </View>
        )}
        <View
          style={{
            backgroundColor: Colors.white,
            flexDirection: 'row',
          }}>
          <MapPin />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <View>
              <Text
                numberOfLines={1}
                style={{
                  ...STYLES.locationText,
                  marginTop: 0,
                  textTransform: 'uppercase',
                  width: wp(40),
                }}>
                {source_meta?.city === destination_meta?.city
                  ? source_meta?.geocode
                  : source_meta?.city}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  STYLES.locationText,
                  {
                    textTransform: 'uppercase',
                    width: wp(40),
                  },
                ]}>
                {destination_meta?.city === source_meta?.city
                  ? destination_meta?.geocode
                  : destination_meta?.city}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                numberOfLines={1}
                style={{
                  ...STYLES.locationText,
                  marginTop: 0,
                  width: wp(28),
                  textAlign: 'right',
                }}>
                DISTANCE
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(1),
                }}>
                <Text
                  numberOfLines={1}
                  style={[
                    STYLES.rightText,
                    {
                      width: wp(28),
                      textAlign: 'right',
                    },
                  ]}>
                  {meta?.distance} KM
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={STYLES.separatorView} />
        {selectedTab === 'past' && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid price</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                Rs. {item?.final_quote}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>accepted on</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                {moment(started_at?.created_at).format('D MMM yyyy')}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>completed on</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                {moment(completed_at?.created_at).format('D MMM yyyy')}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid submitted by</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                {item?.user?.fname} {item?.user?.lname}
              </Text>
            </View>
          </View>
        )}
        {selectedTab === 'participated' && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Moving Date</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                {moment(JSON.parse(item?.bid?.meta)?.moving_date).format(
                  'D MMM yyyy',
                )}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                {item?.service?.name}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid submitted by</Text>
              <Text style={[STYLES.rightText, {width: '50%'}]}>
                {item?.user?.fname} {item?.user?.lname}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>status</Text>
              <Text
                style={[
                  STYLES.rightText,
                  {width: '50%', textTransform: 'capitalize'},
                ]}>
                {status}
              </Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <LinearGradient
      colors={[Colors.pageBG, Colors.white]}
      style={STYLES.container}>
      <HomeHeader
        navigation={props.navigation}
        title={'History'}
        right={true}
        onRightPress={() => {}}
      />
      {roles?.driver !== userData?.vendor?.user_role && (
        <View style={STYLES.tabView}>
          {[
            {title: 'Participated Orders', value: 'participated'},
            {title: 'Past Orders', value: 'past'},
          ].map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  ...STYLES.common,
                  borderColor:
                    selectedTab === item.value ? Colors.darkBlue : '#ACABCD',
                  borderBottomWidth: selectedTab === item.value ? 2 : 0,
                }}
                onPress={() => setSelectedTab(item.value)}>
                <Text
                  style={{
                    ...STYLES.tabText,
                    color:
                      selectedTab === item.value ? Colors.darkBlue : '#ACABCD',
                  }}>
                  {item?.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
      <View style={{flex: 1}}>
        {(!!isLoading && (
          <View style={{flex: 1, marginTop: hp(25)}}>
            <ActivityIndicator size="large" color={Colors.darkBlue} />
          </View>
        )) || (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            contentContainerStyle={{paddingBottom: hp(3)}}
            showsVerticalScrollIndicator={false}
            data={order?.bookings || []}
            extraData={order?.bookings}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onRefresh={() => getOrdersList(order?.paging?.next_page || 1)}
            refreshing={isLoading}
            onEndReached={() => getOrdersList(order?.paging?.next_page || 1)}
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontFamily: 'Roboto-Italic',
                  fontSize: wp(3.5),
                  color: '#99A0A5',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  marginVertical: hp(5),
                }}>
                No any orders!
              </Text>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
};

export default Orders;
