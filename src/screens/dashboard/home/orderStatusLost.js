import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Colors, hp, wp} from '../../../constant/colors';
import {STYLES} from '../../../constant/commonStyle';
import {BarChart} from 'react-native-chart-kit';

const OrderStatusLost = (props) => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginBottom: hp(3),
          marginTop: hp(1),
        }}>
        <Image
          source={require('../../../assets/images/error.png')}
          style={styles.errorImage}
          resizeMode={'contain'}
        />
        <Text style={styles.errorText}>Sorry, you lost this bid.</Text>
      </View>
      <View style={[STYLES.inputForm, {borderRadius: hp(1), marginTop: 0}]}>
        <Text
          style={[
            STYLES.inputTextLabel,
            {textAlign: 'center', marginBottom: hp(2)},
          ]}>
          Below chart shows your position along with others
        </Text>
        <BarChart
          data={{
            labels: ['January', 'February', 'March', 'April'],
            datasets: [
              {
                data: [1000, 2000, 3000, 4000],
              },
            ],
          }}
          width={wp(80)}
          height={hp(40)}
          chartConfig={{
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            fillShadowGradient: Colors.darkBlue,
            fillShadowGradientOpacity: 1,
            color: (opacity = 1) => 'rgba(28, 0, 122, 1)',
            strokeWidth: 0, // optional, default 3
            useShadowColorFromDataset: false, // optional
            propsForBackgroundLines: {
              strokeWidth: 0,
            },
          }}
        />
        <Text style={styles.rankText}>
          YOUR POSITION {'   '}
          <Text style={{fontFamily: 'Roboto-Bold'}}>4th</Text>
        </Text>
      </View>
    </View>
  );
};

export default OrderStatusLost;

const styles = StyleSheet.create({
  rankText: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.pageBG,
    color: Colors.darkBlue,
    fontFamily: 'Roboto-Regular',
    fontSize: wp(4),
    borderRadius: 10,
    overflow: 'hidden',
  },
  errorImage: {
    width: wp(10),
    height: wp(10),
    alignSelf: 'center',
    marginTop: hp(2),
    marginBottom: hp(1.5),
  },
  errorText: {
    fontFamily: 'Roboto-Italic',
    fontSize: wp(3.8),
    color: Colors.darkBlue,
    marginHorizontal: wp(10),
    textAlign: 'center',
  },
});
