import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {Colors, wp, hp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Top extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pressable
          style={{...STYLES.common, width: wp(8), height: '100%'}}
          onPress={this?.props?.onheartPress}>
          <FontAwesome
            name={this?.props?.heart ? 'heart' : 'heart-o'}
            color={Colors.darkBlue}
            size={hp(2.7)}
          />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default Top;
