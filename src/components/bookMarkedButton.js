import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Top from './Top';

export default class BookMarkedButton extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Top
          style={styles.top}
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
