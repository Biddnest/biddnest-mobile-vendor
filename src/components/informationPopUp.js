import React from 'react';
import {Text} from 'react-native';
import {STYLES} from '../constant/commonStyle';
import CloseIcon from './closeIcon';
import CustomModalAndroid from './customModal';
import FlatButton from './flatButton';

const InformationPopUp = (props) => {
  return (
    <CustomModalAndroid
      visible={props.visible}
      onPress={props.onCloseIcon}
      title={props?.title}>
      <Text style={STYLES.simpleText}>{props?.label}</Text>
      <FlatButton label={'OKAY'} onPress={props.onCloseIcon} />
    </CustomModalAndroid>
  );
};

export default InformationPopUp;
