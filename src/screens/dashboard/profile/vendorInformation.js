import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import {Colors, wp, hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import DropDown from '../../../components/dropDown';
import FlatButton from '../../../components/flatButton';
import {STYLES} from '../../../constant/commonStyle';

const VendorInformation = (props) => {
  return (
    <CustomModalAndroid visible={props.visible}>
      <View style={STYLES.modalHeaderView}>
        <Text style={STYLES.modalHeaderText}>EDIT VENDOR INFORMATION</Text>
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
          label={'Organization Name'}
          placeHolder={'Abc'}
          onChange={(text) => {}}
        />
        <View style={{marginBottom: hp(3)}}>
          <DropDown
            label={'Vendor Type'}
            width={wp(90)}
            items={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            onChangeItem={(text) => {}}
          />
        </View>
        <TextInput
          label={'Vendor ID'}
          placeHolder={'XXXXXXXX'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Organization Description'}
          numberOfLines={4}
          placeHolder={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
          }
          onChange={(text) => {}}
        />
        <TextInput
          label={'Secondary Contact Number'}
          placeHolder={'7567144324'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Password'}
          secureTextEntry={true}
          placeHolder={'7567144324'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'GSTIN Number'}
          placeHolder={'XXXXXXXXXXXX'}
          onChange={(text) => {}}
        />
      </View>
      <FlatButton label={'save'} onPress={() => props.onCloseIcon()} />
    </CustomModalAndroid>
  );
};

export default VendorInformation;

const styles = StyleSheet.create({
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
});
