import React, {useState, useEffect} from 'react';
import {FlatList, Image, Platform, ScrollView, Text, View} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import {STORE} from '../../../redux';
import {APICall} from '../../../redux/actions/user';
import {CustomAlert, LoadingScreen} from '../../../constant/commonFun';

const Reports = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    let obj = {
      url: 'reports',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + STORE.getState().Login?.loginData?.token,
      },
    };
    APICall(obj)
      .then((res) => {
        setLoading(false);
        if (res?.data?.status === 'success') {
          if (res?.data?.data?.reports) {
            setData(res?.data?.data?.reports);
          } else {
            setData({});
          }
        } else {
          CustomAlert(res?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        CustomAlert(err);
      });
  }, []);
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'reports'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      {isLoading && <LoadingScreen />}
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={[
            {
              title: 'NUMBER OF ORDERS WON',
              count: data?.won || 0,
            },
            {
              title: 'NUMBER OF ORDERS LOST',
              count: data?.lost || 0,
            },
            {
              title: 'NUMBER OF ORDERS PARTICIPATED',
              count: data?.participated || 0,
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
          ListEmptyComponent={() => (
            <View style={{marginTop: hp(20), ...STYLES.common}}>
              <Image
                source={require('../../../assets/images/empty_report.png')}
                style={{height: wp(30), width: wp(30)}}
                resizeMode={'contain'}
              />
              <Text style={STYLES.emptyText}>
                There are no reports generated.
              </Text>
            </View>
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default Reports;
