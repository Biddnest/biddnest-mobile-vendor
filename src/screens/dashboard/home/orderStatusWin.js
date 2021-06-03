import React, {useState} from 'react';
import {Text, View, StyleSheet, Pressable, Linking} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomModalAndroid from '../../../components/customModal';
import getDirections from 'react-native-google-maps-directions';
import FlatButton from '../../../components/flatButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';
import {useSelector} from 'react-redux';
import moment from 'moment';
import SelectionModal from '../../../components/selectionModal';

const OrderStatusWin = (props) => {
  const {orderDetails, fetchOrderData} = props;
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const roles =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.roles) || {};
  const driverVehicleList =
    useSelector((state) => state.Login?.driverVehicleList) || {};
  const [driverAssignVisible, setDriverAssignVisible] = useState(false);
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [driverAssignData, setDriverAssignData] = useState({
    driver_id: null,
    vehicle_id: null,
  });
  let driverList = [];
  let vehicleList = [];
  driverVehicleList?.drivers?.forEach((item, index) => {
    driverList.push({
      ...item,
      label: item?.fname + ' ' + item?.lname,
      value: item?.id,
    });
  });
  if (driverList.findIndex((item) => item.value === null) === -1) {
    driverList.unshift({
      label: '-Select-',
      value: null,
    });
  }
  driverVehicleList?.vehicles?.forEach((item, index) => {
    vehicleList.push({
      ...item,
      label: item?.name + ', ' + item?.number,
      value: item?.id,
    });
  });
  if (vehicleList.findIndex((item) => item.value === null) === -1) {
    vehicleList.unshift({
      label: '-Select-',
      value: null,
    });
  }

  let source_meta =
    (orderDetails?.source_meta &&
      JSON.parse(orderDetails?.source_meta?.toString())) ||
    {};
  let destination_meta =
    (orderDetails?.destination_meta &&
      JSON.parse(orderDetails?.destination_meta?.toString())) ||
    {};
  return (
    <View>
      {orderDetails?.status !== 4 && (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginTop: hp(3),
            }}>
            <View style={{alignItems: 'center'}}>
              <Pressable
                style={STYLES.circleBtnView}
                onPress={() =>
                  Linking.openURL(`tel:${orderDetails?.user?.phone}`)
                }>
                <Ionicons
                  name={'call-outline'}
                  color={Colors.darkBlue}
                  size={wp(7)}
                />
              </Pressable>
              <Text style={STYLES.circleBottomText}>Call Customer</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Pressable
                style={STYLES.circleBtnView}
                onPress={() => {
                  const directionData = {
                    source: {
                      latitude: parseFloat(orderDetails?.source_lat),
                      longitude: parseFloat(orderDetails?.source_lng),
                    },
                    destination: {
                      latitude: parseFloat(orderDetails?.destination_lat),
                      longitude: parseFloat(orderDetails?.destination_lng),
                    },
                  };
                  getDirections(directionData);
                }}>
                <Ionicons
                  name={'navigate-outline'}
                  color={Colors.darkBlue}
                  size={wp(7)}
                />
              </Pressable>
              <Text style={STYLES.circleBottomText}>Direction</Text>
            </View>
          </View>
          <View style={[STYLES.separatorView, {marginBottom: wp(5)}]} />
        </View>
      )}
      {((orderDetails?.status === 6 || orderDetails?.status === 7) && (
        <View style={{alignItems: 'center'}}>
          <Button
            spaceTop={hp(0.1)}
            label={orderDetails?.status === 6 ? 'Start Trip' : 'End Trip'}
            width={wp(90)}
            onPress={() => setPinModalVisible(true)}
          />
        </View>
      )) ||
        null}
      {orderDetails?.driver === null && (
        <View
          style={[
            styles.flexBoxWrapper,
            {
              marginTop: orderDetails?.status !== 4 ? 0 : hp(2),
            },
          ]}>
          <EvilIcons
            name={'exclamation'}
            size={hp(2.7)}
            color={Colors.inputTextColor}
          />
          <Text style={styles.warningText}>
            {orderDetails?.status <= 4
              ? 'Confirmation is pending from the customer'
              : 'Assign driver to this order'}
          </Text>
        </View>
      )}
      <View style={[STYLES.inputForm, {borderRadius: hp(2), marginTop: 0}]}>
        <Text style={STYLES.inputTextLabel}>Customer Details</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(1),
          }}>
          <Text style={[STYLES.sliderText, {width: wp(20), fontSize: wp(4)}]}>
            Name
          </Text>
          <Text
            style={[
              STYLES.modalHeaderText,
              {width: wp(60), textAlign: 'left', marginTop: 0, marginBottom: 0},
            ]}>
            {orderDetails?.user?.fname} {orderDetails?.user?.lname}
          </Text>
        </View>
        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*  <Text*/}
        {/*    style={[*/}
        {/*      STYLES.modalHeaderText,*/}
        {/*      {*/}
        {/*        width: wp(60),*/}
        {/*        textAlign: 'left',*/}
        {/*        marginTop: 0,*/}
        {/*        marginBottom: 0,*/}
        {/*      },*/}
        {/*    ]}>*/}
        {/*    {orderDetails?.user?.address}*/}
        {/*  </Text>*/}
        {/*</View>*/}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
          <Text style={[STYLES.sliderText, {width: wp(20), fontSize: wp(4)}]}>
            From:
          </Text>
          <Text
            style={[
              STYLES.modalHeaderText,
              {
                width: wp(60),
                textAlign: 'left',
                marginTop: 0,
                marginBottom: 0,
              },
            ]}>
            {source_meta?.address}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
          <Text style={[STYLES.sliderText, {width: wp(20), fontSize: wp(4)}]}>
            To:
          </Text>
          <Text
            style={[
              STYLES.modalHeaderText,
              {
                width: wp(60),
                textAlign: 'left',
                marginTop: 0,
                marginBottom: 0,
              },
            ]}>
            {destination_meta?.address}
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: wp(8), marginVertical: hp(2)}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.dotView,
              {
                backgroundColor:
                  orderDetails?.status < 5 ? '#9E9DC9' : Colors.darkBlue,
              },
            ]}
          />
          <Text
            style={[
              styles.stepHeaderText,
              {
                opacity: orderDetails?.status < 5 ? 0.8 : 1,
              },
            ]}>
            Bid won
          </Text>
        </View>
        <View
          style={{
            ...styles.stepBodyView,
          }}>
          <Text
            style={[
              styles.subHeaderText,
              {
                opacity: orderDetails?.status < 5 ? 0.8 : 1,
              },
            ]}>
            {orderDetails?.status < 5
              ? 'This order has been assigned to you'
              : 'confirmed'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.dotView,
              {
                backgroundColor:
                  orderDetails?.status < 6 ? '#9E9DC9' : Colors.darkBlue,
              },
            ]}
          />
          <Text
            style={[
              styles.stepHeaderText,
              {
                opacity: orderDetails?.status < 6 ? 0.8 : 1,
              },
            ]}>
            {'Assign Driver'}
          </Text>
          {orderDetails?.status !== 8 &&
            orderDetails?.status > 4 &&
            roles?.driver !== userData?.vendor?.user_role && (
              <Text
                style={styles.driverView}
                onPress={() => setDriverAssignVisible(true)}>
                {(orderDetails?.driver === null && 'ASSIGN DRIVER') ||
                  'CHANGE DRIVER'}
              </Text>
            )}
          {roles?.driver === userData?.vendor?.user_role &&
            orderDetails?.status === 5 && (
              <Text
                style={styles.driverView}
                onPress={() => setDriverAssignVisible(true)}>
                {(orderDetails?.driver === null && 'ASSIGN DRIVER') ||
                  'CHANGE DRIVER'}
              </Text>
            )}
        </View>
        <View
          style={{
            ...styles.stepBodyView,
            opacity: orderDetails?.status < 6 ? 0.8 : 1,
          }}>
          <Text style={styles.subHeaderText}>
            {orderDetails?.status < 6 ? 'Pending' : 'Completed'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.dotView,
              {
                backgroundColor:
                  orderDetails?.status === 8 ? Colors.darkBlue : '#9E9DC9',
              },
            ]}
          />
          <Text
            style={[
              styles.stepHeaderText,
              {
                opacity: orderDetails?.status === 8 ? 1 : 0.8,
              },
            ]}>
            {orderDetails?.status === 8 ? 'Completed' : 'In Transit'}
          </Text>
        </View>
        <View
          style={{
            ...styles.stepBodyView,
            borderLeftWidth: 0,
            paddingBottom: 0,
          }}>
          <Text
            style={[
              styles.subHeaderText,
              {
                opacity: orderDetails?.status === 8 ? 1 : 0.8,
              },
            ]}>
            {orderDetails?.status < 7
              ? 'Pending'
              : orderDetails?.status === 7
              ? 'On Going'
              : 'Completed at ' +
                moment(
                  orderDetails?.status_history?.find((item) => item.status == 8)
                    ?.created_at,
                ).format('MMMM Do YYYY, h:mm A')}
          </Text>
        </View>
      </View>
      <CustomModalAndroid
        visible={driverAssignVisible}
        title={'ASSIGN DRIVER'}
        onPress={() => setDriverAssignVisible(false)}>
        <View style={{marginVertical: hp(2)}}>
          <SelectionModal
            value={driverAssignData?.driver_id}
            label={'Driver'}
            width={wp(90)}
            items={driverList}
            onChangeItem={(text) =>
              setDriverAssignData({...driverAssignData, driver_id: text})
            }
          />
        </View>
        <View style={{marginVertical: hp(2)}}>
          <SelectionModal
            value={driverAssignData?.vehicle_id}
            label={'Vehicle'}
            width={wp(90)}
            items={vehicleList}
            onChangeItem={(text) =>
              setDriverAssignData({...driverAssignData, vehicle_id: text})
            }
          />
        </View>
        <FlatButton
          label={'assign'}
          onPress={() => {
            if (
              driverAssignData?.driver_id === null ||
              driverAssignData?.vehicle_id === null
            ) {
              CustomAlert('Please fill all the fields');
            } else {
              // Call Driver assign API
              setLoading(true);
              let obj = {
                url: 'bookings/driver',
                method: 'post',
                headers: {
                  Authorization:
                    'Bearer ' + STORE.getState().Login?.loginData?.token,
                },
                data: {
                  ...driverAssignData,
                  public_booking_id: orderDetails?.public_booking_id,
                },
              };
              APICall(obj)
                .then((res) => {
                  setLoading(false);
                  if (res?.data?.status === 'success') {
                    CustomAlert('Driver Assigned successfully');
                    setDriverAssignVisible(false);
                    fetchOrderData();
                  } else {
                    CustomAlert(res?.data?.message);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  CustomAlert(err?.message);
                });
            }
          }}
        />
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={pinModalVisible}
        title={'PIN VERIFICATION'}
        onPress={() => setPinModalVisible(false)}>
        <View
          style={{
            width: '85%',
            marginVertical: hp(2),
            alignItems: 'center',
          }}>
          <Text style={STYLES.inputTextLabel}>
            Enter your 4 digit pin below
          </Text>
          <View
            style={{
              height: hp(13),
              width: hp(28),
            }}>
            <OTPInputView
              pinCount={4}
              code={pin?.toString()}
              onCodeChanged={(code) => setPin(code)}
              codeInputFieldStyle={[
                styles.textInput,
                {
                  borderColor: pinError ? Colors.red : Colors.silver,
                },
              ]}
              codeInputHighlightStyle={[
                styles.textInput,
                {borderColor: '#243C99'},
              ]}
            />
          </View>
        </View>
        <FlatButton
          isLoading={isLoading}
          label={'submit'}
          onPress={() => {
            if (pin.length !== 4) {
              setPinError(true);
            } else {
              setPinError(false);
              setLoading(true);
              let obj = {
                url:
                  orderDetails?.status === 6
                    ? 'bookings/trip/start'
                    : 'bookings/trip/end',
                method: 'post',
                headers: {
                  Authorization:
                    'Bearer ' + STORE.getState().Login?.loginData?.token,
                },
                data: {
                  public_booking_id: orderDetails?.public_booking_id,
                  pin: pin,
                },
              };
              APICall(obj)
                .then((res) => {
                  setLoading(false);
                  if (res?.data?.status === 'success') {
                    CustomAlert(
                      orderDetails?.status === 6
                        ? 'Start trip successfully'
                        : 'End trip successfully',
                    );
                    setPin('');
                    setPinError(false);
                    setPinModalVisible(false);
                    fetchOrderData();
                  } else {
                    CustomAlert(res?.data?.message);
                  }
                })
                .catch((err) => {
                  setLoading(false);
                  CustomAlert(err?.message);
                });
            }
          }}
        />
      </CustomModalAndroid>
    </View>
  );
};

export default OrderStatusWin;

const styles = StyleSheet.create({
  warningText: {
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Italic',
    color: Colors.inputTextColor,
    marginLeft: 5,
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
  dotView: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
  },
  stepHeaderText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.darkBlue,
    fontSize: wp(4),
    marginLeft: 10,
    textTransform: 'uppercase',
  },
  stepBodyView: {
    borderLeftWidth: 1,
    borderColor: Colors.darkBlue,
    marginLeft: 10,
    paddingLeft: 20,
    paddingBottom: hp(3),
  },
  inputForm: {
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: hp(2),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginVertical: hp(1),
  },
  subHeaderText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(3),
    color: Colors.darkBlue,
    textTransform: 'capitalize',
  },
  driverView: {
    position: 'absolute',
    textAlign: 'right',
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: Colors.btnBG,
    color: Colors.white,
    borderRadius: 10,
    right: 0,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    height: hp(6.5),
    width: hp(6.5),
    borderColor: Colors.silver,
    color: Colors.textLabelColor,
    fontSize: wp(6),
  },
});
