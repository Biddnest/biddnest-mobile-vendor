import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {Colors, hp, wp} from '../../constant/colors';
import {STYLES} from '../../constant/commonStyle';
import Switch from '../switch';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Filter from '../../assets/svg/filter.svg';

export default class SwitchButton extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            STYLES.common,
            {alignItems: 'center', flexDirection: 'row', height: '100%'},
          ]}>
          {!this?.props?.title && !this.props.onPressFilter && (
            <View
              style={{
                width: wp(12),
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <SwitchTop
                style={styles.top}
                onPress={this?.props.onRightPress}
                switchValue={this?.props.notificationToggle}
                onChange={this?.props.onChange}
              />
            </View>
          )}
          {!this.props.onPressFilter && (
            <View
              style={{
                width: wp(12),
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <SupportTop
                style={styles.top}
                onPress={this?.props.onPressSupport}
              />
            </View>
          )}
          {this.props.onPressFilter && (
            <View
              style={{
                position: 'absolute',
                height: hp(9),
                width: hp(9),
                bottom: hp(1),
                right: hp(1),
              }}>
              <FilterTop
                key={new Date()}
                style={styles.top}
                onPressFilter={this?.props.onPressFilter}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

class SwitchTop extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pressable
          style={{...STYLES.common, width: wp(12), height: '100%'}}
          onPress={() => {
            this?.props?.onPress();
          }}>
          <Switch
            switchValue={this?.props.switchValue}
            onChange={this?.props.onChange}
          />
        </Pressable>
      </View>
    );
  }
}

class SupportTop extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Pressable
          style={{...STYLES.common, width: wp(12), height: '100%'}}
          onPress={() => {
            this?.props?.onPress();
          }}>
          <SimpleLineIcons
            name={'earphones-alt'}
            color={Colors.darkBlue}
            size={hp(2.7)}
          />
        </Pressable>
      </View>
    );
  }
}

class FilterTop extends Component {
  render() {
    return (
      <Pressable style={{flex: 1}} onPress={() => this.props.onPressFilter()}>
        <Filter width={hp(9)} height={hp(9)} />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  center: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
});
