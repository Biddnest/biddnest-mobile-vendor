import {Colors, hp, wp} from '../constant/colors';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../constant/commonStyle';
import EditPen from '../assets/svg/edit_pen.svg';
import MapPin from '../assets/svg/map_pin.svg';

const LocationDistance = (props) => {
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginTop: hp(2),
        padding: hp(2),
        flexDirection: 'row',
      }}>
      <MapPin />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
          alignItems: 'center',
          marginLeft: 5,
        }}>
        <View>
          <Text style={[styles.locationText, {marginTop: 0}]}>CHENNAI</Text>
          <Text style={styles.locationText}>BENGALURU</Text>
        </View>
        {(props.inTransit && (
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            {/*<Text style={styles.inTransitText}>In Transit</Text>*/}
            <Text style={styles.inTransitText}>04:10</Text>
            <View
              style={{
                ...styles.transitArrow,
                ...STYLES.common,
              }}>
              <Ionicons
                name={'arrow-forward-sharp'}
                size={30}
                color={Colors.white}
              />
            </View>
          </View>
        )) || (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.locationText}>DISTANCE</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: hp(1),
              }}>
              <Text
                style={{
                  fontFamily: 'Roboto-Bold',
                  fontSize: wp(5),
                  color: Colors.inputTextColor,
                }}>
                314KM
              </Text>
              {props.onEditClick && (
                <Pressable style={{marginLeft: 10}} onPress={props.onEditClick}>
                  <EditPen width={30} height={30} />
                </Pressable>
              )}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default LocationDistance;

const styles = StyleSheet.create({
  locationText: {
    fontFamily: 'Gilroy-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(4.5),
    marginTop: hp(2),
  },
  inTransitText: {
    fontFamily: 'Roboto-Bold',
    color: Colors.darkBlue,
    fontSize: wp(4),
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#EEE5FC',
    borderRadius: 5,
    overflow: 'hidden',
  },
  transitArrow: {
    height: 40,
    width: 40,
    backgroundColor: Colors.btnBG,
    borderRadius: 20,
    marginLeft: 10,
  },
});
