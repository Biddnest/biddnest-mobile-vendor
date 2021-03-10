import React, {useCallback, useState} from 'react';
import {FlatList, Text, View, StyleSheet, ScrollView} from 'react-native';
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
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import TwoButton from '../../../components/twoButton';

const AcceptOrder = (props) => {
  const [step, setStep] = useState(0);
  const [low, setLow] = useState(2);
  const [high, setHigh] = useState(4);
  const [forgotPin, setForgotPin] = useState(false);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);
  const renderStep0 = () => {
    return (
      <View style={{marginHorizontal: hp(3), alignItems: 'center'}}>
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
        <View style={{width: '100%', marginTop: hp(2)}}>
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
              data={[1, 2, 3]}
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
                        Capboards
                      </Text>
                      <Text
                        style={[
                          STYLES.modalHeaderText,
                          {textAlign: 'left', marginTop: 1},
                        ]}>
                        Quantity: 2
                      </Text>
                      <Text
                        style={[
                          STYLES.modalHeaderText,
                          {textAlign: 'left', marginTop: 1},
                        ]}>
                        Size: Medium
                      </Text>
                    </View>
                    <View style={{width: '40%'}}>
                      <TextInput
                        label={''}
                        inputStyle={{textAlign: 'center'}}
                        placeHolder={'4200'}
                        keyboard={'decimal-pad'}
                        onChange={(text) => {}}
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
                placeHolder={'4200'}
                keyboard={'decimal-pad'}
                onChange={(text) => {}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Bidding screen'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{flex: 1}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {renderStep0()}
        <CustomModalAndroid
          visible={step === 1 || step === 2}
          onPress={() => {
            setStep(0);
            setForgotPin(false);
          }}>
          <View style={STYLES.modalHeaderView}>
            <Text style={STYLES.modalHeaderText}>APPLY FOR BID</Text>
            <CloseIcon
              style={{
                position: 'absolute',
                right: 10,
              }}
              onPress={() => {
                setStep(0);
                setForgotPin(false);
              }}
            />
          </View>
          <View style={{...STYLES.separatorView, width: '85%'}} />
          {step === 1 ? (
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={{marginBottom: hp(2), marginTop: hp(2)}}>
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
                    Date Of Birth
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
                      date={new Date()}
                      mode="date"
                      placeholder="select date"
                      format="D MMM yyyy"
                      minDate="2016-05-01"
                      maxDate={new Date()}
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
                      onDateChange={(date) => {}}
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
                      {low}
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
                    renderRailSelected={() => (
                      <View style={STYLES.sliderRail} />
                    )}
                    renderLabel={(value) => (
                      <Text style={STYLES.sliderLabel}>{value}</Text>
                    )}
                    onValueChanged={handleValueChange}
                  />
                  <View style={styles.manPowerView}>
                    <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                      {high}
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
                    onChange={(text) => {}}
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
                        onCodeChanged={(code) => console.log(code)}
                        codeInputFieldStyle={styles.textInput}
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
                      onCodeChanged={(code) => console.log(code)}
                      codeInputFieldStyle={styles.textInput}
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
            label={
              step === 0 ? 'next' : step === 1 ? 'place your bid' : 'submit'
            }
            onPress={() => {
              if (step === 0) {
                setStep(1);
              } else if (step === 1) {
                setStep(2);
              } else {
                if (forgotPin) {
                  setStep(2);
                  setForgotPin(false);
                } else {
                  setStep(0);
                  setForgotPin(false);
                }
              }
            }}
          />
        </CustomModalAndroid>
        <TwoButton
          leftLabel={'BACK'}
          rightLabel={'NEXT'}
          leftOnPress={() => props.navigation.goBack()}
          rightOnPress={() => setStep(1)}
        />
      </ScrollView>
    </LinearGradient>
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
    marginHorizontal: hp(1.5),
    marginTop: hp(3),
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
