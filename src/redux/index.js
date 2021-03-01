import React from 'react';
import {SafeAreaView} from 'react-native';
import App from '../navigation';

console.disableYellowBox = true;
const MainNavigator = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <App />
    </SafeAreaView>
  );
};

export default MainNavigator;
