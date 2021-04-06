import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import {Colors, wp, hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import FlatButton from '../../../components/flatButton';
import {STYLES} from '../../../constant/commonStyle';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';

const LocationDetails = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Login?.loginData?.vendor) || {};
  const [isLoading, setLoading] = useState(false);
  let temp =
    (userData?.organization?.meta &&
      JSON.parse(userData?.organization?.meta?.toString())) ||
    {};
  const [data, setData] = useState({
    address_line1: temp?.address_line_1,
    address_line2: temp?.address_line_2,
    landmark: temp?.landmark,
    city: userData?.organization?.city,
    state: userData?.organization?.state,
    pincode: userData?.organization?.pincode,
  });
  const [error, setError] = useState({
    address_line1: undefined,
    address_line2: undefined,
    landmark: undefined,
    city: undefined,
    state: undefined,
    pincode: undefined,
  });

  return (
    <CustomModalAndroid
      visible={props.visible}
      onPress={() => {
        props.onCloseIcon();
      }}>
      <Text style={STYLES.modalHeaderText}>EDIT LOCATION DETAILS</Text>
      <CloseIcon
        onPress={() => {
          props.onCloseIcon();
        }}
      />
      <View style={{width: '90%', marginTop: hp(2)}}>
        <TextInput
          isRight={error?.address_line1}
          value={data?.address_line1}
          label={'Address Line 1'}
          placeHolder={'Lorem ipsum dolor sit amet'}
          onChange={(text) =>
            setData({
              ...data,
              address_line1: text,
            })
          }
        />
        <TextInput
          isRight={error?.address_line2}
          value={data?.address_line2}
          label={'Address Line 2'}
          placeHolder={'Consetetur sadipscing elitr'}
          onChange={(text) =>
            setData({
              ...data,
              address_line2: text,
            })
          }
        />
        <TextInput
          isRight={error?.landmark}
          value={data?.landmark}
          label={'Landmark'}
          placeHolder={'Sed diam nonumy'}
          onChange={(text) =>
            setData({
              ...data,
              landmark: text,
            })
          }
        />
        <TextInput
          isRight={error?.city}
          value={data?.city}
          label={'City'}
          placeHolder={'Bengaluru'}
          onChange={(text) =>
            setData({
              ...data,
              city: text,
            })
          }
        />
        {/*<TextInput*/}
        {/*  value={data?.address_line1}*/}
        {/*  label={'District'}*/}
        {/*  placeHolder={'Bengaluru'}*/}
        {/*  onChange={(text) => {}}*/}
        {/*/>*/}
        <TextInput
          isRight={error?.pincode}
          value={data?.pincode?.toString()}
          label={'Pincode'}
          placeHolder={'123456'}
          keyboard={'decimal-pad'}
          onChange={(text) =>
            setData({
              ...data,
              pincode: text,
            })
          }
        />
        <TextInput
          isRight={error?.state}
          value={data?.state}
          label={'State'}
          placeHolder={'Karnataka'}
          onChange={(text) =>
            setData({
              ...data,
              state: text,
            })
          }
        />
      </View>
      <FlatButton
        label={'save'}
        isLoading={isLoading}
        onPress={() => {
          let tempError = {};
          setLoading(true);
          tempError.address_line1 = !(
            !data.address_line1 || data.address_line1.length === 0
          );
          tempError.address_line2 = !(
            !data.address_line2 || data.address_line2.length === 0
          );
          tempError.landmark = !(!data.landmark || data.landmark.length === 0);
          tempError.city = !(!data.city || data.landmark.city === 0);
          tempError.pincode = !(!data.pincode || data.pincode.length !== 6);
          tempError.state = !(!data.state || data.state.length === 0);
          setError(tempError);
          if (
            Object.values(tempError).findIndex((item) => item === false) === -1
          ) {
            // API call
            dispatch(updateProfile(data, 'location'))
              .then((res) => {
                setLoading(false);
                if (res.status === 'success') {
                  CustomAlert('Updated Successfully');
                  props.onCloseIcon();
                } else {
                  CustomAlert(res.message);
                }
              })
              .catch((err) => {
                setLoading(false);
                CustomAlert(err.data.message);
              });
          } else {
            setLoading(false);
          }
        }}
      />
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
