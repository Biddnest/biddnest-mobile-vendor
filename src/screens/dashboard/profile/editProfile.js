import React, {useState} from 'react';
import {Colors, hp, wp} from '../../../constant/colors';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInput from '../../../components/textInput';
import {Text} from 'react-native-elements';
import {STYLES} from '../../../constant/commonStyle';
import Button from '../../../components/button';
import {CustomAlert, ImageSelection} from '../../../constant/commonFun';
import {useDispatch, useSelector} from 'react-redux';
import {updateProfile} from '../../../redux/actions/user';
import Ripple from 'react-native-material-ripple';
import CustomModalAndroid from '../../../components/customModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const [imageSelect, setImageSelect] = useState(false);
  const configData =
    useSelector((state) => state.Login?.loginData?.vendor) || {};
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    fname: configData?.fname,
    lname: configData?.lname,
    email: configData?.email,
    image: configData?.image,
    phone: configData?.phone,
  });
  const [error, setError] = useState({
    fname: undefined,
    lname: undefined,
    email: undefined,
    // dob: undefined,
  });
  const handleState = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  const setImage = (type) => {
    ImageSelection(type)
      .then((res) => {
        handleState('image', res);
      })
      .catch((err) => {});
  };
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <View style={styles.container}>
        <SimpleHeader
          headerText={'EDIT PROFILE'}
          navigation={props.navigation}
          onBack={() => props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          bounces={false}
          enableOnAndroid={false}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            width: wp(100),
            padding: hp(2),
          }}>
          <View style={{marginHorizontal: wp(3)}}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                color: Colors.textLabelColor,
                fontSize: wp(4),
              }}>
              Image
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: wp(18),
                marginTop: hp(1),
              }}>
              <View style={styles.profilePhoto}>
                <Image
                  source={{
                    uri: data?.image?.includes('data:image/jpeg;base64,')
                      ? data?.image
                      : data?.image + '?' + new Date(),
                  }}
                  style={{height: '100%', width: '100%'}}
                  resizeMode={'contain'}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginLeft: wp(5),
                  height: wp(18),
                }}>
                <Ripple
                  rippleColor={Colors.white}
                  onPress={async () => {
                    setImageSelect(true);
                  }}
                  style={styles.imageUploadBtn}>
                  <Text
                    style={{
                      fontFamily: 'Roboto-Bold',
                      fontSize: wp(3.8),
                      color: Colors.white,
                    }}>
                    UPLOAD IMAGE
                  </Text>
                </Ripple>
                {/*<Text*/}
                {/*  style={{*/}
                {/*    color: Colors.inputTextColor,*/}
                {/*    fontSize: wp(3.4),*/}
                {/*    fontFamily: 'Roboto-Light',*/}
                {/*  }}>*/}
                {/*  Max File size: 1MB*/}
                {/*</Text>*/}
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp(3)}}>
            <View style={{width: wp(45)}}>
              <TextInput
                value={data?.fname}
                isRight={error.fname}
                label={'First Name'}
                placeHolder={'David'}
                onChange={(text) => handleState('fname', text)}
                style={{marginBottom: -hp(1)}}
              />
            </View>
            <View style={{width: wp(45)}}>
              <TextInput
                value={data?.lname}
                isRight={error.lname}
                label={'Last Name'}
                placeHolder={'Jerome'}
                onChange={(text) => handleState('lname', text)}
                style={{marginBottom: -hp(1)}}
              />
            </View>
          </View>
          {/*<View style={{flexDirection: 'row'}}>*/}
          <View style={{width: wp(90)}}>
            <TextInput
              value={data?.email}
              isRight={error.email}
              label={'Email ID'}
              placeHolder={'davidje@gmail.com'}
              onChange={(text) => handleState('email', text)}
              style={{marginBottom: -hp(1)}}
            />
          </View>
          <View style={{width: wp(90)}}>
            <TextInput
              disable={true}
              value={data?.phone}
              label={'Phone Number'}
              placeHolder={'9739912345'}
              onChange={(text) => handleState('phone', text)}
              style={{marginBottom: -hp(1)}}
            />
          </View>
          {/*</View>*/}
          {/*<View*/}
          {/*  style={[*/}
          {/*    {marginBottom: hp(3)},*/}
          {/*    Platform.OS !== 'android' && {zIndex: 5001},*/}
          {/*  ]}>*/}
          {/*  <DropDownAndroid*/}
          {/*    value={data?.gender}*/}
          {/*    width={wp(90)}*/}
          {/*    label={'Gender'}*/}
          {/*    items={configData?.gender}*/}
          {/*    onChangeItem={(text) => handleState('gender', text)}*/}
          {/*  />*/}
          {/*</View>*/}
          {/*<View style={{width: '92%', marginHorizontal: wp(3)}}>*/}
          {/*  <Text*/}
          {/*    style={{*/}
          {/*      fontFamily: 'Roboto-Bold',*/}
          {/*      color: Colors.textLabelColor,*/}
          {/*      fontSize: wp(4),*/}
          {/*    }}>*/}
          {/*    Date Of Birth*/}
          {/*  </Text>*/}
          {/*  <View*/}
          {/*    style={{*/}
          {/*      marginTop: hp(1),*/}
          {/*      marginBottom: hp(3),*/}
          {/*      borderWidth: 2,*/}
          {/*      // paddingHorizontal: 15,*/}
          {/*      borderRadius: 10,*/}
          {/*      height: hp(6.5),*/}
          {/*      borderColor: error?.dob === false ? Colors.red : Colors.silver,*/}
          {/*      backgroundColor: Colors.white,*/}
          {/*    }}>*/}
          {/*    <DatePicker*/}
          {/*      style={{*/}
          {/*        width: '100%',*/}
          {/*        height: '100%',*/}
          {/*        justifyContent: 'center',*/}
          {/*      }}*/}
          {/*      date={data?.dob && moment(data?.dob).format('D MMM yyyy')}*/}
          {/*      mode="date"*/}
          {/*      placeholder="Select date"*/}
          {/*      format="D MMM yyyy"*/}
          {/*      maxDate={new Date()}*/}
          {/*      confirmBtnText="Confirm"*/}
          {/*      cancelBtnText="Cancel"*/}
          {/*      iconComponent={*/}
          {/*        <Entypo*/}
          {/*          name={'calendar'}*/}
          {/*          size={25}*/}
          {/*          color={Colors.inputTextColor}*/}
          {/*          style={{*/}
          {/*            position: 'absolute',*/}
          {/*            right: 8,*/}
          {/*            top: 7,*/}
          {/*            marginLeft: 0,*/}
          {/*          }}*/}
          {/*        />*/}
          {/*      }*/}
          {/*      customStyles={{*/}
          {/*        dateInput: {*/}
          {/*          borderWidth: 0,*/}
          {/*          height: hp(6.5),*/}
          {/*          marginTop: 1,*/}
          {/*          width: '100%',*/}
          {/*          alignItems: 'flex-start',*/}
          {/*          justifyContent: 'center',*/}
          {/*          paddingHorizontal: 15,*/}
          {/*        },*/}
          {/*        dateText: {*/}
          {/*          fontSize: wp(4),*/}
          {/*          backgroundColor: Colors.textBG,*/}
          {/*          color: Colors.inputTextColor,*/}
          {/*          justifyContent: 'flex-start',*/}
          {/*        },*/}
          {/*      }}*/}
          {/*      onDateChange={(date) => {*/}
          {/*        handleState('dob', date);*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*</View>*/}
          <View style={{marginHorizontal: wp(3)}}>
            <Button
              isLoading={isLoading}
              spaceBottom={wp(0.1)}
              label={'SAVE'}
              onPress={() => {
                setLoading(true);
                let tempError = {};
                tempError.fname = !(
                  !data.fname ||
                  data.fname.length === 0 ||
                  /[^a-zA-Z]/.test(data.fname)
                );
                tempError.lname = !(
                  !data.lname ||
                  data.lname.length === 0 ||
                  /[^a-zA-Z]/.test(data.lname)
                );
                tempError.email = !(
                  !data.email ||
                  data.email.length === 0 ||
                  !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    data.email,
                  )
                );
                // if (!data.dob) {
                //   tempError.dob = false;
                // } else {
                //   tempError.dob = true;
                // }
                setError(tempError);
                if (
                  Object.values(tempError).findIndex(
                    (item) => item === false,
                  ) === -1
                ) {
                  dispatch(updateProfile(data, 'vendor'))
                    .then((res) => {
                      setLoading(false);
                      if (res.status === 'success') {
                        setData(res?.data?.vendor);
                        props.navigation.goBack();
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
          </View>
        </KeyboardAwareScrollView>
        <CustomModalAndroid
          visible={imageSelect}
          title={'Upload From'}
          onPress={() => {
            setImageSelect(false);
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: hp(3),
              width: wp(100),
            }}>
            <View style={styles.common}>
              <Ripple
                rippleColor={Colors.white}
                style={[STYLES.selectionView, STYLES.common]}
                onPress={() => setImage('camera')}>
                <Ionicons
                  name={'camera'}
                  color={Colors.darkBlue}
                  size={hp(6)}
                />
              </Ripple>
              <Text
                style={[
                  STYLES.selectionText,
                  {
                    textAlign: 'center',
                  },
                ]}>
                Camera
              </Text>
            </View>
            <View style={styles.common}>
              <Ripple
                rippleColor={Colors.white}
                onPress={() => setImage('gallery')}
                style={[STYLES.selectionView, STYLES.common]}>
                <AntDesign
                  name={'picture'}
                  color={Colors.darkBlue}
                  size={hp(6)}
                />
              </Ripple>
              <Text
                style={[
                  STYLES.selectionText,
                  {
                    textAlign: 'center',
                  },
                ]}>
                Gallery
              </Text>
            </View>
          </View>
        </CustomModalAndroid>
      </View>
    </LinearGradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePhoto: {
    height: wp(18),
    width: wp(18),
    borderRadius: wp(9),
    backgroundColor: Colors.btnBG,
    overflow: 'hidden',
    ...STYLES.common,
  },
  imageUploadBtn: {
    height: wp(10),
    backgroundColor: Colors.btnBG,
    borderRadius: 5,
    width: wp(40),
    ...STYLES.common,
  },
});
