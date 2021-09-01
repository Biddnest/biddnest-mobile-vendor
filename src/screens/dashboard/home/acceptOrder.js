import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput as TextInputReal,
} from 'react-native';
import {STYLES} from '../../../constant/commonStyle';
import CloseIcon from '../../../components/closeIcon';
import {Colors, hp, wp} from '../../../constant/colors';
import CustomModalAndroid from '../../../components/customModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TextInput from '../../../components/textInput';
import FlatButton from '../../../components/flatButton';
import Slider from 'rn-range-slider';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Calendar} from 'react-native-calendars';
import {Input} from 'react-native-elements';
import BidSuccess from '../../../assets/svg/bid_success.svg';
import SelectionModalAndroid from '../../../components/selectionModal';
import TwoButton from '../../../components/twoButton';

const AcceptOrder = (props) => {
  const {priceList, public_booking_id, orderDetails} = props;
  const [step, setStep] = useState(0);
  const [openCalender, setCalender] = useState(false);
  const [forgotPin, setForgotPin] = useState(false);
  const [calenderDate, setCalenderDate] = useState();
  const [success, setSuccess] = useState(false);
  const [priceWarning, setPriceWarning] = useState(false);
  const configData =
    useSelector((state) => state.Login?.configData?.enums?.service) || {};
  const [applyBidData, setApplyBidData] = useState({
    public_booking_id: public_booking_id,
    type_of_movement: 'dedicated',
    moving_date: null,
    vehicle_type: 'tempo',
    man_power: {
      min: 1,
      max: 100,
    },
    pin: '',
  });
  const [stepData, setStepData] = useState({
    inventory: [],
    bid_amount: orderDetails?.final_estimated_quote,
  });
  const [manPower, setManPower] = useState({
    min: 1,
    max: 100,
  });
  const [manPowerRange, setManPowerRange] = useState({
    min: 1,
    max: 100,
  });
  const [manPowerTempRange, setManPowerTempRange] = useState({
    min: 1,
    max: 100,
  });
  const [errorPin, setErrorPin] = useState(false);
  const [errorDate, setErrorDate] = useState(undefined);
  const [modalData, setModalData] = useState({
    password: '',
    pin: 0,
  });
  const [error, setError] = useState({
    password: undefined,
    pin: undefined,
  });
  let source_meta =
    (orderDetails?.source_meta &&
      JSON.parse(orderDetails?.source_meta?.toString())) ||
    {};
  const [isLoading, setLoading] = useState(false);
  const [dateArray, setDateArray] = useState({});
  const [disableFieldsModal, setDisableFieldsModal] = useState('');
  const [disableFields, setDisableFields] = useState('');

  useEffect(() => {
    let temp = {...dateArray};
    orderDetails?.movement_dates?.forEach((item, index) => {
      temp[item?.date] = {
        customStyles: {
          text: {
            color: Colors.inputTextColor,
          },
        },
      };
    });
    setDateArray(temp);
  }, [orderDetails]);

  useEffect(() => {
    if (priceList?.inventories?.length > 0) {
      let temp = [];
      priceList?.inventories.forEach((item) => {
        temp.push({
          booking_inventory_id: item?.bid_inventory_id,
          amount: item?.price || 0,
        });
      });
      setStepData({
        inventory: temp,
        bid_amount: priceList?.total,
      });
    }
  }, [priceList]);
  const handleValueChange = useCallback((low, high) => {
    setManPower({
      min: low,
      max: high,
    });
  }, []);
  const renderStep0 = () => {
    return (
      <ScrollView
        contentContainerStyle={{width: '100%', alignItems: 'center'}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={{width: '90%', marginTop: hp(2), marginBottom: hp(15)}}>
          <View style={styles.tableView}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                padding: hp(2),
              }}>
              <Text
                style={{flex: 1, ...STYLES.staticLabel, color: Colors.white}}>
                Item Details
              </Text>
              <Text
                style={{
                  flex: 1,
                  ...STYLES.staticLabel,
                  color: Colors.white,
                  textAlign: 'center',
                }}>
                Price
              </Text>
            </View>
            <FlatList
              // scrollEnabled={false}
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{backgroundColor: Colors.white}}
              data={priceList?.inventories || []}
              extraData={priceList?.inventories}
              renderItem={({item, index}) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      paddingHorizontal: hp(2),
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          STYLES.modalHeaderText,
                          {textAlign: 'left', marginTop: hp(1)},
                        ]}>
                        {item?.name}
                      </Text>
                      <Text
                        style={[
                          STYLES.modalHeaderText,
                          {textAlign: 'left', marginTop: 1},
                        ]}>
                        Quantity: x
                        {configData?.inventory_quantity_type.range ===
                        orderDetails?.inventories[index]?.quantity_type
                          ? JSON.parse(
                              orderDetails?.inventories[
                                index
                              ]?.quantity?.toString(),
                            )?.min +
                            '-' +
                            JSON.parse(
                              orderDetails?.inventories[
                                index
                              ]?.quantity?.toString(),
                            )?.max
                          : orderDetails?.inventories[index]?.quantity}
                      </Text>
                      <Text
                        style={[
                          STYLES.modalHeaderText,
                          {
                            textAlign: 'left',
                            marginTop: 1,
                            textTransform: 'capitalize',
                          },
                        ]}>
                        {item?.size} / {item?.material}
                      </Text>
                    </View>
                    <View style={{width: '40%'}}>
                      <TextInput
                        label={''}
                        value={stepData?.inventory[index]?.amount?.toString()}
                        inputStyle={{textAlign: 'center'}}
                        placeHolder={'4200'}
                        keyboard={'decimal-pad'}
                        disable={disableFields === 'totalPrice'}
                        onChange={(text) => {
                          if (disableFields !== 'singlePrice') {
                            setDisableFieldsModal('singlePrice');
                          } else {
                            let temp = [...stepData.inventory];
                            temp[index].amount = text;
                            setStepData({...stepData, inventory: temp});
                          }
                        }}
                        onBlur={() => {
                          let temp = [...stepData?.inventory];
                          let amount = 0;
                          temp?.forEach((i, ind) => {
                            amount = amount + parseFloat(i?.amount || 0);
                          });
                          if (amount > 0) {
                            setStepData({...stepData, bid_amount: amount});
                          }
                        }}
                      />
                    </View>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={[STYLES.separatorView, {marginTop: 0}]} />
              )}
            />
          </View>
          <View style={styles.flexBoxWrapper}>
            <EvilIcons
              name={'exclamation'}
              size={hp(2.7)}
              color={Colors.inputTextColor}
            />
            <Text style={styles.warningText}>
              You can directly change the quote here and set a new price.
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: hp(2),
              marginTop: hp(1),
            }}>
            <Text
              style={{
                flex: 1,
                ...STYLES.leftText,
              }}>
              total price
            </Text>
            <View style={{width: '40%'}}>
              <TextInput
                inputStyle={{textAlign: 'center'}}
                label={''}
                value={stepData?.bid_amount?.toString()}
                placeHolder={'4200'}
                disable={disableFields === 'singlePrice'}
                keyboard={'decimal-pad'}
                onChange={(text) => {
                  if (disableFields !== 'totalPrice') {
                    setDisableFieldsModal('totalPrice');
                  } else {
                    setStepData({...stepData, bid_amount: text});
                  }
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: hp(2),
              backgroundColor: Colors.darkBlue,
              justifyContent: 'space-between',
              borderRadius: hp(1),
            }}>
            <Text
              style={{
                flex: 1,
                ...STYLES.leftText,
                color: Colors.white,
              }}>
              expected price
            </Text>
            <View
              style={{
                height: hp(6.5),
              }}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  color: Colors.white,
                  fontFamily: 'Gilroy-SemiBold',
                  fontSize: hp(2.2),
                  height: '98%',
                }}>
                {orderDetails?.final_estimated_quote}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  if (success) {
    return (
      <CustomModalAndroid
        onPress={() => {
          setStepData({
            ...stepData,
            bid_amount: orderDetails?.final_estimated_quote,
          });
          setStep(0);
          setSuccess(false);
          setForgotPin(false);
          props.onCloseIcon();
        }}
        visible={props.visible}
        maxHeight={hp(90)}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: hp(4),
          }}>
          <BidSuccess height={wp(23)} width={wp(23)} />
          <Text
            style={{
              marginHorizontal: wp(25),
              fontSize: hp(2.8),
              color: Colors.darkBlue,
              fontFamily: 'Gilroy-Bold',
              textAlign: 'center',
              marginVertical: hp(2),
            }}>
            You have successfully placed your "BID"
          </Text>
        </View>
        <FlatButton
          label={'Okay'}
          onPress={() => {
            setStepData({
              ...stepData,
              bid_amount: orderDetails?.final_estimated_quote,
            });
            setStep(0);
            setSuccess(false);
            setForgotPin(false);
            props.onCloseIcon();
          }}
        />
      </CustomModalAndroid>
    );
  } else {
    return (
      <CustomModalAndroid visible={props.visible} maxHeight={hp(90)}>
        {step === 1 && (
          <Pressable
            onPress={() => setStep(0)}
            style={{
              position: 'absolute',
              left: hp(2),
              top: hp(2.5),
            }}>
            <Ionicons
              name="arrow-back-sharp"
              size={hp(3.5)}
              color={Colors.black}
            />
          </Pressable>
        )}
        <Text style={STYLES.modalHeaderText}>
          {forgotPin ? 'FORGOT PASSWORD' : 'APPLY FOR BID'}
        </Text>
        <CloseIcon
          onPress={() => {
            setStepData({
              ...stepData,
              bid_amount: orderDetails?.final_estimated_quote,
            });
            setDisableFieldsModal('');
            setDisableFields('');
            setStep(0);
            setForgotPin(false);
            props.onCloseIcon();
          }}
        />
        <View style={{flex: 1, maxHeight: hp(73), width: '90%'}}>
          {step === 0 ? (
            renderStep0()
          ) : step === 1 ? (
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                width: '100%',
                alignItems: 'center',
                marginTop: hp(2),
              }}>
              <SelectionModalAndroid
                style={{
                  marginVertical: hp(2),
                }}
                value={applyBidData?.type_of_movement}
                label={'Type Of Movement'}
                width={wp(90)}
                items={
                  source_meta?.shared_service == true ||
                  source_meta?.shared_service == 'true' ||
                  source_meta?.shared_service == 1 ||
                  source_meta?.shared_service == '1'
                    ? [
                        {label: 'Shared', value: 'shared'},
                        {label: 'Dedicated', value: 'dedicated'},
                      ]
                    : [{label: 'Dedicated', value: 'dedicated'}]
                }
                onChangeItem={(text) => {
                  setApplyBidData({
                    ...applyBidData,
                    type_of_movement: text,
                  });
                }}
              />
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  marginTop: -hp(2),
                  zIndex: -1,
                }}>
                <View style={{width: '100%', alignSelf: 'center'}}>
                  <Pressable
                    style={{marginTop: hp(3)}}
                    onPress={() => setCalender(true)}>
                    <Input
                      placeholder={'Moving Date'}
                      disabled={true}
                      label={'Moving Date'}
                      value={
                        applyBidData?.moving_date &&
                        applyBidData?.moving_date !== 'Invalid date' &&
                        moment(applyBidData?.moving_date).format('D MMM yyyy')
                      }
                      rightIcon={() => {
                        return (
                          <MaterialIcons
                            name="calendar-today"
                            size={hp(3)}
                            color={Colors.grey}
                          />
                        );
                      }}
                      inputContainerStyle={{
                        borderWidth: 2,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        height: hp(6.5),
                        marginTop: hp(1),
                        borderColor:
                          errorDate === false ? Colors.red : Colors.silver,
                        borderBottomWidth: 2,
                      }}
                      labelStyle={{
                        fontFamily: 'Roboto-Bold',
                        color: Colors.textLabelColor,
                        fontSize: hp(2.2),
                      }}
                      inputStyle={{
                        fontSize: hp(2.2),
                        backgroundColor: Colors.textBG,
                        color: Colors.inputTextColor,
                        height: '99%',
                      }}
                    />
                  </Pressable>
                  <CustomModalAndroid
                    visible={openCalender}
                    title={'Choose Date'}
                    onPress={() => {
                      setCalender(false);
                    }}>
                    <Calendar
                      markingType={'custom'}
                      markedDates={dateArray}
                      style={{width: wp(90), height: hp(50)}}
                      current={Object.keys(dateArray)[0]}
                      // minDate={new Date()}
                      onDayPress={(day) => {
                        let ind = Object.keys(dateArray).findIndex(
                          (item) => item === day?.dateString,
                        );
                        if (ind >= 0) {
                          let temp = {...dateArray};

                          Object.keys(temp).forEach((i, index) => {
                            if (i === day?.dateString) {
                              temp[day?.dateString] = temp[day?.dateString]
                                ?.customStyles?.text?.color
                                ? {
                                    selected: true,
                                    selectedColor: Colors.btnBG,
                                  }
                                : {
                                    customStyles: {
                                      text: {
                                        color: Colors.inputTextColor,
                                      },
                                    },
                                  };
                            } else {
                              temp[i] = {
                                customStyles: {
                                  text: {
                                    color: Colors.inputTextColor,
                                  },
                                },
                              };
                            }
                          });
                          setDateArray(temp);
                          setCalenderDate(
                            day?.dateString === calenderDate
                              ? null
                              : day?.dateString,
                          );
                        }
                      }}
                      monthFormat={'MMM yyyy'}
                      showWeekNumbers={true}
                      onPressArrowLeft={(subtractMonth) => subtractMonth()}
                      onPressArrowRight={(addMonth) => addMonth()}
                      disableAllTouchEventsForDisabledDays={true}
                      enableSwipeMonths={true}
                      theme={{
                        dayTextColor: Colors.silver,
                        todayTextColor: Colors.silver,
                        arrowColor: Colors.btnBG,
                      }}
                    />
                    <FlatButton
                      label={'OKAY'}
                      onPress={() => {
                        setApplyBidData({
                          ...applyBidData,
                          moving_date:
                            moment(calenderDate).format('yyyy-MM-DD'),
                        });
                        setCalender(false);
                      }}
                    />
                  </CustomModalAndroid>
                </View>
                <Text style={styles.dateBottomText}>
                  Select preferred moving date.
                </Text>
              </View>
              <View style={{marginBottom: hp(2), marginTop: hp(2)}}>
                <SelectionModalAndroid
                  value={applyBidData?.vehicle_type}
                  label={'Vehicle Type'}
                  width={wp(90)}
                  items={[{label: 'Tempo', value: 'tempo'}]}
                  onChangeItem={(text) => {
                    setApplyBidData({
                      ...applyBidData,
                      vehicle_type: text,
                    });
                  }}
                />
              </View>
              <View style={{marginBottom: hp(3)}}>
                <Text style={STYLES.inputTextLabel}>
                  Minimum and Maximum Number of Man Power
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    overflow: 'hidden',
                    marginTop: hp(0.5),
                  }}>
                  <View style={styles.manPowerView}>
                    <TextInputReal
                      style={[
                        STYLES.inputTextStyle,
                        {
                          height: 'auto',
                          width: '100%',
                          textAlign: 'center',
                          borderRadius: 10,
                        },
                      ]}
                      onChangeText={(text) => {
                        setManPowerTempRange({
                          ...manPowerTempRange,
                          min: text,
                        });
                      }}
                      onBlur={() => {
                        if (
                          manPowerTempRange?.min > 0 &&
                          manPowerTempRange?.min < manPowerTempRange?.max
                        ) {
                          setManPowerRange({
                            ...manPowerRange,
                            min: manPowerTempRange?.min,
                          });
                        } else {
                          setManPowerTempRange(manPowerRange);
                        }
                      }}
                      value={manPowerTempRange?.min?.toString()}
                      keyboardType="numeric"
                    />
                  </View>
                  <Slider
                    style={styles.sliderStyle}
                    min={
                      parseInt(manPowerRange?.min) || parseInt(manPower?.min)
                    }
                    max={
                      parseInt(manPowerRange?.max) || parseInt(manPower?.max)
                    }
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
                    renderRailSelected={() => (
                      <View style={STYLES.sliderRail} />
                    )}
                    renderLabel={(value) => (
                      <Text style={STYLES.sliderLabel}>{value}</Text>
                    )}
                    onValueChanged={handleValueChange}
                  />
                  <View style={styles.manPowerView}>
                    <TextInputReal
                      style={[
                        STYLES.inputTextStyle,
                        {
                          height: 'auto',
                          width: '100%',
                          textAlign: 'center',
                          borderRadius: 10,
                        },
                      ]}
                      onChangeText={(text) => {
                        setManPowerTempRange({
                          ...manPowerTempRange,
                          max: text,
                        });
                      }}
                      value={manPowerTempRange?.max?.toString()}
                      onBlur={() => {
                        if (
                          manPowerTempRange?.max > 0 &&
                          manPowerTempRange?.min < manPowerTempRange?.max
                        ) {
                          setManPowerRange({
                            ...manPowerRange,
                            max: manPowerTempRange?.max,
                          });
                        } else {
                          setManPowerTempRange(manPowerRange);
                        }
                      }}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 0,
                  }}>
                  <Text
                    style={[
                      styles.dateBottomText,
                      {
                        fontFamily: 'Roboto-Regular',
                        marginTop: 0,
                      },
                    ]}>
                    Min
                  </Text>
                  <Text
                    style={[
                      styles.dateBottomText,
                      {
                        fontFamily: 'Roboto-Regular',
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: wp(3),
                      },
                    ]}>
                    Max
                  </Text>
                </View>
              </View>
            </ScrollView>
          ) : (
            <View style={{width: wp(90), alignItems: 'center'}}>
              {(forgotPin && (
                <View
                  style={{
                    width: '100%',
                    marginVertical: hp(2),
                  }}>
                  <TextInput
                    label={'Password *'}
                    secureTextEntry={true}
                    placeHolder={'**********'}
                    isRight={error.password}
                    onChange={(text) =>
                      setModalData({...modalData, password: text})
                    }
                  />
                  <View style={{marginLeft: wp(2)}}>
                    <Text style={STYLES.inputTextLabel}>New 4 digit PIN</Text>
                    <View
                      style={{
                        height: hp(9),
                        width: hp(40),
                        alignSelf: 'center',
                        // backgroundColor: 'pink'
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
              )) || (
                <View
                  style={{
                    width: '100%',
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
                      onCodeChanged={(text) =>
                        setApplyBidData({...applyBidData, pin: parseInt(text)})
                      }
                      codeInputFieldStyle={[
                        styles.textInput,
                        {
                          borderColor:
                            errorPin === true ? Colors.red : Colors.silver,
                        },
                      ]}
                      codeInputHighlightStyle={[
                        styles.textInput,
                        {borderColor: '#243C99'},
                      ]}
                    />
                  </View>
                  <Text
                    style={[STYLES.inputTextLabel, {color: Colors.darkBlue}]}
                    onPress={() => setForgotPin(true)}>
                    Forgot PIN?
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        {!success && (
          <FlatButton
            isLaoding={isLoading}
            label={
              step === 0 ? 'next' : step === 1 ? 'place your bid' : 'submit'
            }
            onPress={() => {
              if (step === 0) {
                if (parseInt(stepData?.bid_amount) > 0) {
                  if (
                    parseFloat(stepData?.bid_amount) >=
                      parseFloat(
                        orderDetails?.final_estimated_quote.replace(/,/g, ''),
                      ) /
                        2 &&
                    parseFloat(stepData?.bid_amount) <=
                      parseFloat(
                        orderDetails?.final_estimated_quote.replace(/,/g, ''),
                      ) *
                        2
                  ) {
                    setStep(1);
                  } else {
                    setPriceWarning(true);
                  }
                } else {
                  CustomAlert('Total price shoule not be zero');
                }
              } else if (step === 1) {
                if (
                  applyBidData?.moving_date &&
                  applyBidData?.moving_date !== 'Invalid date'
                ) {
                  setApplyBidData({
                    ...applyBidData,
                    man_power: manPower,
                  });
                  setErrorDate(true);
                  setStep(2);
                } else {
                  setErrorDate(false);
                }
              } else {
                setLoading(true);
                if (forgotPin) {
                  let tempError = {};
                  setLoading(true);
                  tempError.password = !(
                    !modalData.password || modalData.password.length === 0
                  );
                  tempError.password = !!modalData.password;
                  tempError.pin = !(
                    !modalData.pin || modalData.pin.length !== 4
                  );
                  setError(tempError);
                  if (
                    Object.values(tempError).findIndex(
                      (item) => item === false,
                    ) === -1
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
                          setStep(2);
                          setForgotPin(false);
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
                } else {
                  // Bid Submit API
                  if (applyBidData?.pin === 0) {
                    setErrorPin(true);
                    setLoading(false);
                  } else {
                    setErrorPin(false);
                    let obj = {
                      url: 'bookings/submit',
                      method: 'post',
                      headers: {
                        Authorization:
                          'Bearer ' + STORE.getState().Login?.loginData?.token,
                      },
                      data: {...applyBidData, ...stepData},
                    };
                    APICall(obj)
                      .then((res) => {
                        setLoading(false);
                        if (res?.data?.status === 'success') {
                          props?.socket.emit('booking.bid.submitted', {
                            token: STORE.getState().Login?.loginData?.token,
                            data: {
                              public_booking_id:
                                orderDetails?.public_booking_id,
                            },
                          });
                          props?.socket.emit('booking.watch.stop', {
                            token: STORE.getState().Login?.loginData?.token,
                            data: {
                              public_booking_id:
                                orderDetails?.public_booking_id,
                            },
                          });
                          setSuccess(true);
                          setStep(0);
                          setForgotPin(false);
                        } else {
                          CustomAlert(res?.data?.message);
                          // setTimeout(() => {
                          //   setStep(0);
                          //   setForgotPin(false);
                          //   props.onCloseIcon();
                          // }, 1500);
                        }
                      })
                      .catch((err) => {
                        setLoading(false);
                        CustomAlert(err?.message);
                      });
                  }
                }
              }
            }}
          />
        )}
        <CustomModalAndroid
          visible={disableFieldsModal !== ''}
          title={'Warning'}
          onPress={() => setDisableFieldsModal('')}>
          <View
            style={{
              marginTop: hp(4),
              marginBottom: hp(2),
              marginHorizontal: wp(15),
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: hp(2.2),
                color: Colors.inputTextColor,
                marginBottom: hp(2),
                textAlign: 'center',
              }}>
              Are you sure? You want to change{' '}
              {disableFieldsModal === 'singlePrice' ? 'Single item' : 'Total'}{' '}
              price. You will not be able to edit{' '}
              {disableFieldsModal === 'singlePrice' ? 'Total' : 'Single item'}{' '}
              price.
            </Text>
          </View>
          <TwoButton
            leftLabel={'Cancel'}
            rightLabel={'Okay'}
            isLoading={isLoading}
            leftOnPress={() => {
              setDisableFieldsModal('');
            }}
            rightOnPress={() => {
              setDisableFields(disableFieldsModal);
              setDisableFieldsModal('');
            }}
          />
        </CustomModalAndroid>
        <CustomModalAndroid
          visible={!!priceWarning}
          title={'Warning'}
          onPress={() => setPriceWarning(false)}>
          <View
            style={{
              marginTop: hp(4),
              marginBottom: hp(2),
              marginHorizontal: wp(15),
            }}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: hp(2.2),
                color: Colors.inputTextColor,
                marginBottom: hp(2),
                textAlign: 'center',
              }}>
              Your bid amount is too low/high than the expected price. are you
              sure want to proceed with this?
            </Text>
          </View>
          <TwoButton
            leftLabel={'no'}
            rightLabel={'Yes'}
            isLoading={isLoading}
            leftOnPress={() => setPriceWarning(false)}
            rightOnPress={() => {
              setPriceWarning(false);
              setStep(1);
            }}
          />
        </CustomModalAndroid>
      </CustomModalAndroid>
    );
  }
};

export default AcceptOrder;

const styles = StyleSheet.create({
  tableView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.silver,
    backgroundColor: Colors.darkBlue,
    overflow: 'hidden',
  },
  flexBoxWrapper: {
    width: '100%',
    marginTop: hp(2),
    backgroundColor: '#FDFAE8',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  warningText: {
    fontSize: hp(1.9),
    fontFamily: 'Roboto-Italic',
    color: Colors.inputTextColor,
    marginLeft: 5,
    width: '93%',
  },
  dateBottomText: {
    fontFamily: 'Roboto-Italic',
    fontSize: hp(1.9),
    color: '#99A0A5',
    marginLeft: wp(5),
    marginTop: -hp(2),
  },
  sliderStyle: {
    width: wp(52),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  manPowerView: {
    borderWidth: 2,
    borderRadius: 10,
    height: wp(12),
    width: wp(14),
    marginVertical: hp(1),
    borderColor: Colors.silver,
    ...STYLES.common,
  },
  textInput: {
    borderWidth: 2,
    borderRadius: 10,
    height: hp(6.5),
    width: hp(6.5),
    borderColor: Colors.silver,
    color: Colors.textLabelColor,
    fontSize: hp(3),
  },
});
