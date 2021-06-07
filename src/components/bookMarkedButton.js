import React, {Component} from 'react';
import {StyleSheet, View, DeviceEventEmitter} from 'react-native';
import {AppTour, AppTourSequence} from 'react-native-app-tour';
import Top from './Top';
import {APP_TOUR} from '../redux/types';

export default class BookMarkedButton extends Component<{}> {
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

  componentWillUnmount() {
    this.props.dispatch({
      type: APP_TOUR,
      payload: false,
    });
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
        <Top
          style={styles.top}
          addAppTourTarget={(appTourTarget) => {
            if (this?.props?.appTour) {
              this.appTourTargets.push(appTourTarget);
            }
          }}
          onheartPress={this?.props?.onheartPress}
          heart={this?.props?.heart}
        />
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
