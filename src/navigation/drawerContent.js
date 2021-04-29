import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Colors, hp, wp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import {resetNavigator} from '../constant/commonFun';
import {RESET_STORE} from '../redux/types';
import {useDispatch, useSelector} from 'react-redux';
import LegalPolicies from '../assets/svg/legal_policies.svg';
import PrivacyPolicy from '../assets/svg/privacy_policy.svg';

export function DrawerContent(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.Login?.loginData?.vendor) || {};
  const roles =
    useSelector((state) => state.Login?.configData?.enums?.vendor?.roles) || {};
  const [SIDE_DRAWER, setSIDE_DRAWER] = useState([
    {
      iconFamily: 'Ionicons',
      icon: 'home-outline',
      topText: 'Home',
      bottomText: 'Search Orders',
      navigate: 'Home',
    },
    {
      iconFamily: 'Feather',
      icon: 'users',
      topText: 'User Roles',
      bottomText: 'Search Orders',
      navigate: 'UserRole',
    },
    {
      image: <LegalPolicies width={wp(7.5)} height={wp(7.5)} />,
      topText: 'Legal Policies',
      bottomText: 'Search Orders',
      navigate: 'LegalPolicies',
    },
    {
      iconFamily: 'AntDesign',
      icon: 'copyright',
      topText: 'Terms and Conditions',
      bottomText: 'Search Orders',
      navigate: 'TermsAndConditions',
    },
    {
      image: <PrivacyPolicy width={wp(7.5)} height={wp(7.5)} />,
      topText: 'Privacy Policy',
      bottomText: 'Search Orders',
      navigate: 'PrivacyPolicy',
    },
    {
      iconFamily: 'Ionicons',
      icon: 'call-outline',
      topText: 'Support',
      bottomText: 'Raise a request to change price',
      navigate: 'Support',
    },
  ]);

  useEffect(() => {
    if (roles?.driver !== userData?.user_role) {
      let temp = [...SIDE_DRAWER];
      temp.splice(
        2,
        0,
        {
          iconFamily: 'MaterialCommunityIcons',
          icon: 'credit-card-outline',
          topText: 'Payouts',
          bottomText: 'Search Orders',
          navigate: 'PayOuts',
        },
        {
          iconFamily: 'AntDesign',
          icon: 'filetext1',
          topText: 'Reports',
          bottomText: 'Search Orders',
          navigate: 'Reports',
        },
      );
      setSIDE_DRAWER(temp);
    }
  }, []);
  const renderIcon = (item) => {
    switch (item.iconFamily) {
      case 'FontAwesome5':
        return (
          <FontAwesome5 name={item.icon} color={Colors.darkBlue} size={wp(6)} />
        );
      case 'MaterialCommunityIcons':
        return (
          <MaterialCommunityIcons
            name={item.icon}
            color={Colors.darkBlue}
            size={wp(6)}
          />
        );
      case 'Feather':
        return (
          <Feather name={item.icon} color={Colors.darkBlue} size={wp(6)} />
        );
      case 'AntDesign':
        return (
          <AntDesign name={item.icon} color={Colors.darkBlue} size={wp(6)} />
        );
      case 'Ionicons':
        return (
          <Ionicons name={item.icon} color={Colors.darkBlue} size={wp(7)} />
        );
      default:
        return item.image;
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={styles.menuView}
        key={index}
        onPress={() => {
          props.navigation.navigate(item.navigate);
          props.navigation.closeDrawer();
        }}>
        <View style={{width: wp(10)}}>{renderIcon(item)}</View>
        <View
          style={{
            width: wp(50),
          }}>
          <Text style={styles.topText}>{item.topText}</Text>
          <Text style={styles.bottomText}>{item.bottomText}</Text>
        </View>
        <View style={{width: wp(8)}}>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            color={Colors.silver}
            size={hp(3.5)}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <LinearGradient
      colors={[Colors.darkBlue, '#333092']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        flex: 1,
      }}>
      <ImageBackground
        source={require('../assets/images/logo_background.png')}
        style={{height: hp(15), width: '100%', ...STYLES.common}}
        resizeMode={'cover'}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.profilePhoto}>
            <Image
              source={{uri: userData?.image}}
              style={{height: '100%', width: '100%'}}
              resizeMode={'contain'}
            />
          </View>
          <View style={{width: wp(45), paddingLeft: wp(2)}}>
            <Text numberOfLines={1} style={styles.userText}>
              {userData?.fname} {userData?.lname}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Gilroy-SemiBold',
                color: Colors.white,
                fontSize: wp(3.6),
                marginTop: 5,
              }}>
              +91 {userData?.phone}
            </Text>
          </View>
          <View style={{width: wp(10)}}>
            <Pressable
              style={styles.logoutWrapper}
              onPress={() => {
                dispatch({
                  type: RESET_STORE,
                });
                resetNavigator(props, 'Login');
              }}>
              <MaterialIcons
                name={'logout'}
                color={Colors.white}
                size={wp(6)}
              />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomView}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={SIDE_DRAWER}
          renderItem={renderItem}
        />
        <View>
          <Text
            style={{
              color: Colors.inputTextColor,
              marginLeft: wp(3),
              marginVertical: wp(3),
              fontSize: wp(3.1),
              fontFamily: 'Gilroy-Regular',
              textAlign: 'center',
              letterSpacing: 1,
            }}>
            App Version: v{DeviceInfo.getReadableVersion()}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: 'pink',
  },
  profilePhoto: {
    height: wp(15),
    width: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: Colors.white,
    overflow: 'hidden',
    ...STYLES.common,
  },
  profileText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.darkBlue,
    fontSize: wp(6),
  },
  logoutWrapper: {
    height: wp(10),
    width: wp(10),
    borderRadius: wp(5),
    backgroundColor: '#5643A7',
    ...STYLES.common,
  },
  userText: {
    color: Colors.white,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: wp(4),
  },
  bottomView: {
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    backgroundColor: Colors.white,
    paddingHorizontal: wp(3),
    paddingTop: wp(3),
    flex: 1,
  },
  menuView: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: Colors.silver,
    paddingVertical: 20,
    marginHorizontal: wp(3),
    alignItems: 'center',
  },
  topText: {
    fontFamily: 'Gilroy-SemiBold',
    color: Colors.darkBlue,
    fontSize: wp(4),
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(3.3),
    marginTop: 3,
  },
});
