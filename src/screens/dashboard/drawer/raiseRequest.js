import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../../components/button';
import TextInput from '../../../components/textInput';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert} from '../../../constant/commonFun';
import {useSelector} from 'react-redux';
import SelectionModal from '../../../components/selectionModal';

const RaiseRequest = (props) => {
  const public_booking_id = props?.route?.params?.public_booking_id || null;
  const [isLoading, setLoading] = useState(false);
  const configData =
    useSelector((state) => state.Login?.configData?.enums?.ticket?.type) || {};
  const [data, setData] = useState({
    category: '',
    heading: '',
    desc: '',
  });
  const [error, setError] = useState({
    category: undefined,
    heading: undefined,
    desc: undefined,
  });
  let dropdownDefault = [];
  Object.keys(configData).forEach((item, index) => {
    dropdownDefault.push({
      label: item?.split('_').join(' '),
      value: Object.values(configData)[index],
    });
  });
  if (dropdownDefault.findIndex((item) => item.value === null) === -1) {
    dropdownDefault.unshift({
      label: '-Select-',
      value: null,
    });
  }

  return (
    <View style={{flex: 1}}>
      <SimpleHeader
        headerText={'Raise a Request'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
        right={true}
        onRightPress={() => {}}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <LinearGradient
          colors={[Colors.pageBG, Colors.white]}
          style={{flex: 1, padding: hp(3)}}>
          <View style={{marginBottom: hp(3)}}>
            <SelectionModal
              style={
                error?.category === false
                  ? {
                      borderColor: 'red',
                      borderWidth: 2,
                    }
                  : {}
              }
              width={wp(90)}
              label={'Category'}
              items={dropdownDefault}
              onChangeItem={(text) => setData({...data, category: text})}
            />
          </View>
          <TextInput
            isRight={error?.heading}
            value={data?.heading}
            label={'Subject'}
            placeHolder={'Abc'}
            onChange={(text) => setData({...data, heading: text})}
          />
          {error?.heading === false && (
            <Text style={styles.errorText}>Minimun 6 character required</Text>
          )}
          <TextInput
            isRight={error?.desc}
            value={data?.desc}
            label={'Message'}
            placeHolder={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
            }
            numberOfLines={4}
            height={hp(20)}
            onChange={(text) => setData({...data, desc: text})}
          />
          {error?.desc === false && (
            <Text style={styles.errorText}>Minimum 15 character required</Text>
          )}
          <View style={{alignSelf: 'center'}}>
            <Button
              label={'submit'}
              isLoading={isLoading}
              onPress={() => {
                // API call
                setLoading(true);
                let tempError = {};
                tempError.category = !!(data?.category !== '');
                tempError.heading = !(
                  !data?.heading || data?.heading.length < 6
                );
                tempError.desc = !(!data?.desc || data?.desc.length < 15);
                setError(tempError);
                if (
                  Object.values(tempError).findIndex(
                    (item) => item === false,
                  ) === -1
                ) {
                  let obj = {
                    url: 'tickets/create',
                    method: 'post',
                    headers: {
                      Authorization:
                        'Bearer ' + STORE.getState().Login?.loginData?.token,
                    },
                    data: data,
                  };
                  APICall(obj)
                    .then((res) => {
                      if (res?.data?.status === 'success') {
                        CustomAlert('Ticket Raised Successfully');
                        props.navigation.goBack();
                      } else {
                        CustomAlert(res?.data?.message);
                      }
                    })
                    .catch((err) => {
                      CustomAlert(err);
                    });
                } else {
                  setLoading(false);
                }
              }}
              spaceTop={hp(2)}
            />
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default RaiseRequest;

const styles = StyleSheet.create({
  inputForm: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: wp(5),
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(3.6),
    width: wp(71),
  },
  flexBox: {
    flexDirection: 'row',
    width: wp(10),
  },
  btnWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
  errorText: {
    position: 'relative',
    top: -hp(3),
    alignSelf: 'flex-end',
    right: wp(5),
    color: Colors.red,
    fontSize: wp(3.5),
    fontFamily: 'Roboto-Regular',
  },
});
