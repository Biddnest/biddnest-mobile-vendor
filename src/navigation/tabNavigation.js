import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MainStackNavigator,
  OrdersStackNavigator,
  ProfileStackNavigator,
} from './stackNavigation';
import {wp, hp, Colors} from '../constant/colors';
import ActiveHome from '../assets/svg/active_home.svg';
import InActiveHome from '../assets/svg/inactive_home.svg';
import ActiveBooking from '../assets/svg/active_booking.svg';
import InactiveBooking from '../assets/svg/inactive_booking.svg';
import ActiveProfile from '../assets/svg/active_profile.svg';
import InactiveProfile from '../assets/svg/inactive_profile.svg';

const TabNavigation = (props: any) => {
  const Tab = createBottomTabNavigator();

  const renderImage = (uri) => {
    return (
      <Image
        source={uri}
        style={{height: hp(5), width: hp(5)}}
        resizeMode={'contain'}
      />
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        activeTintColor: Colors.darkBlue,
        inactiveTintColor: '#9D9CC5',
        activeBackgroundColor: Colors.white,
        style: {
          height: hp(9),
          paddingVertical: hp(1),
          paddingBottom: hp(1),
          borderTopLeftRadius: wp(5),
          borderTopRightRadius: wp(5),
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Home') {
            if (focused) {
              return <ActiveHome width={hp(3)} height={hp(3)} />;
            }
            return <InActiveHome width={hp(12)} height={hp(12)} />;
          } else if (route.name === 'Orders') {
            if (focused) {
              return <ActiveBooking width={hp(12)} height={hp(12)} />;
            }
            return <InactiveBooking width={hp(3)} height={hp(3)} />;
          } else if (route.name === 'Profile') {
            if (focused) {
              return <ActiveProfile width={hp(12)} height={hp(12)} />;
            }
            return <InactiveProfile width={hp(3)} height={hp(3)} />;
          }
          return <ActiveHome width={hp(3)} height={hp(3)} />;
        },
        tabBarLabel: ({focused, color, size}) => {
          let tabLabel = 'Home';
          if (route.name === 'Home') {
          } else if (route.name === 'Orders') {
            tabLabel = 'Orders';
          } else if (route.name === 'Profile') {
            tabLabel = 'My Profile';
          }
          return (
            <Text
              style={{
                fontFamily: 'Gilroy-Bold',
                fontSize: wp(3.5),
                color: focused ? Colors.darkBlue : '#9D9CC5',
              }}>
              {tabLabel}
            </Text>
          );
        },
      })}>
      <Tab.Screen name="Home" component={MainStackNavigator} />
      <Tab.Screen name="Orders" component={OrdersStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
