import React from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {Colors, hp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';

const UserRole = (props) => {
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'User roles'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{marginBottom: Platform.OS === 'android' ? 0 : hp(7)}}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </LinearGradient>
  );
};

export default UserRole;
