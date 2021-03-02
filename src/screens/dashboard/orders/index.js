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
        style={styles.inputForm}
        key={index}
        onPress={() => selectedTab === 0 && handleOrderClicked(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {selectedTab === 0 ? (
            <Text style={styles.leftText}>ORDER ID</Text>
          ) : (
            <Text style={styles.statusView}>Completed</Text>
          )}
          <Text style={styles.rightText}>#342345</Text>
        </View>
        <View
          style={[
            styles.separatorView,
            {width: wp(90), alignSelf: 'center', marginBottom: hp(2)},
          ]}
        />
        {selectedTab === 0 && (
          <View>
            <View
              style={{
                flex: 1,
              }}>
              <View style={styles.flexBoxOrders}>
                <View style={styles.priceView}>
                  <Text style={styles.participatedText}>Rs. 4000</Text>
                </View>
                <View style={styles.priceView}>
                  <Text style={styles.participatedText}>Rs. 4000</Text>
                </View>
              </View>
              <View style={styles.flexBoxOrders}>
                <Text style={styles.labelText}>Expected Rate</Text>
                <Text style={styles.labelText}>Time Left</Text>
              </View>
            </View>
            <View style={[styles.separatorView, {marginBottom: hp(2)}]} />
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
              <Text style={{...styles.locationText, marginTop: 0}}>
                CHENNAI
              </Text>
              <Text style={styles.locationText}>BENGALURU</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={{...styles.locationText, marginTop: 0}}>
                DISTANCE
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: hp(1),
                }}>
                <Text style={styles.rightText}>314KM</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.separatorView} />
        {selectedTab === 1 && (
          <View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>bid price</Text>
              <Text style={styles.rightText}>Rs. 5000</Text>
            </View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>accepted on</Text>
              <Text style={styles.rightText}>25 Jan 2021</Text>
            </View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>completed date</Text>
              <Text style={styles.rightText}>25 Jan 2021</Text>
            </View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>bid submitted by</Text>
              <Text style={styles.rightText}>Mayank Shah</Text>
            </View>
          </View>
        )}
        {selectedTab === 0 && (
          <View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>Moving Date</Text>
              <Text style={styles.rightText}>25 Jan 2021</Text>
            </View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>category</Text>
              <Text style={styles.rightText}>1 BHK</Text>
            </View>
            <View style={styles.flexBox}>
              <Text style={styles.leftText}>bid submitted by</Text>
              <Text style={styles.rightText}>Mayank Shah</Text>
            </View>
          </View>
        )}
      </Pressable>
    );
  };
  return (
    <LinearGradient
      colors={[Colors.pageBG, Colors.white]}
      style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={'History'}
        right={true}
        onRightPress={() => {}}
      />
      <View style={{height: hp(7), flexDirection: 'row'}}>
        {['Participated Orders', 'Past Orders'].map((item, index) => {
          return (
            <Pressable
              key={index}
              style={{
                ...styles.tabViews,
                ...STYLES.common,
                borderColor:
                  selectedTab === index ? Colors.darkBlue : '#ACABCD',
                borderBottomWidth: selectedTab === index ? 2 : 0.8,
              }}
              onPress={() => setSelectedTab(index)}>
              <Text
                style={{
                  ...styles.tabText,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBG,
  },
  tabViews: {
    flex: 1,
  },
  tabText: {
    fontSize: wp(4),
    fontFamily: 'Roboto-Medium',
  },
  inputForm: {
    marginHorizontal: wp(5),
    paddingVertical: wp(5),
    paddingHorizontal: wp(5),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: hp(2),
  },
  locationText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4.5),
    marginTop: hp(1),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginTop: hp(2),
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  leftText: {
    fontFamily: 'Roboto-Regular',
    fontSize: wp(4.3),
    color: Colors.inputTextColor,
    textTransform: 'uppercase',
  },
  rightText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4.5),
    color: Colors.inputTextColor,
    width: '50%',
    textAlign: 'right',
  },
  statusView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.lightGreen,
    color: Colors.white,
    borderRadius: 5,
    textTransform: 'uppercase',
    fontFamily: 'Gilroy-Semibold',
    fontSize: wp(4),
  },
  priceView: {
    backgroundColor: Colors.silver,
    width: '45%',
    height: hp(5),
    borderRadius: 5,
    ...STYLES.common,
  },
  participatedText: {
    color: Colors.darkBlue,
    fontSize: wp(5),
    fontFamily: 'Roboto-Bold',
  },
  flexBoxOrders: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    width: '45%',
    color: Colors.inputTextColor,
    fontSize: wp(3.6),
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
    marginTop: 3,
  },
});
