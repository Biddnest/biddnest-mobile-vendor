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
  Platform,
} from 'react-native';
import {
  Colors,
  hp,
  LOCATION_INFORMATION,
  OTHER_INFORMATION,
  VENDOR_INFORMATION,
  wp,
} from '../../../constant/colors';
import {HomeHeader} from '../home';
import {STYLES} from '../../../constant/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VendorInformation from './vendorInformation';
import LocationDetails from './locationDetails';
import OtherDetails from './otherDetails';

const Profile = (props) => {
  const [openArray, setOpenArray] = useState([]);
  const [openIndex, setOpenIndex] = useState();
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
    return (
      <Pressable
        onPress={() => onPress(index)}
        style={[
          styles.inputForm,
          {
            backgroundColor: openArray.includes(index)
              ? Colors.darkBlue
              : Colors.white,
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
            {openArray.includes(index) && (
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
              size={26}
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
            <Text style={styles.profileText}>DJ</Text>
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
                fontSize: wp(4.5),
                lineHeight: 25,
              }}>
              David Jerome
            </Text>
            <Text style={styles.profileDetailText}>+91 75671443465</Text>
            <Text style={styles.profileDetailText}>diginnobvators.com</Text>
          </View>
          <View style={{width: wp(12)}}>
            <View style={styles.profileEdit}>
              <MaterialIcons name={'edit'} color={Colors.white} size={30} />
            </View>
          </View>
        </ImageBackground>
        <View style={{flex: 1}}>
          {renderIcon(0, 'Vendor Information')}
          {openArray.includes(0) && (
            <View
              style={{
                width: wp(90),
                alignSelf: 'center',
              }}>
              <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{marginTop: hp(2)}}
                data={VENDOR_INFORMATION}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.textWrapper} key={index}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      <Text style={styles.bodyText}>{item.body}</Text>
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
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={LOCATION_INFORMATION}
                contentContainerStyle={{marginTop: hp(2)}}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.textWrapper} key={index}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      <Text style={styles.bodyText}>{item.body}</Text>
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
                bounces={false}
                showsVerticalScrollIndicator={false}
                data={OTHER_INFORMATION}
                contentContainerStyle={{marginTop: hp(2)}}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.textWrapper} key={index}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      {(item.body !== '' && (
                        <Text style={styles.bodyText}>{item.body}</Text>
                      )) || (
                        <View
                          style={{
                            flexDirection: 'row',
                            marginBottom: 7,
                            flexWrap: 'wrap',
                          }}>
                          {['Household', 'Office'].map((aryData, aryIndex) => {
                            return (
                              <View style={styles.categoryView} key={aryIndex}>
                                <Text
                                  style={{
                                    color: Colors.inputTextColor,
                                    fontSize: wp(3.8),
                                    fontFamily: 'Roboto-Bold',
                                  }}>
                                  {aryData}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View style={styles.separatorView} />
                )}
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
      <OtherDetails
        onCloseIcon={() => setOpenIndex(-1)}
        visible={openIndex === 2}
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
    ...STYLES.common,
  },
  profileText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.darkBlue,
    fontSize: wp(10),
  },
  profileDetailText: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: wp(4),
    lineHeight: 25,
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
    marginVertical: hp(1.5),
  },
  topText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4),
    color: Colors.darkBlue,
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(3.6),
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(3.8),
    color: Colors.inputTextColor,
    marginBottom: 10,
    marginTop: 5,
  },
  bodyText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(4.5),
    color: Colors.inputTextColor,
    marginBottom: 10,
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
    height: wp(12),
    width: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#5643A8',
    ...STYLES.common,
  },
  categoryView: {
    marginBottom: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: Colors.darkBlue,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: Colors.white,
    marginRight: 10,
  },
});
