import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import DropDown from '../../../components/dropDown';
import TextInput from '../../../components/textInput';
import FlatButton from '../../../components/flatButton';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OrderStatusWin = (props) => {
  const [driverAssignVisible, setDriverAssignVisible] = useState(false);
  const stepHeader = (title) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={styles.dotView} />
        <Text style={styles.stepHeaderText}>{title}</Text>
      </View>
    );
  };
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: hp(3),
        }}>
        <View style={{alignItems: 'center'}}>
          <View style={STYLES.circleBtnView}>
            <Ionicons
              name={'call-outline'}
              color={Colors.darkBlue}
              size={wp(7)}
            />
          </View>
          <Text style={STYLES.circleBottomText}>Call Customer</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={STYLES.circleBtnView}>
            <Ionicons
              name={'call-outline'}
              color={Colors.darkBlue}
              size={wp(7)}
            />
          </View>
          <Text style={STYLES.circleBottomText}>Direction</Text>
        </View>
      </View>
      <View style={STYLES.separatorView} />
      <View style={{alignItems: 'center'}}>
        <Button label={'Start Trip'} width={wp(90)} />
      </View>
      <View style={styles.flexBoxWrapper}>
        <EvilIcons
          name={'exclamation'}
          size={20}
          color={Colors.inputTextColor}
        />
        <Text style={styles.warningText}>Assign driver to this order</Text>
      </View>
      <View style={[STYLES.inputForm, {borderRadius: hp(1), marginTop: 0}]}>
        <Text style={STYLES.inputTextLabel}>Customer Details</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
          <Text style={[STYLES.sliderText, {width: wp(20), fontSize: wp(4)}]}>
            Name
          </Text>
          <Text
            style={[
              STYLES.modalHeaderText,
              {width: wp(60), textAlign: 'left'},
            ]}>
            Dominic Stellar
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
          <Text style={[STYLES.sliderText, {width: wp(20), fontSize: wp(4)}]}>
            Address
          </Text>
          <Text
            style={[
              STYLES.modalHeaderText,
              {width: wp(60), textAlign: 'left'},
            ]}>
            ABC Studio, ABC Street, Chennai
          </Text>
        </View>
      </View>
      <View style={{marginHorizontal: wp(8), marginVertical: hp(2)}}>
        {stepHeader('Booked')}
        <View
          style={{
            ...styles.stepBodyView,
          }}>
          <Text style={styles.subHeaderText}>confirmed</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.dotView} />
          <Text style={styles.stepHeaderText}>{'Assign Driver'}</Text>
          <Text
            style={styles.driverView}
            onPress={() => setDriverAssignVisible(true)}>
            ASSIGN DRIVER
          </Text>
        </View>
        <View
          style={{
            ...styles.stepBodyView,
          }}>
          <Text style={styles.subHeaderText}>Pending</Text>
        </View>
        {stepHeader('In Transit')}
        <View
          style={{
            ...styles.stepBodyView,
          }}>
          <Text style={styles.subHeaderText}>Pending</Text>
        </View>
        {stepHeader('Completed')}
        <View
          style={{
            ...styles.stepBodyView,
            borderLeftWidth: 0,
          }}>
          <Text style={styles.subHeaderText}>Pending</Text>
        </View>
      </View>
      <CustomModalAndroid
        visible={driverAssignVisible}
        onPress={() => setDriverAssignVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>ASSIGN DRIVER</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setDriverAssignVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={{marginVertical: hp(2)}}>
          <DropDown
            label={'Service Type'}
            width={wp(90)}
            items={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            onChangeItem={(text) => {}}
          />
        </View>
        <View style={{width: wp(90)}}>
          <TextInput
            label={'Vehicle Registration Number'}
            placeHolder={'XXXXXXX'}
            onChange={(text) => {}}
          />
        </View>
        <FlatButton
          label={'assign'}
          onPress={() => setDriverAssignVisible(false)}
        />
      </CustomModalAndroid>
      <CustomModalAndroid
        visible={false}
        onPress={() => setDriverAssignVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>PIN VERIFICATION</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setDriverAssignVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
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
        </View>
        <FlatButton label={'submit'} onPress={() => {}} />
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
