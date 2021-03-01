import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image, Pressable, Text, View} from 'react-native';
import {Colors, wp, boxShadow} from '../../../constant/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {STYLES} from '../../../constant/commonStyle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export const HomeHeader = (props) => {
  return (
    <View
      style={[
        boxShadow,
        {
          height: 55,
          backgroundColor: Colors.white,
          flexDirection: 'row',
        },
      ]}>
      <Pressable
        style={{width: wp(13), height: '100%', ...STYLES.common}}
        onPress={() => props.navigation.toggleDrawer()}>
        <Image
          source={require('../../../assets/images/menu_icon.png')}
          resizeMode={'contain'}
          style={{
            height: 20,
            width: 20,
          }}
        />
      </Pressable>
      <View
        style={{
          width: props.right ? wp(74) : wp(87),
          height: '100%',
          ...STYLES.common,
        }}>
        {(props.title && (
          <Text
            style={{
              fontFamily: 'Gilroy-Semibold',
              color: Colors.inputTextColor,
              fontSize: wp(4.5),
              marginRight: props.right ? wp(0) : wp(13),
              textTransform: 'uppercase',
            }}>
            {props.title}
          </Text>
        )) || (
          <Image
            source={require('../../../assets/images/biddnest_logo.png')}
            resizeMode={'contain'}
            style={{
              height: '65%',
              width: '70%',
              marginRight: wp(13),
            }}
          />
        )}
      </View>
      {props.right ? (
        <Pressable
          style={{...STYLES.common, width: wp(13)}}
          onPress={props.onRightPress}>
          <SimpleLineIcons
            name={'earphones-alt'}
            color={Colors.darkBlue}
            size={20}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

const Home = (props) => {
  return (
    <LinearGradient colors={[Colors.pageBG, Colors.white]} style={{flex: 1}}>
      <Text>Home</Text>
    </LinearGradient>
  );
};

export default Home;
