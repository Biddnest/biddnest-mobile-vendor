import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import {Colors, wp, hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import DropDown from '../../../components/dropDown';
import FlatButton from '../../../components/flatButton';
import {STYLES} from '../../../constant/commonStyle';
import Switch from '../../../components/switch';

const OtherDetails = (props) => {
  return (
    <CustomModalAndroid visible={props.visible}>
      <View style={STYLES.modalHeaderView}>
        <Text style={STYLES.modalHeaderText}>EDIT OTHER DETAILS</Text>
        <CloseIcon
          style={{
            position: 'absolute',
            right: 10,
          }}
          onPress={() => {
            props.onCloseIcon();
          }}
        />
      </View>
      <View style={{...styles.separatorView, width: '85%'}} />
      <View style={{width: '90%'}}>
        <TextInput
          label={'Commission Rate'}
          placeHolder={'10%'}
          onChange={(text) => {}}
        />
        <View style={{width: '95%', alignSelf: 'center', marginBottom: hp(3)}}>
          <Text
            style={{
              fontFamily: 'Roboto-Bold',
              color: Colors.inputTextColor,
              fontSize: wp(4),
              marginBottom: hp(2),
            }}>
            Status
          </Text>
          <Switch left={'Inactive'} right={'Active'} />
        </View>
        <View style={{marginBottom: hp(3)}}>
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
        <View style={{marginBottom: hp(3)}}>
          <DropDown
            label={'Vendor Status'}
            width={wp(90)}
            items={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            onChangeItem={(text) => {}}
          />
        </View>
      </View>
      <FlatButton label={'save'} onPress={() => props.onCloseIcon()} />
    </CustomModalAndroid>
  );
};

export default OtherDetails;

const styles = StyleSheet.create({
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
});
