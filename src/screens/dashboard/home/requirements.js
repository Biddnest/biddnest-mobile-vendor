import React, {useState} from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Linking,
  FlatList,
} from 'react-native';
import {
  boxShadow,
  Colors,
  hp,
  VENDOR_INFORMATION,
  wp,
} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import TwoButton from '../../../components/twoButton';
import CustomModalAndroid from '../../../components/customModal';
import CloseIcon from '../../../components/closeIcon';
import AcceptOrder from './acceptOrder';

const Requirements = (props) => {
  const [rejectVisible, setRejectVisible] = useState(false);
  const [acceptVisible, setAcceptVisible] = useState(false);
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View>
          <View
            style={{
              marginHorizontal: wp(10),
              marginTop: hp(2),
            }}>
            <View style={[STYLES.flexBox, {marginTop: 0}]}>
              <Text style={STYLES.leftText}>category</Text>
              <Text style={[STYLES.rightText, {marginBottom: hp(2)}]}>
                1 BHK
              </Text>
            </View>
          </View>
          <View style={[STYLES.inputForm, {marginTop: 0}]}>
            <Text
              style={{
                fontFamily: 'Gilroy-Regular',
                fontSize: wp(4),
                color: Colors.inputTextColor,
                textAlign: 'center',
                marginVertical: hp(2),
              }}>
              ITEM LIST
            </Text>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginTop: hp(2)}}
              data={[
                {
                  title: 'Tables',
                  body: 'Medium, Arcrylic',
                },
                {
                  title: 'TV',
                  body: 'Small, Polycarbonate',
                },
                {
                  title: 'Chair',
                  body: 'Large, Wood',
                },
              ]}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.textWrapper} key={index}>
                    <View style={{width: '75%'}}>
                      <Text style={styles.headerText}>{item.title}</Text>
                      <Text
                        style={[
                          styles.headerText,
                          {
                            fontFamily: 'Roboto-Regular',
                            marginTop: 5,
                            fontSize: wp(3.5),
                          },
                        ]}>
                        {item.body}
                      </Text>
                    </View>
                    <Text style={styles.rightText}>01</Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={[STYLES.separatorView, {marginBottom: hp(2)}]} />
              )}
            />
          </View>
          <View style={STYLES.inputForm}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: wp(4),
                color: Colors.inputTextColor,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              Comments from customer
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto-Italic',
                fontSize: wp(3.6),
                color: Colors.inputTextColor,
                marginTop: hp(2),
              }}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </Text>
          </View>
          <View style={STYLES.inputForm}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: wp(4),
                color: Colors.inputTextColor,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}>
              Pictures uploaded by the customer
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={{
                paddingTop: hp(2),
              }}>
              {[1, 2].map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    onPress={() => {}}
                    style={{
                      height: wp(16),
                      width: wp(16),
                      borderRadius: wp(3),
                      backgroundColor: Colors.silver,
                      marginRight: wp(3),
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
          <TwoButton
            leftLabel={'REJECT'}
            rightLabel={'ACCEPT'}
            leftOnPress={() => setRejectVisible(true)}
            rightOnPress={() => setAcceptVisible(true)}
          />
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
        <Text style={STYLES.rejectText}>
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
    </View>
  );
};

export default Requirements;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightText: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: Colors.pageBG,
  },
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: wp(4),
    color: Colors.inputTextColor,
  },
});
