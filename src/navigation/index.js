import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/auth/splash';
import ForgotPassword from '../screens/auth/forgotPassword';
import Login from '../screens/auth/login';
import ChangePassword from '../screens/auth/changePassword';
import DrawerNavigation from './drawerNavigation';
import ChatRedirect from '../screens/dashboard/orders/chatRedirection';
import {navigationRef} from './RootNavigation';
import {
  OrientationLocker,
  PORTRAIT,
  UNLOCK,
} from 'react-native-orientation-locker';
import {isTablet} from 'react-native-device-info';

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  },
};

const App = () => {
  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }, []);
  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      {/*<OrientationLocker orientation={isTablet() ? UNLOCK : UNLOCK} />*/}
      <Stack.Navigator initialRouteName="Splash" headerMode={false}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ChangePasswordAuth" component={ChangePassword} />
        <Stack.Screen name="Dashboard" component={DrawerNavigation} />
        <Stack.Screen name="ChatRedirect" component={ChatRedirect} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
