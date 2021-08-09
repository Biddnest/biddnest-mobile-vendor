import React, {useState, useEffect} from 'react';
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
import SelectionModalAndroid from '../../../components/selectionModal';

const RaiseRequest = (props) => {
  const [isLoading, setLoading] = useState(false);
  const configData =
    useSelector((state) => state.Login?.configData?.enums?.ticket?.type) || {};
  const [data, setData] = useState({
    public_booking_id: '',
    category: '',
    heading: '',
    desc: '',
  });
  const [bookingList, setBookingList] = useState([]);
  const [error, setError] = useState({
    public_booking_id: undefined,
    category: undefined,
    heading: undefined,
    desc: undefined,
  });
  useEffect(() => {
    let obj = {
      url: 'tickets/bookings',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          let temp = [];
          res?.data?.data?.bookings.forEach((item) => {
            temp.push({
              label: item?.public_booking_id,
              value: item?.public_booking_id,
            });
          });
          setBookingList(temp);
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomConsole(err);
      });
  }, []);
  let dropdownDefault = [];
  Object.keys(configData).forEach((item, index) => {
    dropdownDefault.push({
      label: item?.split('_').join(' '),
      value: Object.values(configData)[index],
    });
  });
  if (bookingList.findIndex((item) => item.value === null) === -1) {
    bookingList.unshift({
      label: '-Select-',
      value: null,
    });
  }
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
          <SelectionModalAndroid
            style={{
              marginBottom: hp(3),
              borderColor:
                error?.public_booking_id === false ? 'red' : Colors.silver,
            }}
            width={wp(90)}
            value={data?.public_booking_id}
            label={'Choose Booking *'}
            items={bookingList}
            onChangeItem={(text) => setData({...data, public_booking_id: text})}
          />
          <View style={{marginBottom: hp(3)}}>
            <SelectionModalAndroid
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
            label={'Subject *'}
            placeHolder={'Abc'}
            onChange={(text) => setData({...data, heading: text})}
          />
          {error?.heading === false && (
            <Text style={styles.errorText}>Minimun 6 character required</Text>
          )}
          <TextInput
            isRight={error?.desc}
            value={data?.desc}
            label={'Message *'}
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
                tempError.public_booking_id = !!(
                  data?.public_booking_id !== '' &&
                  data?.public_booking_id != null
                );
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
  errorText: {
    position: 'relative',
    top: -hp(3),
    alignSelf: 'flex-end',
    right: wp(5),
    color: Colors.red,
    fontSize: hp(1.9),
    fontFamily: 'Roboto-Regular',
  },
});
