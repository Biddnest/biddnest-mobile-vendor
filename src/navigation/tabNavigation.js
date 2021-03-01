import React from 'react';
import {Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MainStackNavigator,
  OrdersStackNavigator,
  ProfileStackNavigator,
} from './stackNavigation';
import {wp, hp, Colors} from '../constant/colors';

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
              return renderImage(require('../assets/images/active_home.png'));
            }
            return renderImage(require('../assets/images/inactive_home.png'));
          } else if (route.name === 'Orders') {
            if (focused) {
              return renderImage(
                require('../assets/images/active_booking.png'),
              );
            }
            return renderImage(
              require('../assets/images/inactive_booking.png'),
            );
          } else if (route.name === 'Profile') {
            if (focused) {
              return renderImage(
                require('../assets/images/active_profile.png'),
              );
            }
            return renderImage(
              require('../assets/images/inactive_profile.png'),
            );
          }
          return (
            <Image
              source={require('../assets/images/active_home.png')}
              style={{height: hp(3), width: hp(3)}}
              resizeMode={'contain'}
            />
          );
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
                fontFamily: 'Roboto-Bold',
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
