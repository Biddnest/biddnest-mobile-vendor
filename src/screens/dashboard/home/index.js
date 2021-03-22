import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, wp, boxShadow, hp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import DropDownAndroid from '../../../components/dropDown';
import Slider from 'rn-range-slider';
import FlatButton from '../../../components/flatButton';
import Switch from '../../../components/switch';
import FilterButton from '../../../components/filterButton';
import MenuIcon from '../../../assets/svg/menu_icon.svg';
import TwoButton from '../../../components/twoButton';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {CustomAlert, DiffMin} from '../../../constant/commonFun';
import {getOrders} from '../../../redux/actions/user';
import {getDistance} from 'geolib';
import moment from 'moment';

export const HomeHeader = (props) => {
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
        style={{width: wp(13), height: '100%', ...STYLES.common}}
        onPress={() => props.navigation.toggleDrawer()}>
        <MenuIcon width={20} height={20} />
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
              fontFamily: 'Gilroy-Semibold',
              color: Colors.inputTextColor,
              fontSize: wp(4.5),
              marginRight: props.right ? wp(0) : wp(13),
              textTransform: 'uppercase',
            }}>
            {props.title}
          </Text>
        )) || (
          <Image
            source={require('../../../assets/images/biddnest_logo.png')}
            resizeMode={'contain'}
            style={{
              height: '65%',
              width: '70%',
              marginRight: props.right ? wp(0) : wp(13),
            }}
          />
        )}
      </View>
      {props.right ? (
        <View
          style={[STYLES.common, {alignItems: 'center', flexDirection: 'row'}]}>
          {!props.title && (
            <Pressable
              style={{...STYLES.common, width: wp(12)}}
              onPress={props.onRightPress}>
              <Switch
                switchValue={props.notificationToggle}
                onChange={props.onChange}
              />
            </Pressable>
          )}
          <Pressable
            style={{...STYLES.common, width: wp(13)}}
            onPress={props.onRightPress}>
            <SimpleLineIcons
              name={'earphones-alt'}
              color={Colors.darkBlue}
              size={20}
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

const Home = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const configData =
    useSelector(
      (state) => state.Login?.configData?.enums?.booking?.fetch_type,
    ) || [];
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const [selectedTab, setSelectedTab] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const [offNotification, setOffNotification] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    if (isFocused && userData?.token) {
      setLoading(true);
      dispatch(getOrders(configData[selectedTab]))
        .then((res) => {
          setLoading(false);
          if (res.status === 'success' && res?.data) {
            setOrder(res?.data);
          } else {
            CustomAlert(res.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          CustomAlert(err?.data?.message);
        });
    }
  }, [isFocused, selectedTab]);
  const renderItem = ({item, index}) => {
    let source_meta = JSON.parse(item?.source_meta?.toString()) || {};
    let destination_meta = JSON.parse(item?.destination_meta?.toString()) || {};
    let dateArray = [];
    let meta = JSON.parse(item?.meta?.toString()) || {};
    item?.movement_dates?.forEach((i) => {
      dateArray.push(moment(i.date).format('D MMM yyyy'));
    });
    return (
      <Pressable
        style={[
          STYLES.inputForm,
          {backgroundColor: selectedTab === 2 ? '#F8F8FA' : Colors.white},
        ]}
        key={index}
        onPress={() => {
          if (selectedTab !== 2) {
            props.navigation.navigate('OrderDetails', {orderData: item});
          }
        }}>
        {selectedTab === 2 && (
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
          <Text style={STYLES.leftText}>ORDER ID</Text>
          <Text style={[STYLES.rightText, {width: '70%'}]}>
            #{item?.public_booking_id}
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
                  <Text style={STYLES.participatedText}>Rs. 4000</Text>
                </View>
                <View style={STYLES.priceView}>
                  <Text style={STYLES.participatedText}>
                    {DiffMin(new Date(), new Date(meta?.timings?.bid_result))}
                  </Text>
                </View>
              </View>
              <View style={STYLES.flexBoxOrders}>
                <Text style={STYLES.labelText}>Expected Rate</Text>
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
          <Image
            source={require('../../../assets/images/pin_distance.png')}
            style={{height: wp(15), width: wp(10)}}
            resizeMode={'contain'}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <View>
              <Text
                style={{
                  ...STYLES.locationText,
                  marginTop: 0,
                  textTransform: 'uppercase',
                }}>
                {source_meta?.city}
              </Text>
              <Text style={[STYLES.locationText, {textTransform: 'uppercase'}]}>
                {destination_meta?.city}
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
                <Text style={STYLES.rightText}>
                  {parseInt(
                    getDistance(
                      {latitude: item?.source_lat, longitude: item?.source_lng},
                      {
                        latitude: item?.destination_lat,
                        longitude: item?.destination_lng,
                      },
                    ) / 1000,
                  )}{' '}
                  KM
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
              <Text style={STYLES.rightText}>Rs. 5000</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Moving Date</Text>
              <Text style={STYLES.rightText}>{dateArray.join(', ')}</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={STYLES.rightText}>1 BHK</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid submitted by</Text>
              <Text style={STYLES.rightText}>Mayank Shah</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>status</Text>
              <Text style={STYLES.rightText}>Driver Unassigned</Text>
            </View>
          </View>
        )}
        {(selectedTab === 0 || selectedTab === 2) && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Moving Date</Text>
              <Text style={STYLES.rightText}>{dateArray.join(', ')}</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={STYLES.rightText}>
                {meta?.subcategory || 'null'}
              </Text>
            </View>
          </View>
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
            setNotificationToggle(!notificationToggle);
          }
        }}
        right={true}
        onRightPress={() => {}}
        navigation={props.navigation}
      />
      <View style={STYLES.tabView}>
        {[
          {title: 'Live Orders', value: configData[0]},
          {title: 'Scheduled Orders', value: configData[1]},
          {title: 'Save Later', value: configData[2]},
        ].map((item, index) => {
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
                  color: selectedTab === index ? Colors.darkBlue : '#ACABCD',
                }}>
                {item?.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{flex: 1}}>
        {(!!isLoading && (
          <View style={{flex: 1, marginTop: hp(25)}}>
            <ActivityIndicator size="large" color={Colors.darkBlue} />
          </View>
        )) || (
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={order?.bookings || []}
            extraData={order?.bookings}
            renderItem={renderItem}
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
      {selectedTab === 1 && (
        <FilterButton onPress={() => setFilterVisible(true)} />
      )}
      <CustomModalAndroid
        visible={filterVisible}
        onPress={() => setFilterVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>FILTERS</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setFilterVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={{marginTop: hp(2)}}>
          <Text style={STYLES.inputTextLabel}>Date</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.manPowerView}>
              <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                {'02 Jan'}
              </Text>
            </View>
            <Slider
              style={styles.sliderStyle}
              min={2}
              max={4}
              step={1}
              floatingLabel
              renderThumb={() => <View style={STYLES.sliderThumb} />}
              renderRail={() => (
                <View
                  style={{
                    ...STYLES.sliderRail,
                    width: '100%',
                    borderColor: '#EEE5FC',
                  }}
                />
              )}
              renderRailSelected={() => <View style={STYLES.sliderRail} />}
              renderLabel={(value) => (
                <Text style={STYLES.sliderLabel}>{value}</Text>
              )}
              onValueChanged={() => {}}
            />
            <View style={styles.manPowerView}>
              <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                {'04 Feb'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 0,
            }}>
            <Text style={styles.dateBottomText}>From</Text>
            <Text
              style={[
                styles.dateBottomText,
                {
                  marginLeft: 0,
                  marginRight: wp(4),
                },
              ]}>
              To
            </Text>
          </View>
        </View>
        <View style={{marginVertical: hp(2)}}>
          <DropDownAndroid
            label={'Status'}
            width={wp(90)}
            items={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            onChangeItem={(text) => {}}
          />
        </View>
        <View style={{marginBottom: hp(2)}}>
          <DropDownAndroid
            label={'Category'}
            width={wp(90)}
            items={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            onChangeItem={(text) => {}}
          />
        </View>
        <FlatButton label={'apply'} onPress={() => setFilterVisible(false)} />
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={offNotification}
        onPress={() => setOffNotification(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>TURN OF NOTIFICATIONS</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setOffNotification(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <Text style={[STYLES.rejectText, {marginTop: hp(5)}]}>
          Are you sure you want to turn off notifications?
        </Text>
        <TwoButton
          leftLabel={'NO'}
          rightLabel={'Yes'}
          leftOnPress={() => setOffNotification(false)}
          rightOnPress={() => {
            setNotificationToggle(false);
            setOffNotification(false);
          }}
        />
      </CustomModalAndroid>
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  sliderStyle: {
    width: wp(48),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  manPowerView: {
    borderWidth: 2,
    borderRadius: 10,
    height: wp(12),
    width: wp(16),
    marginVertical: hp(1),
    borderColor: Colors.silver,
    ...STYLES.common,
  },
  dateBottomText: {
    fontFamily: 'Roboto-Regular',
    marginTop: 0,
    fontSize: wp(3.5),
    color: '#99A0A5',
    marginLeft: wp(4),
  },
});
