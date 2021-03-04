import React from 'react';
import {FlatList, Platform, ScrollView, Text, View} from 'react-native';
import {Colors, hp, VENDOR_INFORMATION, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';

const Reports = (props) => {
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'reports'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{marginBottom: Platform.OS === 'android' ? 0 : hp(7)}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={[
            {
              title: 'NUMBER OF ORDERS WON',
              count: 40,
            },
            {
              title: 'NUMBER OF ORDERS LOST',
              count: 16,
            },
            {
              title: 'NUMBER OF ORDERS PARTICIPATED',
              count: 56,
            },
          ]}
          renderItem={({item, index}) => {
            return (
              <LinearGradient
                colors={[Colors.darkBlue, '#36008C', '#5400A0']}
                style={{
                  flex: 1,
                  ...STYLES.inputForm,
                  marginTop: wp(5),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: 'Roboto-Regular',
                    fontSize: wp(3.8),
                  }}>
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: 'Roboto-Medium',
                    fontSize: wp(8),
                    marginTop: hp(1),
                  }}>
                  {item.count}
                </Text>
              </LinearGradient>
            );
          }}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default Reports;
