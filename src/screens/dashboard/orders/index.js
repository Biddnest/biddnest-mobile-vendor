import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, Image} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {HomeHeader} from '../home';
import {STYLES} from '../../../constant/commonStyle';
import LinearGradient from 'react-native-linear-gradient';

const Orders = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleOrderClicked = (item) => {
    // props.navigation.navigate('OrderTracking', {orderData: item});
  };
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={STYLES.inputForm}
        key={index}
        onPress={() => selectedTab === 0 && handleOrderClicked(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {selectedTab === 0 ? (
            <Text style={STYLES.leftText}>ORDER ID</Text>
          ) : (
            <Text style={STYLES.statusView}>Completed</Text>
          )}
          <Text style={STYLES.rightText}>#342345</Text>
        </View>
        <View
          style={[
            STYLES.separatorView,
            {width: wp(90), alignSelf: 'center', marginBottom: hp(2)},
          ]}
        />
        {selectedTab === 0 && (
          <View>
            <View
              style={{
                flex: 1,
              }}>
              <View style={STYLES.flexBoxOrders}>
                <View style={STYLES.priceView}>
                  <Text style={STYLES.participatedText}>Rs. 4000</Text>
                </View>
                <View style={STYLES.priceView}>
                  <Text style={STYLES.participatedText}>Rs. 4000</Text>
                </View>
              </View>
              <View style={STYLES.flexBoxOrders}>
                <Text style={STYLES.labelText}>Expected Rate</Text>
                <Text style={STYLES.labelText}>Time Left</Text>
              </View>
            </View>
            <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
          </View>
        )}

        <View
          style={{
            backgroundColor: Colors.white,
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../../assets/images/pin_distance.png')}
            style={{height: wp(15), width: wp(10)}}
            resizeMode={'contain'}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              alignItems: 'center',
            }}>
            <View>
              <Text style={{...STYLES.locationText, marginTop: 0}}>
                CHENNAI
              </Text>
              <Text style={STYLES.locationText}>BENGALURU</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{...STYLES.locationText, marginTop: 0}}>
                DISTANCE
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(1),
                }}>
                <Text style={STYLES.rightText}>314KM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={STYLES.separatorView} />
        {selectedTab === 1 && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid price</Text>
              <Text style={STYLES.rightText}>Rs. 5000</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>accepted on</Text>
              <Text style={STYLES.rightText}>25 Jan 2021</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>completed date</Text>
              <Text style={STYLES.rightText}>25 Jan 2021</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid submitted by</Text>
              <Text style={STYLES.rightText}>Mayank Shah</Text>
            </View>
          </View>
        )}
        {selectedTab === 0 && (
          <View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Moving Date</Text>
              <Text style={STYLES.rightText}>25 Jan 2021</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={STYLES.rightText}>1 BHK</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>bid submitted by</Text>
              <Text style={STYLES.rightText}>Mayank Shah</Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <LinearGradient
      colors={[Colors.pageBG, Colors.white]}
      style={STYLES.container}>
      <HomeHeader
        navigation={props.navigation}
        title={'History'}
        right={true}
        onRightPress={() => {}}
      />
      <View style={STYLES.tabView}>
        {['Participated Orders', 'Past Orders'].map((item, index) => {
          return (
            <Pressable
              key={index}
              style={{
                ...STYLES.common,
                borderColor:
                  selectedTab === index ? Colors.darkBlue : '#ACABCD',
                borderBottomWidth: selectedTab === index ? 2 : 0,
              }}
              onPress={() => setSelectedTab(index)}>
              <Text
                style={{
                  ...STYLES.tabText,
                  color: selectedTab === index ? Colors.darkBlue : '#ACABCD',
                }}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{flex: 1}}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3]}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <Text
              style={{
                fontFamily: 'Roboto-Italic',
                fontSize: wp(3.5),
                color: '#99A0A5',
                textAlign: 'center',
                marginHorizontal: 20,
                marginVertical: hp(5),
              }}>
              No any orders!
            </Text>
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default Orders;
