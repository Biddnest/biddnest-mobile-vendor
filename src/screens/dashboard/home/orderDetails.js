import React, {useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import {boxShadow, Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import Feather from 'react-native-vector-icons/Feather';
import TwoButton from '../../../components/twoButton';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import AcceptOrder from './acceptOrder';
import MapModalAndroid from '../../../components/mapModal';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import FlatButton from '../../../components/flatButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderStatusWin from './orderStatusWin';
import OrderStatusPending from './orderStatusPending';
import OrderStatusLost from './orderStatusLost';

const OrderDetails = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [rejectVisible, setRejectVisible] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);
  const [placedSuccessVisible, setPlacedSuccessVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(null);
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
          heart={true}
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
            {['Order Details', 'Requirements', 'Order Status'].map(
              (item, index) => {
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
              },
            )}
          </View>
          {selectedTab === 0 && (
            <View>
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  {renderText(
                    'Pickup Address',
                    'ABC Studio, ABC Street, Chennai',
                  )}
                </View>
                <Pressable
                  style={STYLES.mapPinCircle}
                  onPress={() => setMapVisible('pickup')}>
                  <Feather
                    name={'map-pin'}
                    color={Colors.darkBlue}
                    size={wp(7)}
                  />
                </Pressable>
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
                style={[
                  STYLES.separatorView,
                  {width: '90%', alignSelf: 'center'},
                ]}
              />
              <View
                style={{
                  marginHorizontal: wp(5),
                  marginTop: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  {renderText(
                    'Drop Address',
                    'ABC Studio, ABC Street, Chennai',
                  )}
                </View>
                <Pressable
                  style={STYLES.mapPinCircle}
                  onPress={() => setMapVisible('drop')}>
                  <Feather
                    name={'map-pin'}
                    color={Colors.darkBlue}
                    size={wp(7)}
                  />
                </Pressable>
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
                leftOnPress={() => setRejectVisible(true)}
                rightOnPress={() => setAcceptVisible(true)}
              />
            </View>
          )}
          {selectedTab === 2 && (
            // <OrderStatusWin />
            // <OrderStatusPending />
            <OrderStatusLost />
          )}
        </View>
      </ScrollView>
      <CustomModalAndroid visible={rejectVisible}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>REJECT ORDER</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setRejectVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <Text
          style={{
            marginVertical: hp(3),
            fontFamily: 'Roboto-Regular',
            color: Colors.inputTextColor,
            fontSize: wp(4),
            marginHorizontal: wp(5),
            textAlign: 'center',
          }}>
          Are you sure you want to REJECT the order?
        </Text>
        <TwoButton
          leftLabel={'NO'}
          rightLabel={'YES'}
          leftOnPress={() => setRejectVisible(false)}
          rightOnPress={() => setRejectVisible(false)}
        />
      </CustomModalAndroid>
      <AcceptOrder
        visible={acceptVisible}
        onCloseIcon={() => setAcceptVisible(false)}
      />
      <CustomModalAndroid visible={placedSuccessVisible}>
        <View style={STYLES.modalHeaderView}>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setPlacedSuccessVisible(false)}
          />
        </View>
        <Feather name={'check-circle'} size={wp(30)} color={Colors.darkBlue} />
        <Text style={styles.bidText}>
          You have successfully placed your "BID"
        </Text>
      </CustomModalAndroid>
      <MapModalAndroid visible={mapVisible !== null}>
        <View style={styles.mapView}>
          <MapView
            provider={
              Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            style={{flex: 1}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
            />
          </MapView>
        </View>
        <CloseIcon
          onPress={() => setMapVisible(null)}
          style={[
            boxShadow,
            {
              position: 'absolute',
              right: 15,
              top: 15,
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: Colors.white,
              ...STYLES.common,
            },
          ]}
        />
        <View style={{marginVertical: hp(3), width: wp(90)}}>
          {renderText(
            mapVisible === 'pickup' ? 'Pickup Address' : 'Drop Address',
            'ABC Studio, ABC Street, Chennai',
          )}
        </View>
        <View style={{marginTop: hp(1)}}>
          <FlatButton
            label={'open in maps app'}
            onPress={() => {
              // Linking.openURL(
              //     'http://maps.google.com/maps/@21.2378888,72.863352',
              // )
            }}
          />
        </View>
      </MapModalAndroid>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  bidText: {
    marginTop: hp(3),
    marginBottom: hp(5),
    color: Colors.darkBlue,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(5),
    marginHorizontal: wp(20),
    textAlign: 'center',
  },
  mapView: {
    height: hp(67),
    width: wp(100),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
});
