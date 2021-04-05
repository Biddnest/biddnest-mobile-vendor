import React from 'react';
import {View, Text, StyleSheet, Image, Linking} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';
import FinishMapPin from '../../../assets/svg/finish_map_pin.svg';
import Email from '../../../assets/svg/email.svg';
import {useSelector} from 'react-redux';

const Support = (props) => {
  const configData =
    useSelector((state) => state.Login?.configData?.contact_us?.details) || '';
  let data = JSON.parse(configData.toString());
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Support'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
        right={true}
        onRightPress={() => {}}
      />
      <View style={{flex: 1}}>
        <View style={styles.inputForm}>
          <View style={styles.flexBox}>
            <View style={{height: wp(10), width: wp(10)}}>
              <FinishMapPin width={'60%'} height={'60%'} />
            </View>
            <Text style={styles.bottomText}>{data?.address}</Text>
          </View>
          <View style={[styles.flexBox, {marginTop: hp(2)}]}>
            <View style={{height: wp(10), width: wp(10)}}>
              <Email width={'60%'} height={'60%'} />
            </View>
            <Text style={styles.bottomText}>{data?.email_id?.join(', ')}</Text>
          </View>
          <View style={[styles.flexBox, {marginTop: hp(2)}]}>
            <View style={{height: wp(10), width: wp(10)}}>
              <Ionicons
                name={'call-outline'}
                color={Colors.darkBlue}
                size={wp(6)}
              />
            </View>
            <Text style={styles.bottomText}>
              {data?.contact_no?.join(', ')}
            </Text>
          </View>
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label={'raise a request'}
            width={wp(43)}
            spaceBottom={wp(0.1)}
            backgroundColor={Colors.white}
            onPress={() => props.navigation.navigate('RaiseRequest')}
          />
          <Button
            label={'faqs'}
            width={wp(43)}
            spaceBottom={wp(0.1)}
            backgroundColor={Colors.white}
            onPress={() => props.navigation.navigate('FAQs')}
          />
        </View>
        <View style={styles.btnWrapper}>
          <Button
            label={'call us'}
            width={wp(43)}
            onPress={() =>
              data?.contact_no?.length > 0 &&
              Linking.openURL(`tel:${data?.contact_no[0]}`)
            }
          />
          <Button
            label={'email us'}
            width={wp(43)}
            onPress={() =>
              data?.email_id?.length > 0 &&
              Linking.openURL(`mailto:${data?.email_id[0]}`)
            }
          />
        </View>
      </View>
    </LinearGradient>
  );
};

export default Support;

const styles = StyleSheet.create({
  inputForm: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: wp(5),
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(3.6),
    width: wp(71),
  },
  flexBox: {
    flexDirection: 'row',
    width: wp(10),
  },
  btnWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(5),
  },
});
