import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {AppTourView} from 'react-native-app-tour';
import {Colors, wp, hp} from '../constant/colors';
import {STYLES} from '../constant/commonStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Top extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pressable
          ref={(ref) => {
            if (!ref) {
              return;
            }
            let props = {
              order: 11,
              title: 'Save for later',
              description: 'You can bookmark this booking to bid later.',
              backgroundPromptColor: Colors.darkBlue,
              outerCircleColor: Colors.darkBlue,
              targetRadius: 20,
            };
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(AppTourView.for(ref, {...props}));
          }}
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
