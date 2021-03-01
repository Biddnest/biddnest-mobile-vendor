import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {HomeHeader} from '../home';
import {STYLES} from '../../../constant/commonStyle';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Profile = (props) => {
  const [openArray, setOpenArray] = useState([]);
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.inputForm} key={index}>
        <View style={styles.flexBox}>
          <Text style={styles.topText}>{index + 1}. Test and save</Text>
          <Pressable
            onPress={() => {
              let temp = [...openArray];
              if (openArray.includes(index)) {
                const indexT = temp.indexOf(index);
                if (indexT > -1) {
                  temp.splice(indexT, 1);
                }
              } else {
                temp.push(index);
              }
              setOpenArray(temp);
            }}>
            <MaterialIcons
              name={openArray.includes(index) ? 'minus' : 'plus'}
              size={26}
              color={'#9A9FA4'}
            />
          </Pressable>
        </View>
        {openArray.includes(index) && (
          <View>
            <View style={styles.separatorView} />
            <Text style={styles.bottomText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. Lorem ipsum dolor sit amet.
            </Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <LinearGradient
      colors={[Colors.pageBG, Colors.white]}
      style={styles.container}>
      <HomeHeader
        navigation={props.navigation}
        title={'Profile'}
        right={true}
        onRightPress={() => {}}
      />
      <ScrollView
        style={{marginBottom: Platform.OS === 'android' ? 0 : hp(7)}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ImageBackground
          source={require('../../../assets/images/logo_background.png')}
          style={{
            height: hp(20),
            width: '100%',
            ...STYLES.common,
            flexDirection: 'row',
          }}
          resizeMode={'cover'}>
          <View style={styles.profilePhoto}>
            <Text style={styles.profileText}>DJ</Text>
          </View>
          <View
            style={{
              width: wp(55),
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                color: Colors.white,
                fontFamily: 'Roboto-Bold',
                fontSize: wp(4.5),
                lineHeight: 25,
              }}>
              David Jerome
            </Text>
            <Text style={styles.profileDetailText}>+91 75671443465</Text>
            <Text style={styles.profileDetailText}>diginnobvators.com</Text>
          </View>
          <View style={{width: wp(12)}}>
            <View
              style={{
                height: wp(12),
                width: wp(12),
                borderRadius: wp(6),
                backgroundColor: '#5643A8',
                ...STYLES.common,
              }}>
              <MaterialIcons name={'edit'} color={Colors.white} size={30} />
            </View>
          </View>
        </ImageBackground>
        <View style={{flex: 1}}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pageBG,
  },
  profilePhoto: {
    height: hp(12),
    width: hp(12),
    borderRadius: hp(6),
    backgroundColor: Colors.white,
    ...STYLES.common,
  },
  profileText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.darkBlue,
    fontSize: wp(10),
  },
  profileDetailText: {
    color: Colors.white,
    fontFamily: 'Roboto-Light',
    fontSize: wp(4),
    lineHeight: 25,
  },
  inputForm: {
    marginHorizontal: wp(5),
    padding: wp(4),
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.white,
    borderColor: '#DEE6ED',
    marginTop: hp(2),
  },
  separatorView: {
    borderWidth: 0.8,
    borderColor: Colors.silver,
    width: '100%',
    marginVertical: hp(1.5),
  },
  topText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4),
    color: Colors.inputTextColor,
  },
  bottomText: {
    fontFamily: 'Roboto-Regular',
    color: Colors.inputTextColor,
    fontSize: wp(3.6),
  },
  flexBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
