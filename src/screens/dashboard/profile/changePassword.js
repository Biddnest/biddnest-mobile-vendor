import React, {useState} from 'react';
import {Text, View} from 'react-native';
import CustomModalAndroid from '../../../components/customModal';
import {hp} from '../../../constant/colors';
import TextInput from '../../../components/textInput';
import FlatButton from '../../../components/flatButton';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';
import {STORE} from '../../../redux';

const ChangePassword = (props) => {
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [error, setError] = useState({
    current_password: undefined,
    new_password: undefined,
    confirm_password: undefined,
  });

  return (
    <CustomModalAndroid
      visible={props.visible}
      title={'CHANGE PASSWORD'}
      onPress={() => {
        props.onCloseIcon();
      }}>
      <View style={{width: '90%', marginTop: hp(2)}}>
        <TextInput
          value={data?.current_password}
          label={'Current Password *'}
          placeHolder={'Current Password'}
          isRight={error.current_password}
          secureTextEntry={true}
          onChange={(text) =>
            setData({
              ...data,
              current_password: text,
            })
          }
        />
        <TextInput
          value={data?.new_password}
          label={'New Password *'}
          placeHolder={'New Password'}
          isRight={error.new_password}
          secureTextEntry={true}
          onChange={(text) =>
            setData({
              ...data,
              new_password: text,
            })
          }
        />
        <TextInput
          value={data?.confirm_password}
          label={'Confirm Password *'}
          placeHolder={'Confirm Password'}
          isRight={error.confirm_password}
          secureTextEntry={true}
          onChange={(text) =>
            setData({
              ...data,
              confirm_password: text,
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
          tempError.current_password = !(
            !data.current_password || data.current_password.length === 0
          );
          tempError.new_password = !(
            !data.new_password || data.new_password.length === 0
          );
          tempError.confirm_password = !(
            !data.confirm_password || data.confirm_password.length === 0
          );
          if (data.new_password !== data.confirm_password) {
            tempError.new_password = false;
            tempError.confirm_password = false;
          }
          setError(tempError);
          if (
            Object.values(tempError).findIndex((item) => item === false) === -1
          ) {
            // API call
            let obj = {
              url: 'change-password',
              method: 'post',
              headers: {
                Authorization:
                  'Bearer ' + STORE.getState().Login?.loginData?.token,
              },
              data: data,
            };
            APICall(obj)
              .then((res) => {
                setLoading(false);
                if (res?.data?.status === 'success') {
                  CustomAlert('Updated Password Successfully');
                  props.onCloseIcon();
                } else {
                  CustomAlert(res?.data?.message);
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

export default ChangePassword;
