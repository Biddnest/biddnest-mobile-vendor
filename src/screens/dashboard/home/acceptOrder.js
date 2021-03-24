import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import {STYLES} from '../../../constant/commonStyle';
import CloseIcon from '../../../components/closeIcon';
import {Colors, hp, wp} from '../../../constant/colors';
import CustomModalAndroid from '../../../components/customModal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import TextInput from '../../../components/textInput';
import FlatButton from '../../../components/flatButton';
import DropDown from '../../../components/dropDown';
import Slider from 'rn-range-slider';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert, resetNavigator} from '../../../constant/commonFun';
import {useSelector} from 'react-redux';

const AcceptOrder = (props) => {
  const {priceList, public_booking_id, orderDetails} = props;
  const [step, setStep] = useState(0);
  const [forgotPin, setForgotPin] = useState(false);
  const configData =
    useSelector((state) => state.Login?.configData?.enums?.service) || {};
  const [applyBidData, setApplyBidData] = useState({
    public_booking_id: public_booking_id,
    inventory: [],
    bid_amount: 0,
    type_of_movement: 'shared',
    moving_date: moment(new Date()).format('yyyy-MM-DD'),
    vehicle_type: 'tempo',
    man_power: {
      min: 2,
      max: 4,
    },
    pin: '',
  });
  const [errorPin, setErrorPin] = useState(false);
  const [modalData, setModalData] = useState({
    password: '',
    pin: 0,
  });
  const [error, setError] = useState({
    password: undefined,
    pin: undefined,
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (priceList?.inventories?.length > 0) {
      let temp = [];
      priceList?.inventories.forEach((item) => {
        temp.push({
          booking_inventory_id: item?.bid_inventory_id || 0,
          amount: item?.price || 0,
        });
      });
      setApplyBidData({
        ...applyBidData,
        inventory: temp,
      });
    }
  }, [priceList]);
  const handleValueChange = useCallback((low, high) => {
    let temp = {...applyBidData.man_power};
    temp.min = low;
    temp.max = high;
    setApplyBidData({...applyBidData, man_power: temp});
  }, []);
  const renderStep0 = () => {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={styles.flexBoxWrapper}>
          <EvilIcons
            name={'exclamation'}
            size={20}
            color={Colors.inputTextColor}
          />
          <Text style={styles.warningText}>
            You can directly change the quote here and set a new price.
          </Text>
        </View>
        <View style={{width: '85%', marginTop: hp(2)}}>
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
              bounces={false}
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
                        style={[STYLES.modalHeaderText, {textAlign: 'left'}]}>
                        {item?.name}
                      </Text>
                      <Text
                        style={[
                          STYLES.modalHeaderText,
                          {textAlign: 'left', marginTop: 1},
                        ]}>
                        Quantity:{' '}
                        {configData?.inventory_quantity_type.range ===
                        orderDetails?.inventories[index]?.quantity_type
                          ? orderDetails?.inventories[index]?.quantity?.min +
                            '-' +
                            orderDetails?.inventories[index]?.quantity?.max
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
                        Size: {item?.size}
                      </Text>
                    </View>
                    <View style={{width: '40%'}}>
                      <TextInput
                        label={''}
                        value={applyBidData?.inventory[
                          index
                        ]?.amount?.toString()}
                        inputStyle={{textAlign: 'center'}}
                        placeHolder={'4200'}
                        keyboard={'decimal-pad'}
                        onChange={(text) => {
                          let temp = [...applyBidData.inventory];
                          temp[index].amount = text;
                          setApplyBidData({...applyBidData, inventory: temp});
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: hp(2),
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
                value={applyBidData?.bid_amount?.toString()}
                placeHolder={'4200'}
                keyboard={'decimal-pad'}
                onChange={(text) =>
                  setApplyBidData({...applyBidData, bid_amount: text})
                }
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <CustomModalAndroid visible={props.visible} maxHeight={hp(90)}>
      <View style={STYLES.modalHeaderView}>
        {step === 1 && (
          <Pressable
            onPress={() => setStep(0)}
            style={{
              position: 'absolute',
              left: 10,
            }}>
            <Ionicons name="arrow-back-sharp" size={25} color={'#C9CDCF'} />
          </Pressable>
        )}
        <Text style={STYLES.modalHeaderText}>APPLY FOR BID</Text>
        <CloseIcon
          style={{
            position: 'absolute',
            right: 10,
          }}
          onPress={() => {
            setStep(0);
            setForgotPin(false);
            props.onCloseIcon();
          }}
        />
      </View>
      <View style={{...STYLES.separatorView, width: '85%'}} />
      {step === 0 ? (
        renderStep0()
      ) : step === 1 ? (
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              marginBottom: hp(2),
              marginTop: hp(2),
              zIndex: Platform.OS !== 'android' ? 5001 : 11,
            }}>
            <DropDown
              label={'Type Of Movement'}
              width={wp(90)}
              items={[{label: 'Shared', value: 'shared'}]}
              onChangeItem={(text) => {}}
            />
          </View>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <View style={{width: '92%', marginHorizontal: wp(3)}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  color: Colors.textLabelColor,
                  fontSize: wp(4),
                }}>
                Moving Date
              </Text>
              <View
                style={{
                  marginTop: hp(1),
                  marginBottom: hp(3),
                  borderWidth: 2,
                  // paddingHorizontal: 15,
                  borderRadius: 10,
                  height: hp(6.5),
                  borderColor: Colors.silver,
                  backgroundColor: Colors.white,
                }}>
                <DatePicker
                  style={{
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                  date={moment(applyBidData?.moving_date).format('D MMM yyyy')}
                  mode="date"
                  placeholder="select date"
                  format="D MMM yyyy"
                  minDate={new Date()}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  iconComponent={
                    <Entypo
                      name={'calendar'}
                      size={25}
                      color={Colors.inputTextColor}
                      style={{
                        position: 'absolute',
                        right: 8,
                        top: 7,
                        marginLeft: 0,
                      }}
                    />
                  }
                  customStyles={{
                    dateInput: {
                      borderWidth: 0,
                      height: hp(6.5),
                      marginTop: 1,
                      width: '100%',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingHorizontal: 15,
                    },
                    dateText: {
                      fontSize: wp(4),
                      backgroundColor: Colors.textBG,
                      color: Colors.inputTextColor,
                      justifyContent: 'flex-start',
                    },
                  }}
                  onDateChange={(date) => {
                    setApplyBidData({
                      ...applyBidData,
                      moving_date: moment(date).format('yyyy-MM-DD'),
                    });
                  }}
                />
              </View>
            </View>
            <Text style={styles.dateBottomText}>
              Select preferred moving date.
            </Text>
          </View>
          <View style={{marginBottom: hp(2), marginTop: hp(2)}}>
            <DropDown
              label={'Vendor Type'}
              width={wp(90)}
              items={[{label: 'Tempo', value: 'tempo'}]}
              onChangeItem={(text) => {}}
            />
          </View>
          <View style={{marginBottom: hp(3)}}>
            <Text style={STYLES.inputTextLabel}>
              Minimun and Maximum Number of Man Power
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.manPowerView}>
                <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                  {applyBidData?.man_power?.min}
                </Text>
              </View>
              <Slider
                style={styles.sliderStyle}
                min={1}
                max={5}
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
                onValueChanged={handleValueChange}
              />
              <View style={styles.manPowerView}>
                <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                  {applyBidData?.man_power?.max}
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
        </View>
      ) : (
        <View style={{width: '100%', alignItems: 'center'}}>
          {(forgotPin && (
            <View
              style={{
                width: '85%',
                marginVertical: hp(2),
              }}>
              <TextInput
                label={'Password'}
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
          )) || (
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
      <FlatButton
        isLaoding={isLoading}
        label={step === 0 ? 'next' : step === 1 ? 'place your bid' : 'submit'}
        onPress={() => {
          if (step === 0) {
            setStep(1);
          } else if (step === 1) {
            setStep(2);
          } else {
            setLoading(true);
            if (forgotPin) {
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
                  data: applyBidData,
                };
                APICall(obj)
                  .then((res) => {
                    setLoading(false);
                    if (res?.data?.status === 'success') {
                      setStep(0);
                      setForgotPin(false);
                      resetNavigator(props.navigator, 'Dashboard');
                      props.onCloseIcon();
                    } else {
                      CustomAlert(res?.data?.message);
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
    </CustomModalAndroid>
  );
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
    width: '85%',
    marginTop: hp(2),
    backgroundColor: '#FDFAE8',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  warningText: {
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Italic',
    color: Colors.inputTextColor,
    marginLeft: 5,
  },
  dateBottomText: {
    fontFamily: 'Roboto-Italic',
    fontSize: wp(3.5),
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
    fontSize: wp(6),
  },
});
