import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import LinearGradient from 'react-native-linear-gradient';
import SimpleHeader from '../../../components/simpleHeader';
import {STYLES} from '../../../constant/commonStyle';
import FilterButton from '../../../components/filterButton';
import CloseIcon from '../../../components/closeIcon';
import CustomModalAndroid from '../../../components/customModal';
import FlatButton from '../../../components/flatButton';
import DropDownAndroid from '../../../components/dropDown';
import Slider from 'rn-range-slider';

const PayOuts = (props) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => props.navigation.navigate('PayOutDetails')}
        key={index}
        style={{
          flex: 1,
          paddingHorizontal: hp(2),
          paddingVertical: hp(2),
          alignItems: 'center',
          backgroundColor: Colors.white,
        }}>
        <View style={styles.flexBox}>
          <Text style={styles.topText}>3rd Feb 2021</Text>
          <Text style={[styles.topText, {color: Colors.darkBlue}]}>
            Rs. 10,000
          </Text>
        </View>
        <Text style={[styles.bottomText, {width: '100%', marginTop: hp(1)}]}>
          Number of Orders: 2
        </Text>
        <View style={styles.flexBox}>
          <Text style={[styles.bottomText, {width: '65%'}]}>
            Transaction Id: 12345678987
          </Text>
          <Text style={[styles.bottomText, styles.transferView]}>
            TRANSFERRED
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'PayOuts'}
        right={true}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.tableView}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={renderItem}
            ItemSeparatorComponent={() => (
              <View style={[STYLES.separatorView, {marginTop: 0}]} />
            )}
            ListEmptyComponent={() => (
              <View style={{marginTop: hp(20), ...STYLES.common}}>
                <Image
                  source={require('../../../assets/images/empty_payouts.png')}
                  style={{height: wp(30), width: wp(30)}}
                  resizeMode={'contain'}
                />
                <Text style={STYLES.emptyText}>
                  There are no reports generated.
                </Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <FilterButton onPress={() => setFilterVisible(true)} />
      <CustomModalAndroid
        visible={filterVisible}
        onPress={() => setFilterVisible(false)}>
        <View style={STYLES.modalHeaderView}>
          <Text style={STYLES.modalHeaderText}>FILTERS</Text>
          <CloseIcon
            style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => setFilterVisible(false)}
          />
        </View>
        <View style={{...STYLES.separatorView, width: '85%'}} />
        <View style={{marginTop: hp(2)}}>
          <Text style={STYLES.inputTextLabel}>Date</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.manPowerView}>
              <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                {'02 Jan'}
              </Text>
            </View>
            <Slider
              style={styles.sliderStyle}
              min={2}
              max={4}
              step={1}
              floatingLabel
              renderThumb={() => <View style={STYLES.sliderThumb} />}
              renderRail={() => (
                <View
                  style={{
                    ...STYLES.sliderRail,
                    width: '100%',
                    borderColor: '#EEE5FC',
                  }}
                />
              )}
              renderRailSelected={() => <View style={STYLES.sliderRail} />}
              renderLabel={(value) => (
                <Text style={STYLES.sliderLabel}>{value}</Text>
              )}
              onValueChanged={() => {}}
            />
            <View style={styles.manPowerView}>
              <Text style={[STYLES.inputTextStyle, {height: 'auto'}]}>
                {'04 Feb'}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 0,
            }}>
            <Text style={styles.dateBottomText}>From</Text>
            <Text
              style={[
                styles.dateBottomText,
                {
                  marginLeft: 0,
                  marginRight: wp(4),
                },
              ]}>
              To
            </Text>
          </View>
        </View>
        <View
          style={[
            {marginVertical: hp(2)},
            Platform.OS !== 'android' && {zIndex: 5001},
          ]}>
          <DropDownAndroid
            label={'Status'}
            width={wp(90)}
            items={[{label: 'Driver Unassigned', value: 'driverunassigned'}]}
            onChangeItem={(text) => {}}
          />
        </View>
        <FlatButton label={'apply'} onPress={() => setFilterVisible(false)} />
      </CustomModalAndroid>
    </LinearGradient>
  );
};

export default PayOuts;

const styles = StyleSheet.create({
  tableView: {
    borderWidth: 1,
    borderColor: Colors.silver,
    overflow: 'hidden',
    flex: 1,
  },
  topText: {
    fontFamily: 'Roboto-Bold',
    color: Colors.inputTextColor,
    fontSize: wp(4),
  },
  bottomText: {
    fontFamily: 'Roboto-Light',
    color: Colors.inputTextColor,
    fontSize: wp(3.8),
  },
  transferView: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: Colors.inputTextColor,
    borderRadius: 5,
    maxWidth: '35%',
  },
  flexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderStyle: {
    width: wp(48),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  manPowerView: {
    borderWidth: 2,
    borderRadius: 10,
    height: wp(12),
    width: wp(16),
    marginVertical: hp(1),
    borderColor: Colors.silver,
    ...STYLES.common,
  },
  dateBottomText: {
    fontFamily: 'Roboto-Regular',
    marginTop: 0,
    fontSize: wp(3.5),
    color: '#99A0A5',
    marginLeft: wp(2),
  },
});
