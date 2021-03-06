import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Colors, wp, boxShadow, hp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import CustomModalAndroid from '../../../components/customModal';
import FlatButton from '../../../components/flatButton';
import MenuIcon from '../../../assets/svg/menu_icon.svg';
import MapPin from '../../../assets/svg/map_pin.svg';
import TwoButton from '../../../components/twoButton';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {CustomAlert, DiffMin} from '../../../constant/commonFun';
import {
  APICall,
  checkPinStatus,
  getDriverOrders,
  getOrders,
} from '../../../redux/actions/user';
import moment from 'moment';
import TextInput from '../../../components/textInput';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {STORE} from '../../../redux';
import CountDown from '../../../components/countDown';
import {NOTIFICATION, NOTIFICATION_TOUR} from '../../../redux/types';
import DatePicker from 'react-native-datepicker';
import Entypo from 'react-native-vector-icons/Entypo';
import OneSignal from 'react-native-onesignal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import InformationPopUp from '../../../components/informationPopUp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Ripple from 'react-native-material-ripple';
import BiddnestLogo from '../../../assets/svg/biddnest_logo.svg';
import SelectionModal from '../../../components/selectionModal';
import SwitchButton from '../../../components/appTourSwitch/switchButton';
import _ from 'lodash';

export const HomeHeader = (props) => {
  const configData =
    useSelector((state) => state.Login?.configData?.contact_us?.details) || '';
  let data = JSON.parse(configData.toString());
  const [openModal, setOpenModal] = useState(false);
  const appTour = useSelector((state) => state.Login?.notificationTour);

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
        style={{width: wp(13), height: '100%', ...STYLES.common}}
        onPress={() => props.navigation.toggleDrawer()}>
        <MenuIcon width={wp(5.5)} height={hp(2.7)} />
      </Pressable>
      <View
        style={{
          width: props.right ? (props.title ? wp(74) : wp(62)) : wp(87),
          height: '100%',
          ...STYLES.common,
        }}>
        {(props.title && (
          <Text
            style={{
              fontFamily: 'Gilroy-Bold',
              color: Colors.inputTextColor,
              fontSize: hp(2.8),
              marginRight: props.right ? wp(0) : wp(13),
              textTransform: 'capitalize',
            }}>
            {props.title}
          </Text>
        )) || <BiddnestLogo height={'55%'} width={'70%'} />}
      </View>
      {props.right ? (
        <SwitchButton
          title={props.title}
          onRightPress={props.onRightPress}
          notificationToggle={props.notificationToggle}
          onChange={props.onChange}
          appTour={appTour}
          onPressSupport={() => setOpenModal(true)}
        />
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
            <Ripple
              rippleColor={Colors.darkBlue}
              style={[STYLES.selectionView, STYLES.common]}
              onPress={() => {
                setOpenModal(false);
                data?.contact_no?.length > 0 &&
                  Linking.openURL(`tel:${data?.contact_no[0]}`);
              }}>
              <Ionicons name={'call'} color={Colors.darkBlue} size={hp(6)} />
            </Ripple>
            <Text style={STYLES.selectionText}>Call</Text>
          </View>
          <View style={styles.common}>
            <Ripple
              rippleColor={Colors.darkBlue}
              onPress={() => {
                setOpenModal(false);
                props.navigation.navigate('ChatRedirect');
              }}
              style={[STYLES.selectionView, STYLES.common]}>
              <Entypo name={'chat'} color={Colors.darkBlue} size={hp(6)} />
            </Ripple>
            <Text style={STYLES.selectionText}>Chat</Text>
          </View>
        </View>
      </CustomModalAndroid>
    </View>
  );
};

const Home = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const appTour = useSelector((state) => state.Login?.notificationTour);
  const configData =
    useSelector(
      (state) => state.Login?.configData?.enums?.booking?.fetch_type,
    ) || [];
  const categoriesData =
    useSelector((state) => state.Login?.configData?.categories?.categories) ||
    [];
  const statusData =
    useSelector((state) => state.Login?.configData?.enums?.booking) || {};
  const bidType =
    useSelector((state) => state.Login?.configData?.enums?.bid?.type) || {};
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const roles =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.roles) || {};
  const [selectedTab, setSelectedTab] = useState(
    roles?.driver === userData?.vendor?.user_role ? 1 : 0,
  );
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [filterData, setFilterData] = useState({
    from: moment().subtract(1, 'M'),
    to: moment(),
    status: selectedTab === 0 ? 2 : selectedTab === 1 ? 4 : 0,
    service_id: 1,
  });
  const [notificationToggle, setNotificationToggle] = useState(
    useSelector((state) => state.Login?.notification),
  );
  const [offNotification, setOffNotification] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [info, setInfo] = useState(false);
  const [order, setOrder] = useState({});
  const [pinModal, setPinModal] = useState(false);
  const [modalData, setModalData] = useState({
    password: '',
    pin: '',
  });
  const [error, setError] = useState({
    password: undefined,
    pin: undefined,
  });
  useEffect(() => {
    setFilterData({
      ...filterData,
      status: selectedTab === 0 ? 2 : selectedTab === 1 ? 4 : 0,
    });
  }, [selectedTab]);
  let filterStatusOptions = [];
  let filterCategoryOptions = [];
  Object.keys(statusData?.status)?.forEach((item, index) => {
    let temp = Object.values(statusData?.status)[index];
    if (temp !== 10) {
      if (selectedTab === 0) {
        if (temp > 1 && temp < 4) {
          filterStatusOptions.push({
            label: item?.split('_').join(' '),
            value: temp,
          });
        }
      } else if (selectedTab === 1) {
        if (temp > 3 && temp < 8) {
          filterStatusOptions.push({
            label: item?.split('_').join(' '),
            value: temp,
          });
        }
      } else {
        filterStatusOptions.push({
          label: item?.split('_').join(' '),
          value: temp,
        });
      }
    }
  });
  if (filterStatusOptions.findIndex((item) => item.value === 'all') === -1) {
    filterStatusOptions.unshift({
      label: '-All-',
      value: 'all',
    });
  }
  categoriesData?.forEach((item, index) => {
    filterCategoryOptions.push({
      label: item?.name?.split('_').join(' '),
      value: categoriesData[index]?.id,
    });
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: NOTIFICATION_TOUR,
        payload: false,
      });
    }, 5000);
  }, []);

  useEffect(() => {
    if (isFocused && userData?.token) {
      // setLoading(true);
      let obj = {
        url: 'auth/verify',
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
        },
      };
      APICall(obj)
        .then((res) => {})
        .catch((err) => {
          CustomAlert(err?.data?.message);
        });
      AsyncStorage.getItem('oneSignalData').then((signalData) => {
        let player_id = signalData && JSON.parse(signalData).userId;
        if (player_id) {
          let obj = {
            url: 'notification/player',
            method: 'post',
            headers: {
              Authorization:
                'Bearer ' + STORE.getState().Login?.loginData?.token,
            },
            data: {
              player_id: player_id,
            },
          };
          APICall(obj);
        }
      });
      getOrdersList();
      if (roles?.driver !== userData?.vendor?.user_role) {
        checkPinStatus()
          .then((res) => {
            // setLoading(false);
            if (res?.status === 'success' && res?.data) {
              if (!res?.data?.pin?.set) {
                setTimeout(() => {
                  setPinModal(true);
                }, 1500);
              }
            } else {
              CustomAlert(res?.message);
            }
          })
          .catch((err) => {
            // setLoading(false);
            CustomAlert(err?.data?.message);
          });
      }
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused && userData?.token) {
      setLoading(true);
      getOrdersList({}, 1, true);
    }
  }, [selectedTab]);
  const getOrdersList = (data = {}, pageNo = 1, tabChanged = false) => {
    if (!isRefresh) {
      setRefresh(true);
      if (roles?.driver === userData?.vendor?.user_role) {
        dispatch(getDriverOrders(configData[selectedTab], data, pageNo))
          .then((res) => {
            setLoading(false);
            setRefresh(false);
            if (res?.status === 'success' && res?.data) {
              if (tabChanged) {
                setOrder(res?.data);
              } else {
                if (pageNo === 1) {
                  setOrder(res?.data);
                } else if (pageNo !== order?.paging?.current_page) {
                  let temp = [...order?.bookings, ...res?.data?.bookings];
                  setOrder({
                    bookings: temp,
                    paging: res?.data?.paging,
                  });
                }
              }
            } else {
              CustomAlert(res?.message);
            }
          })
          .catch((err) => {
            setLoading(false);
            setRefresh(false);
            CustomAlert(err?.data?.message);
          });
      } else {
        dispatch(getOrders(configData[selectedTab], data, pageNo))
          .then((res) => {
            setLoading(false);
            setRefresh(false);
            if (res?.status === 'success' && res?.data) {
              if (tabChanged) {
                setOrder(res?.data);
              } else {
                if (pageNo === 1) {
                  setOrder(res?.data);
                } else if (pageNo !== order?.paging?.current_page) {
                  let temp = [...order?.bookings, ...res?.data?.bookings];
                  setOrder({
                    bookings: temp,
                    paging: res?.data?.paging,
                  });
                }
              }
            } else {
              CustomAlert(res?.message);
            }
          })
          .catch((err) => {
            setLoading(false);
            setRefresh(false);
            CustomAlert(err?.data?.message);
          });
      }
    }
  };
  const renderItem = ({item, index}) => {
    let source_meta =
      (item?.source_meta && JSON.parse(item?.source_meta?.toString())) || {};
    let destination_meta =
      (item?.destination_meta &&
        JSON.parse(item?.destination_meta?.toString())) ||
      {};
    let meta = (item?.meta && JSON.parse(item?.meta?.toString())) || {};
    let ind = Object.values(statusData?.status).findIndex(
      (ele) => ele === item?.status,
    );
    let status = Object.keys(statusData?.status)[ind]?.split('_').join(' ');
    let statusInd = Object.keys(statusData?.status)[ind];
    if (status === 'payment pending') {
      status = 'customer confirmation pending';
    }
    let yourArray = [...item?.movement_dates];
    yourArray.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
    let dateDisplay = [];
    yourArray?.forEach((i) => {
      dateDisplay.push(moment(i.date).format('Do MMM'));
    });
    const renderRightDate = (item, dates = []) => {
      if (item?.bid?.status === 0) {
        return (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              maxWidth: '65%',
              justifyContent: 'flex-end',
            }}>
            {dates?.map((item, index) => {
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
              {item?.bid &&
                moment(JSON.parse(item?.bid?.meta)?.moving_date).format(
                  'D MMM yyyy',
                )}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <Pressable
        style={[
          STYLES.inputForm,
          {
            backgroundColor:
              selectedTab === 2 && item?.bid?.status === 5
                ? '#F8F8FA'
                : Colors.white,
          },
        ]}
        key={index}
        onPress={() => {
          if (selectedTab !== 2 || item?.bid?.status !== 5) {
            props.navigation.navigate('OrderDetails', {orderData: item});
          }
        }}>
        {selectedTab === 2 && item?.bid?.status === 5 && (
          <Image
            source={require('../../../assets/images/expired.png')}
            style={{
              position: 'absolute',
              width: wp(60),
              alignSelf: 'center',
              zIndex: 11,
            }}
            resizeMode={'contain'}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/*<Text style={STYLES.leftText}>ORDER ID</Text>*/}
          <Text
            style={[
              STYLES.statusView,
              {
                backgroundColor: statusData?.color[statusInd],
                maxWidth: '40%',
                overflow: 'hidden',
              },
            ]}>
            {status}
          </Text>
          <Text style={[STYLES.rightText, {width: '58%'}]}>
            {item?.status > 4
              ? item?.public_booking_id
              : item?.public_enquiry_id}
          </Text>
        </View>
        <View
          style={[
            STYLES.separatorView,
            {width: wp(90), alignSelf: 'center', marginBottom: hp(2)},
          ]}
        />
        {(selectedTab === 0 || selectedTab === 2) && (
          <View>
            <View
              style={{
                flex: 1,
              }}>
              <View style={STYLES.flexBoxOrders}>
                <View style={STYLES.priceView}>
                  <Text style={STYLES.participatedText}>
                    ??? {item?.bid?.bid_amount || item?.final_estimated_quote}
                  </Text>
                </View>
                <View style={STYLES.priceView}>
                  <CountDown
                    until={DiffMin(item?.bid_result_at)}
                    // onFinish={() => getOrdersList()}
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
            alignItems: 'center',
          }}>
          <MapPin height={hp(6.5)} width={wp(5)} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
              marginLeft: 5,
            }}>
            <View style={{maxWidth: '50%'}}>
              <Text
                style={{
                  ...STYLES.locationText,
                  marginTop: 0,
                  textTransform: 'capitalize',
                  fontFamily: 'Gilroy-Bold',
                }}
                numberOfLines={1}>
                {source_meta?.city === destination_meta?.city
                  ? source_meta?.address
                  : source_meta?.city}
              </Text>
              <Text
                style={[
                  STYLES.locationText,
                  {textTransform: 'capitalize', fontFamily: 'Gilroy-Bold'},
                ]}
                numberOfLines={1}>
                {destination_meta?.city === source_meta?.city
                  ? destination_meta?.address
                  : destination_meta?.city}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{...STYLES.locationText, marginTop: 0}}>
                DISTANCE
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(1),
                }}>
                <Text style={STYLES.rightText} numberOfLines={1}>
                  {JSON.parse(item?.meta?.toString()).distance} KM
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={STYLES.separatorView} />
        {selectedTab === 1 && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid price</Text>
              <Text style={STYLES.rightText}>
                ??? {item?.final_quote || item?.final_estimated_quote}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Moving Date</Text>
              {renderRightDate(item)}
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={STYLES.rightText}>{item?.service?.name}</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid submitted by</Text>
              <Text style={STYLES.rightText}>
                {item?.bid?.vendor?.fname} {item?.bid?.vendor?.lname}
              </Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Booking Type</Text>
              <Text style={STYLES.rightText}>
                {statusData?.booking_type?.economic == item?.booking_type
                  ? 'Economic'
                  : 'Premium'}
              </Text>
            </View>
            {/*<View style={STYLES.flexBox}>*/}
            {/*  <Text style={STYLES.leftText}>status</Text>*/}
            {/*  <Text*/}
            {/*    style={[*/}
            {/*      STYLES.rightText,*/}
            {/*      {textTransform: 'capitalize', width: '70%'},*/}
            {/*    ]}>*/}
            {/*    {status}*/}
            {/*  </Text>*/}
            {/*</View>*/}
          </View>
        )}
        {(selectedTab === 0 || selectedTab === 2) && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Moving Date</Text>
              {renderRightDate(item, dateDisplay)}
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={STYLES.rightText}>{item?.service?.name}</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Booking Type</Text>
              <Text style={STYLES.rightText}>
                {statusData?.booking_type?.economic == item?.booking_type
                  ? 'Economic'
                  : 'Premium'}
              </Text>
            </View>
            {item?.bid?.bookmarked_by && (
              <View style={STYLES.flexBox}>
                <Text style={STYLES.leftText}>BookMarked By</Text>
                <Text style={STYLES.rightText}>
                  {item?.bid?.bookmarked_by?.fname +
                    ' ' +
                    item?.bid?.bookmarked_by?.lname}
                </Text>
              </View>
            )}
          </View>
        )}
        {item?.status === statusData?.status?.rebiding && (
          <Pressable
            style={styles.flexBoxWrapper}
            onPress={() => setInfo(true)}>
            <EvilIcons
              name={'exclamation'}
              size={hp(2.7)}
              color={Colors.inputTextColor}
            />
            <Text style={styles.warningText}>Resubmit your bid</Text>
          </Pressable>
        )}
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <HomeHeader
        notificationToggle={notificationToggle}
        onChange={() => {
          if (!notificationToggle === false) {
            setOffNotification(true);
          } else {
            dispatch({
              type: NOTIFICATION,
              payload: !notificationToggle,
            });
            CustomAlert('Notification has been turned on');
            OneSignal.setSubscription(!notificationToggle);
            setNotificationToggle(!notificationToggle);
          }
        }}
        right={true}
        onRightPress={() => {}}
        navigation={props.navigation}
      />
      {roles?.driver !== userData?.vendor?.user_role && (
        <View style={STYLES.tabView}>
          {[
            {title: 'Live Orders', value: configData[0]},
            {title: 'Scheduled Orders', value: configData[1]},
            {title: 'Save Later', value: configData[2]},
          ].map((item, index) => {
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
                    color: selectedTab === index ? Colors.darkBlue : '#ACABCD',
                  }}>
                  {item?.title}
                </Text>
              </Ripple>
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
            onRefresh={() =>
              filterApplied ? getOrdersList(filterData) : getOrdersList()
            }
            refreshing={isRefresh}
            onEndReached={() => {
              if (order?.bookings?.length > 5) {
                if (filterApplied) {
                  getOrdersList(filterData, order?.paging?.current_page || 1);
                } else {
                  getOrdersList({}, order?.paging?.current_page || 1);
                }
              }
            }}
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontFamily: 'Roboto-Italic',
                  fontSize: hp(1.9),
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
      <View style={{position: 'absolute', bottom: 0, right: 0}}>
        <SwitchButton
          onPressFilter={() => setFilterVisible(true)}
          appTour={appTour}
        />
      </View>
      <CustomModalAndroid
        visible={filterVisible}
        title={'FILTERS'}
        onPress={() => setFilterVisible(false)}>
        <View style={{marginTop: hp(2)}}>
          <View
            style={{
              flexDirection: 'row',
              width: wp(85),
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            {['from', 'to'].map((item, index) => {
              return (
                <View style={{width: '46%'}} key={index}>
                  <Text
                    style={[
                      STYLES.inputTextLabel,
                      {textTransform: 'capitalize'},
                    ]}>
                    Movement {item}
                  </Text>
                  <View style={STYLES.dateView}>
                    <DatePicker
                      style={STYLES.datePicker}
                      date={moment(
                        item === 'from' ? filterData?.from : filterData?.to,
                      ).format('D MMM yyyy')}
                      mode="date"
                      placeholder="Select date"
                      format="D MMM yyyy"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      iconComponent={
                        <Entypo
                          name={'calendar'}
                          size={hp(3)}
                          color={Colors.inputTextColor}
                          style={{
                            position: 'relative',
                            right: hp(1),
                          }}
                        />
                      }
                      customStyles={{
                        dateInput: STYLES.dateInput,
                        dateText: STYLES.dateText,
                      }}
                      onDateChange={(date) => {
                        setFilterData({
                          ...filterData,
                          [item]: date,
                        });
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <SelectionModal
            value={filterData?.status}
            width={wp(90)}
            label={'Status'}
            items={filterStatusOptions}
            onChangeItem={(text) => {
              setFilterData({
                ...filterData,
                status: text,
              });
            }}
          />
        </View>
        <SelectionModal
          label={'Category'}
          value={filterData?.service_id}
          width={wp(90)}
          items={filterCategoryOptions}
          onChangeItem={(text) => {
            setFilterData({
              ...filterData,
              service_id: text,
            });
          }}
        />
        <TwoButton
          leftLabel={'clear filter'}
          rightLabel={'apply'}
          leftOnPress={() => {
            getOrdersList();
            setFilterData({
              from: moment().subtract(1, 'M'),
              to: moment(),
              status: selectedTab === 0 ? 2 : selectedTab === 1 ? 4 : 0,
              service_id: 1,
            });
            setFilterApplied(false);
            setFilterVisible(false);
          }}
          rightOnPress={() => {
            getOrdersList(filterData);
            setFilterApplied(true);
            setFilterVisible(false);
          }}
        />
        {/*<FlatButton*/}
        {/*  label={'apply'}*/}
        {/*  onPress={() => {*/}
        {/*    getOrdersList(filterData);*/}
        {/*    setFilterVisible(false);*/}
        {/*  }}*/}
        {/*/>*/}
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={offNotification}
        title={'TURN OF NOTIFICATIONS'}
        onPress={() => setOffNotification(false)}>
        <Text style={[STYLES.rejectText, {marginTop: hp(5)}]}>
          Are you sure you want to turn off notifications?
        </Text>
        <TwoButton
          leftLabel={'NO'}
          rightLabel={'Yes'}
          leftOnPress={() => setOffNotification(false)}
          rightOnPress={() => {
            dispatch({
              type: NOTIFICATION,
              payload: false,
            });
            OneSignal.setSubscription(false);
            setNotificationToggle(false);
            setTimeout(() => {
              setOffNotification(false);
            }, 1500);
            CustomAlert('Notification has been turned off');
          }}
        />
      </CustomModalAndroid>
      <CustomModalAndroid visible={pinModal} title={'SET PIN'}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              width: '85%',
              marginVertical: hp(2),
            }}>
            <TextInput
              label={'Password *'}
              secureTextEntry={true}
              placeHolder={'**********'}
              isRight={error.password}
              onChange={(text) => setModalData({...modalData, password: text})}
            />
            <View style={{marginLeft: wp(2)}}>
              <Text style={STYLES.inputTextLabel}>New 4 digit PIN</Text>
              <View
                style={{
                  height: hp(9),
                  width: hp(28),
                }}>
                <OTPInputView
                  pinCount={4}
                  onCodeChanged={(code) =>
                    setModalData({...modalData, pin: code})
                  }
                  codeInputFieldStyle={[
                    styles.textInput,
                    {
                      borderColor:
                        error.pin === false ? Colors.red : Colors.silver,
                    },
                  ]}
                  codeInputHighlightStyle={[
                    styles.textInput,
                    {borderColor: '#243C99'},
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
        <FlatButton
          label={'submit'}
          isLoading={isLoading}
          onPress={() => {
            let tempError = {};
            setLoading(true);
            tempError.password = !(
              !modalData.password || modalData.password.length === 0
            );
            tempError.password = !!modalData.password;
            tempError.pin = !(!modalData.pin || modalData.pin.length !== 4);
            setError(tempError);
            if (
              Object.values(tempError).findIndex((item) => item === false) ===
              -1
            ) {
              // set pin API
              let obj = {
                url: 'pin/reset',
                method: 'post',
                headers: {
                  Authorization:
                    'Bearer ' + STORE.getState().Login?.loginData?.token,
                },
                data: modalData,
              };
              APICall(obj)
                .then((res) => {
                  setLoading(false);
                  if (res?.data?.status === 'success') {
                    setPinModal(false);
                  } else {
                    CustomAlert(res?.data?.message);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  CustomAlert(err?.message);
                });
            } else {
              setLoading(false);
            }
          }}
        />
      </CustomModalAndroid>
      <InformationPopUp
        visible={info}
        title={'REBIDDING'}
        label={
          'You already submitted a bid for this order but its happened that your bid amount is the same as submitted by one or more other vendors. So this order has been put up for bid once again. Please submit your bid again with a lower amount to increase your chances of winning this bid.'
        }
        onCloseIcon={() => setInfo(false)}
      />
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    height: hp(6.5),
    width: hp(6.5),
    borderColor: Colors.silver,
    color: Colors.textLabelColor,
    fontSize: hp(3),
  },
  flexBoxWrapper: {
    maxWidth: '85%',
    marginTop: hp(2),
    backgroundColor: '#FDFAE8',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  warningText: {
    fontSize: hp(1.9),
    fontFamily: 'Roboto-Italic',
    color: Colors.inputTextColor,
    marginLeft: 5,
  },
});
