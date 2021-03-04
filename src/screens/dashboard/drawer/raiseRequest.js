import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import SimpleHeader from '../../../components/simpleHeader';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';
import TextInput from '../../../components/textInput';

const RaiseRequest = (props) => {
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <SimpleHeader
        headerText={'Raise a Request'}
        navigation={props.navigation}
        onBack={() => props.navigation.goBack()}
        right={true}
        onRightPress={() => {}}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1, margin: hp(3)}}>
        <TextInput
          label={'Category'}
          placeHolder={'Abc'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Subject'}
          placeHolder={'Abc'}
          onChange={(text) => {}}
        />
        <TextInput
          label={'Message'}
          placeHolder={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
          }
          numberOfLines={4}
          height={hp(20)}
          onChange={(text) => {}}
        />
        <View style={{alignSelf: 'center'}}>
          <Button label={'submit'} onPress={() => {}} spaceTop={hp(2)} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default RaiseRequest;

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
