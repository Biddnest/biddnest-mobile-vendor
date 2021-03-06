import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {HomeHeader} from '../home';
import {STYLES} from '../../../constant/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VendorInformation from './vendorInformation';
import LocationDetails from './locationDetails';
import {useSelector} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ChangePassword from './changePassword';
import HTML from 'react-native-render-html';

const Profile = (props) => {
  const userData = useSelector((state) => state.Login?.loginData) || {};
  const serviceType =
    useSelector(
      (state) => state.Login?.configData?.enums?.booking?.booking_type,
    ) || {};
  const roles =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.roles) || {};
  const [openArray, setOpenArray] = useState([]);
  const [openIndex, setOpenIndex] = useState();
  const [changePassVisible, setChangePassVisible] = useState(false);
  let tempMeta =
    (userData?.vendor?.organization?.meta &&
      JSON.parse(userData?.vendor?.organization?.meta?.toString())) ||
    {};
  let service_index = Object.values(serviceType).findIndex(
    (item) => item == userData?.vendor?.organization?.service_type,
  );
  let user_role_index = Object.values(roles).findIndex(
    (item) => item == userData?.vendor?.user_role,
  );
  const onPress = (index) => {
    let temp = [...openArray];
    if (openArray.includes(index)) {
      const indexT = temp.indexOf(index);
      if (indexT > -1) {
        temp.splice(indexT, 1);
      }
    } else {
      temp.push(index);
    }
    setOpenArray(temp);
  };
  const renderIcon = (index, header) => {
    let show = false;
    if (index === 0 || index === 1) {
      if (
        roles?.admin === userData?.vendor?.user_role &&
        openArray.includes(index)
      ) {
        show = true;
      }
    }
    return (
      <Pressable
        onPress={() => onPress(index)}
        style={[
          styles.inputForm,
          {
            backgroundColor: openArray.includes(index)
              ? Colors.darkBlue
              : Colors.white,
            padding: 0,
            height: wp(12),
            borderRadius: hp(1.5),
            justifyContent: 'center',
            paddingHorizontal: wp(4),
          },
        ]}>
        <View style={styles.flexBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.topText,
                {
                  color: openArray.includes(index)
                    ? Colors.white
                    : Colors.darkBlue,
                },
              ]}>
              {header}
            </Text>
            {show && (
              <Pressable
                style={styles.singleEdit}
                onPress={() => setOpenIndex(index)}>
                <MaterialIcons
                  name={'edit'}
                  color={Colors.white}
                  size={wp(5)}
                />
              </Pressable>
            )}
          </View>
          <View>
            <MaterialIcons
              name={
                openArray.includes(index)
                  ? 'keyboard-arrow-up'
                  : 'keyboard-arrow-down'
              }
              size={hp(4)}
              color={openArray.includes(index) ? Colors.white : Colors.darkBlue}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <LinearGradient
      colors={[Colors.pageBG, Colors.white]}
      style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={'Profile'}
        right={true}
        onRightPress={() => {}}
      />
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ImageBackground
          source={require('../../../assets/images/logo_background.png')}
          style={{
            height: hp(20),
            width: '100%',
            ...STYLES.common,
            flexDirection: 'row',
          }}
          resizeMode={'cover'}>
          <View style={styles.profilePhoto}>
            <Image
              source={{uri: userData?.vendor?.image}}
              style={{height: '100%', width: '100%'}}
              resizeMode={'contain'}
            />
          </View>
          <View
            style={{
              width: wp(55),
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Roboto-Bold',
                fontSize: hp(2.3),
                textTransform: 'capitalize',
              }}>
              {userData?.vendor?.fname} {userData?.vendor?.lname}
            </Text>
            <Text style={styles.profileDetailText}>
              +91 {userData?.vendor?.phone}
            </Text>
            <Text style={styles.profileDetailText}>
              {userData?.vendor?.email}
            </Text>
            <Text
              style={[
                styles.profileDetailText,
                {
                  textTransform: 'capitalize',
                  fontFamily: 'Gilroy-Bold',
                  fontSize: hp(2.2),
                },
              ]}>
              {Object.keys(roles)[user_role_index]}
            </Text>
          </View>
          <View
            style={{
              width: wp(12),
              justifyContent: 'space-between',
              height: hp(12),
            }}>
            <Pressable
              style={styles.profileEdit}
              onPress={() => props.navigation.navigate('EditProfile')}>
              <MaterialIcons name={'edit'} color={Colors.white} size={wp(6)} />
            </Pressable>
            <Pressable
              style={styles.profileEdit}
              onPress={() => setChangePassVisible(true)}>
              <EvilIcons name={'lock'} color={Colors.white} size={wp(8)} />
            </Pressable>
          </View>
        </ImageBackground>
        <View style={{flex: 1, marginBottom: hp(2)}}>
          {renderIcon(0, 'Organization Information')}
          {openArray.includes(0) && (
            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
              }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginTop: hp(2)}}
                data={[
                  {
                    title: 'Organization Name',
                    body: userData?.vendor?.organization?.org_name,
                  },
                  {
                    title: 'Organization Description',
                    body: tempMeta?.org_description,
                  },
                  {
                    title: 'Secondary Contact Number',
                    body: tempMeta?.secondory_phone,
                  },
                  {
                    title: 'GSTIN Number',
                    body: tempMeta?.gstin_no,
                  },
                ]}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.textWrapper} key={index}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      <HTML
                        baseFontStyle={{
                          fontFamily: 'Roboto-Regular',
                          fontSize: hp(2.3),
                          color: Colors.inputTextColor,
                          textTransform: 'capitalize',
                        }}
                        source={{html: item?.body}}
                        contentWidth={'90%'}
                      />
                      {/*<Text style={styles.bodyText}>{item.body}</Text>*/}
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View style={styles.separatorView} />
                )}
              />
            </View>
          )}
          {renderIcon(1, 'Location Details')}
          {openArray.includes(1) && (
            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
              }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={[
                  {
                    title: 'Address Line 1',
                    body: tempMeta?.address_line_1,
                  },
                  {
                    title: 'Address Line 2',
                    body: tempMeta?.address_line_2,
                  },
                  {
                    title: 'Landmark',
                    body: tempMeta?.landmark,
                  },
                  {
                    title: 'City',
                    body: userData?.vendor?.organization?.city,
                  },
                  {
                    title: 'Pincode',
                    body: userData?.vendor?.organization?.pincode,
                  },
                  {
                    title: 'State',
                    body: userData?.vendor?.organization?.state,
                  },
                ]}
                contentContainerStyle={{marginTop: hp(2)}}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.textWrapper} key={index}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      <Text style={styles.bodyText}>
                        {item?.body || item.title}
                      </Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View style={styles.separatorView} />
                )}
              />
            </View>
          )}
          {renderIcon(2, 'Other Details')}
          {openArray.includes(2) && (
            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
              }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={[
                  {
                    title: 'Categories Covered',
                    body: '',
                  },
                  {
                    title: 'Commission Rate',
                    body: userData?.vendor?.organization?.commission + '%',
                  },
                  {
                    title: 'Status',
                    body:
                      userData?.vendor?.organization?.status === 1
                        ? 'Active'
                        : 'Inactive',
                  },
                  {
                    title: 'Service Type',
                    body:
                      service_index > -1
                        ? Object.keys(serviceType)[service_index]
                        : ' ',
                  },
                  {
                    title: 'Vendor Status',
                    body: userData?.vendor?.organization?.service_type
                      ? 'Verified'
                      : 'Not Verified',
                  },
                ]}
                contentContainerStyle={{marginTop: hp(2)}}
                renderItem={({item, index}) => {
                  if (
                    roles?.admin !== userData?.vendor?.user_role &&
                    item?.title === 'Commission Rate'
                  ) {
                    return null;
                  }
                  return (
                    <View
                      style={[
                        styles.textWrapper,
                        index === 0
                          ? {}
                          : {
                              borderTopWidth: 0.8,
                              borderColor: Colors.silver,
                              marginTop: hp(1.5),
                              paddingTop: hp(1.5),
                            },
                      ]}
                      key={index}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      {(item.body !== '' && (
                        <Text style={styles.bodyText}>
                          {item?.body || item.title}
                        </Text>
                      )) || (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: 7,
                            flexWrap: 'wrap',
                          }}>
                          {userData?.vendor?.organization?.services?.map(
                            (aryData, aryIndex) => {
                              return (
                                <View
                                  style={[
                                    STYLES.categoryView,
                                    {
                                      width: 'auto',
                                      paddingHorizontal: wp(2),
                                    },
                                  ]}
                                  key={aryIndex}>
                                  <Text
                                    style={{
                                      color: Colors.inputTextColor,
                                      fontSize: hp(1.9),
                                      fontFamily: 'Roboto-Bold',
                                      textTransform: 'capitalize',
                                    }}>
                                    {aryData?.name}
                                  </Text>
                                </View>
                              );
                            },
                          )}
                        </View>
                      )}
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <VendorInformation
        onCloseIcon={() => setOpenIndex(-1)}
        visible={openIndex === 0}
      />
      <LocationDetails
        onCloseIcon={() => setOpenIndex(-1)}
        visible={openIndex === 1}
      />
      <ChangePassword
        onCloseIcon={() => setChangePassVisible(false)}
        visible={changePassVisible}
      />
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBG,
  },
  profilePhoto: {
    height: hp(12),
    width: hp(12),
    borderRadius: hp(6),
    backgroundColor: Colors.white,
    overflow: 'hidden',
    ...STYLES.common,
  },
  profileDetailText: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: hp(1.9),
  },
  inputForm: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: hp(2),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginVertical: hp(1),
  },
  topText: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(2.2),
    color: Colors.darkBlue,
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(2),
    color: Colors.inputTextColor,
    marginBottom: 10,
    marginTop: 5,
  },
  bodyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: hp(2.3),
    color: Colors.inputTextColor,
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  textWrapper: {
    paddingHorizontal: hp(1),
  },
  singleEdit: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#5643A8',
    marginLeft: 10,
    ...STYLES.common,
  },
  profileEdit: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#5643A8',
    ...STYLES.common,
  },
});
