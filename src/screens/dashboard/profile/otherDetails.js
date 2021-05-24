import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import {Colors, wp, hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import DropDownAndroid from '../../../components/dropDown';
import FlatButton from '../../../components/flatButton';
import {STYLES} from '../../../constant/commonStyle';
import Switch from '../../../components/switch';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';

const OtherDetails = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Login?.loginData?.vendor) || {};
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    commission: userData?.organization?.commission,
    status: userData?.organization?.status,
    service_type: userData?.organization?.service_type,
  });
  const [error, setError] = useState({
    commission: undefined,
  });

  return (
    <CustomModalAndroid
      visible={props.visible}
      title={'EDIT OTHER DETAILS'}
      onPress={() => {
        props.onCloseIcon();
      }}>
      <View style={{width: '90%', marginTop: hp(2)}}>
        <TextInput
          value={data?.commission?.toString()}
          label={'Commission Rate'}
          placeHolder={'10%'}
          keyboard={'decimal-pad'}
          onChange={(text) =>
            setData({
              ...data,
              commission: text,
            })
          }
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
          <Switch
            left={'Inactive'}
            right={'Active'}
            switchValue={data?.status}
            onChange={() =>
              setData({
                ...data,
                status: data?.status ? 0 : 1,
              })
            }
          />
        </View>
        <View style={{marginBottom: hp(3)}}>
          <DropDownAndroid
            value={data?.service_type}
            label={'Service Type'}
            width={wp(90)}
            items={[
              {label: 'Economic', value: 'economic'},
              {label: 'Premium', value: 'premium'},
            ]}
            onChangeItem={(text) => {
              setData({
                ...data,
                service_type: text,
              });
            }}
          />
        </View>
      </View>
      <FlatButton
        isLoading={isLoading}
        label={'save'}
        onPress={() => {
          let tempError = {};
          setLoading(true);
          tempError.organization_name = !(
            !data.organization_name || data.organization_name.length === 0
          );
          setError(tempError);
          if (
            Object.values(tempError).findIndex((item) => item === false) === -1
          ) {
            // API call
            dispatch(updateProfile(data))
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

export default OtherDetails;
