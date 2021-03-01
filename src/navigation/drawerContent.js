import React, {useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Colors, hp, SIDE_DRAWER, wp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';

export function DrawerContent(props) {
  useEffect(() => {
    // let buildNumber = DeviceInfo.getBuildNumber(); // 1
    let buildNumber = DeviceInfo.getReadableVersion(); // 1.0.1
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
          <Ionicons name={item.icon} color={Colors.darkBlue} size={wp(6)} />
        );
      default:
        break;
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
            size={25}
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
      <View
        style={{
          height: hp(15),
          width: '100%',
        }}>
        <ImageBackground
          source={require('../assets/images/logo_background.png')}
          style={{height: '100%', width: '100%', ...STYLES.common}}
          resizeMode={'cover'}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.profilePhoto}>
              <Text style={styles.profileText}>DJ</Text>
            </View>
            <View style={{width: wp(45), paddingLeft: wp(2)}}>
              <Text numberOfLines={1} style={styles.userText}>
                Wayne Pvt Ltd
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Roboto-Regular',
                  color: Colors.white,
                  fontSize: wp(3.6),
                  marginTop: 6,
                }}>
                +91 9898989898
              </Text>
            </View>
            <View style={{width: wp(10)}}>
              <View style={styles.logoutWrapper}>
                <MaterialIcons
                  name={'logout'}
                  color={Colors.white}
                  size={wp(6)}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={styles.bottomView}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={SIDE_DRAWER}
          renderItem={renderItem}
        />
      </ScrollView>
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
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4),
  },
  bottomView: {
    borderTopLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
    backgroundColor: Colors.white,
    padding: wp(3),
    flex: 1,
  },
  menuView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Colors.silver,
    paddingVertical: 20,
    marginHorizontal: wp(3),
    alignItems: 'center',
  },
  topText: {
    fontFamily: 'Roboto-Regular',
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
