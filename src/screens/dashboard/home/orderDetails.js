import React, {useState} from 'react';
import {Platform, Pressable, ScrollView, Text, View} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import Feather from 'react-native-vector-icons/Feather';
import TwoButton from '../../../components/twoButton';

const OrderDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const renderText = (key, value) => {
    return (
      <View>
        <Text style={STYLES.staticLabel}>{key}</Text>
        <Text
          style={[
            STYLES.staticLabel,
            {
              fontFamily: 'Roboto-Regular',
              marginTop: 5,
            },
          ]}>
          {value}
        </Text>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <SimpleHeader
        headerText={'Order Details'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        style={{marginBottom: Platform.OS === 'android' ? 0 : hp(7)}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          <View
            style={{
              flex: 1,
              marginHorizontal: wp(5),
              marginTop: hp(2),
            }}>
            <View style={STYLES.flexBoxOrders}>
              <View style={[STYLES.priceView, {width: '40%'}]}>
                <Text style={STYLES.participatedText}>Rs. 4000</Text>
              </View>
              <View style={[STYLES.priceView, {width: '40%'}]}>
                <Text style={STYLES.participatedText}>5:24:50</Text>
              </View>
            </View>
            <View style={STYLES.flexBoxOrders}>
              <Text style={STYLES.labelText}>Expected Rate</Text>
              <Text style={STYLES.labelText}>Time Left</Text>
            </View>
          </View>
          <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
          <View
            style={{
              marginHorizontal: wp(5),
            }}>
            <View style={[STYLES.flexBox, {marginTop: 0}]}>
              <Text style={STYLES.leftText}>order id</Text>
              <Text style={[STYLES.rightText, {marginBottom: hp(2)}]}>
                #123456
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: wp(5),
              backgroundColor: Colors.pageBG,
            }}>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>DISTANCE</Text>
              <Text style={STYLES.rightText}>563 KM</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>MOVING DATE</Text>
              <Text style={STYLES.rightText}>25 Jan 2021</Text>
            </View>
            <View style={STYLES.flexBox}>
              <Text style={STYLES.leftText}>Category</Text>
              <Text style={STYLES.rightText}>1 BHK</Text>
            </View>
            <View style={[STYLES.flexBox, {marginBottom: hp(2)}]}>
              <Text style={STYLES.leftText}>TYPE OF MOVEMENT</Text>
              <Text style={STYLES.rightText}>Shared</Text>
            </View>
          </View>
          <View style={STYLES.tabView}>
            {['Order Details', 'Requirements'].map((item, index) => {
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
                      color:
                        selectedTab === index ? Colors.darkBlue : '#ACABCD',
                    }}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              {renderText('Pickup Address', 'ABC Studio, ABC Street, Chennai')}
            </View>
            <View
              style={{
                height: wp(12),
                width: wp(12),
                borderRadius: wp(6),
                backgroundColor: Colors.pageBG,
                ...STYLES.common,
              }}>
              <Feather name={'map-pin'} color={Colors.darkBlue} size={wp(7)} />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
            }}>
            {renderText('Pincode', '560097')}
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>{renderText('Floor', '01')}</View>
            <View style={{flex: 1}}>{renderText('Lift', 'Yes')}</View>
          </View>
          <View
            style={[STYLES.separatorView, {width: '90%', alignSelf: 'center'}]}
          />
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              {renderText('Pickup Address', 'ABC Studio, ABC Street, Chennai')}
            </View>
            <View
              style={{
                height: wp(12),
                width: wp(12),
                borderRadius: wp(6),
                backgroundColor: Colors.pageBG,
                ...STYLES.common,
              }}>
              <Feather name={'map-pin'} color={Colors.darkBlue} size={wp(7)} />
            </View>
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
            }}>
            {renderText('Pincode', '560097')}
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              marginTop: hp(2),
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>{renderText('Floor', '01')}</View>
            <View style={{flex: 1}}>{renderText('Lift', 'Yes')}</View>
          </View>
          <TwoButton
            leftLabel={'REJECT'}
            rightLabel={'ACCEPT'}
            leftOnPress={() => {}}
            rightOnPress={() => {}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
