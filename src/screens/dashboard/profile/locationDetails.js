import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import {Colors, wp, hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import DropDownAndroid from '../../../components/dropDown';
import FlatButton from '../../../components/flatButton';
import {STYLES} from '../../../constant/commonStyle';

const LocationDetails = (props) => {
  return (
    <CustomModalAndroid
      visible={props.visible}
      onPress={() => {
        props.onCloseIcon();
      }}>
      <View style={STYLES.modalHeaderView}>
        <Text style={STYLES.modalHeaderText}>EDIT LOCATION DETAILS</Text>
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
          label={'Address Line 1'}
          placeHolder={'Lorem ipsum dolor sit amet'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Address Line 2'}
          placeHolder={'Consetetur sadipscing elitr'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Landmark'}
          placeHolder={'Sed diam nonumy'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'City'}
          placeHolder={'Bengaluru'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'District'}
          placeHolder={'Bengaluru'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Pincode'}
          placeHolder={'123456'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'State'}
          placeHolder={'Karnataka'}
          onChange={(text) => {}}
        />
      </View>
      <FlatButton label={'save'} onPress={() => props.onCloseIcon()} />
    </CustomModalAndroid>
  );
};

export default LocationDetails;

const styles = StyleSheet.create({
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginTop: hp(1),
    marginBottom: hp(2),
  },
});
