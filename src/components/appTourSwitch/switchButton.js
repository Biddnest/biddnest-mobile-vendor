import React, {Component} from 'react';
import {StyleSheet, View, DeviceEventEmitter, Pressable} from 'react-native';
import {AppTour, AppTourSequence, AppTourView} from 'react-native-app-tour';
import {Colors, hp, wp} from '../../constant/colors';
import {STYLES} from '../../constant/commonStyle';
import Switch from '../switch';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FilterButton from '../filterButton';
import Filter from '../../assets/svg/filter.svg';

export default class SwitchButton extends Component<{}> {
  constructor(props) {
    super(props);

    this.appTourTargets = [];
  }

  componentWillMount() {
    this.registerSequenceStepEvent();
    this.registerFinishSequenceEvent();
  }

  componentDidMount() {
    setTimeout(() => {
      let appTourSequence = new AppTourSequence();
      this.appTourTargets.forEach((appTourTarget) => {
        appTourSequence.add(appTourTarget);
      });

      AppTour.ShowSequence(appTourSequence);
    }, 1000);
  }

  registerSequenceStepEvent = () => {
    if (this.sequenceStepListener) {
      this.sequenceStepListener.remove();
    }
    this.sequenceStepListener = DeviceEventEmitter.addListener(
      'onShowSequenceStepEvent',
      (e: Event) => {},
    );
  };

  registerFinishSequenceEvent = () => {
    if (this.finishSequenceListener) {
      this.finishSequenceListener.remove();
    }
    this.finishSequenceListener = DeviceEventEmitter.addListener(
      'onFinishSequenceEvent',
      (e: Event) => {},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            STYLES.common,
            {alignItems: 'center', flexDirection: 'row', height: '100%'},
          ]}>
          {this.props.onPressFilter && (
            <View
              style={{
                height: '100%',
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}>
              <FilterTop
                key={new Date()}
                style={styles.top}
                addAppTourTarget={(appTourTarget) => {
                  if (this?.props?.appTour) {
                    this.appTourTargets.push(appTourTarget);
                  }
                }}
                onPressFilter={this?.props.onPressFilter}
              />
            </View>
          )}
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
                addAppTourTarget={(appTourTarget) => {
                  if (this?.props?.appTour) {
                    this.appTourTargets.push(appTourTarget);
                  }
                }}
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
                addAppTourTarget={(appTourTarget) => {
                  if (this?.props?.appTour) {
                    this.appTourTargets.push(appTourTarget);
                  }
                }}
                onPress={this?.props.onPressSupport}
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
          ref={(ref) => {
            if (!ref) {
              return;
            }
            this.button1 = ref;
            let props = {
              order: 2,
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
          onPress={() => {
            this?.props?.onPress();
            let props = {
              order: 3,
              title: 'Control Notifications',
              description: 'You can turn off notifications here when away',
              backgroundPromptColor: Colors.darkBlue,
              outerCircleColor: Colors.darkBlue,
              targetRadius: 30,
            };

            let targetView = AppTourView.for(this.button1, {
              ...props,
            });

            AppTour.ShowFor(targetView);
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
          ref={(ref) => {
            if (!ref) {
              return;
            }
            this.button2 = ref;
            let props = {
              order: 3,
              title: 'Support',
              description: 'Contact through Chat or Call',
              backgroundPromptColor: Colors.darkBlue,
              outerCircleColor: Colors.darkBlue,
              targetRadius: 30,
            };
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(AppTourView.for(ref, {...props}));
          }}
          style={{...STYLES.common, width: wp(12), height: '100%'}}
          onPress={() => {
            this?.props?.onPress();
            let props = {
              order: 1,
              title: 'Support',
              description: 'Contact through Chat or Call',
              backgroundPromptColor: Colors.darkBlue,
              outerCircleColor: Colors.darkBlue,
              targetRadius: 30,
            };

            let targetView = AppTourView.for(this.button2, {
              ...props,
            });
            AppTour.ShowFor(targetView);
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
      <View style={styles.container}>
        <Pressable
          onPress={() => this.props.onPressFilter()}
          ref={(ref) => {
            if (!ref) {
              return;
            }
            let props = {
              order: 1,
              title: 'Filter',
              description: 'Filter by various status, dates and more',
              backgroundPromptColor: Colors.darkBlue,
              outerCircleColor: Colors.darkBlue,
              targetRadius: 30,
            };
            this.props.addAppTourTarget &&
              this.props.addAppTourTarget(AppTourView.for(ref, {...props}));
          }}
          style={{
            position: 'absolute',
            height: hp(9),
            width: hp(9),
            bottom: hp(1),
            right: hp(1),
          }}>
          <Filter width={hp(9)} height={hp(9)} />
        </Pressable>
      </View>
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
