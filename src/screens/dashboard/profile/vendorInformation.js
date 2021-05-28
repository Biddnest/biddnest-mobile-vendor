import React, {useState} from 'react';
import {View} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import {hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import FlatButton from '../../../components/flatButton';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';

const VendorInformation = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Login?.loginData?.vendor) || {};
  const [isLoading, setLoading] = useState(false);
  let temp =
    (userData?.organization?.meta &&
      JSON.parse(userData?.organization?.meta?.toString())) ||
    {};
  const [data, setData] = useState({
    organization_name: userData?.organization?.org_name,
    organization_desc: temp?.org_description,
    secondory_cont_no: temp?.secondory_phone?.toString(),
    gstin_no: temp?.gstin_no,
  });
  const [error, setError] = useState({
    organization_name: undefined,
    organization_desc: undefined,
    secondory_cont_no: undefined,
    gstin_no: undefined,
  });

  return (
    <CustomModalAndroid
      visible={props.visible}
      title={'EDIT ORGANIZATION INFORMATION'}
      onPress={() => {
        props.onCloseIcon();
      }}>
      <View style={{width: '90%', marginTop: hp(2)}}>
        <TextInput
          label={'Organization Name'}
          placeHolder={'Abc'}
          value={data?.organization_name}
          isRight={error?.organization_name}
          onChange={(text) =>
            setData({
              ...data,
              organization_name: text,
            })
          }
        />
        <TextInput
          value={data?.organization_desc}
          isRight={error?.organization_desc}
          label={'Organization Description'}
          numberOfLines={4}
          placeHolder={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
          }
          onChange={(text) =>
            setData({
              ...data,
              organization_desc: text,
            })
          }
        />
        <TextInput
          keyboard={'decimal-pad'}
          label={'Secondary Contact Number'}
          placeHolder={'7567144324'}
          isRight={error?.secondory_cont_no}
          value={data?.secondory_cont_no}
          onChange={(text) =>
            setData({
              ...data,
              secondory_cont_no: text,
            })
          }
        />
        <TextInput
          value={data?.gstin_no}
          isRight={error?.gstin_no}
          label={'GSTIN Number'}
          placeHolder={'XXXXXXXXXXXX'}
          onChange={(text) =>
            setData({
              ...data,
              gstin_no: text,
            })
          }
        />
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
          tempError.organization_desc = !(
            !data.organization_desc || data.organization_desc.length === 0
          );
          tempError.secondory_cont_no = !(
            !data.secondory_cont_no || data.secondory_cont_no.length !== 10
          );
          tempError.gstin_no = !(!data.gstin_no || data.gstin_no.length !== 15);
          setError(tempError);
          if (
            Object.values(tempError).findIndex((item) => item === false) === -1
          ) {
            // API call
            dispatch(updateProfile(data, 'organization'))
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

export default VendorInformation;
