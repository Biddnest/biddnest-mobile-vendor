import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {AppTourView} from 'react-native-app-tour';
import {Colors, wp, hp} from '../../constant/colors';
import {STYLES} from '../../constant/commonStyle';
import Switch from '../switch';

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
              title: 'Control Notifications',
              description: 'You can turn off notifications here when away.',
              backgroundPromptColor: Colors.darkBlue,
              outerCircleColor: Colors.darkBlue,
              targetRadius: 30,
            };
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(AppTourView.for(ref, {...props}));
          }}
          style={{...STYLES.common, width: wp(12), height: '100%'}}
          onPress={this?.props?.onPress}>
          <Switch
            switchValue={this?.props.switchValue}
            onChange={this?.props.onChange}
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
