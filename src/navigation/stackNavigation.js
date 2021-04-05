import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/dashboard/home';
import OrderDetails from '../screens/dashboard/home/orderDetails';
import Orders from '../screens/dashboard/orders';
import Profile from '../screens/dashboard/profile';
import UserRole from '../screens/dashboard/drawer/userRole';
import Reports from '../screens/dashboard/drawer/reports';
import LegalPolicies from '../screens/dashboard/drawer/legalPolicies';
import TermsAndConditions from '../screens/dashboard/drawer/termsAndConditions';
import PrivacyPolicy from '../screens/dashboard/drawer/privacyPolicy';
import Support from '../screens/dashboard/drawer/support';
import RaiseRequest from '../screens/dashboard/drawer/raiseRequest';
import FAQS from '../screens/dashboard/drawer/faqs';
import FAQDetails from '../screens/dashboard/drawer/faqs/faqDetails';
import PayOuts from '../screens/dashboard/drawer/payOuts';
import PayOutDetails from '../screens/dashboard/drawer/payOutDetails';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} headerMode={false}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="UserRole" component={UserRole} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="LegalPolicies" component={LegalPolicies} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="RaiseRequest" component={RaiseRequest} />
      <Stack.Screen name="FAQs" component={FAQS} />
      <Stack.Screen name="FAQDetails" component={FAQDetails} />
      <Stack.Screen name="PayOuts" component={PayOuts} />
      <Stack.Screen name="PayOutDetails" component={PayOutDetails} />
    </Stack.Navigator>
  );
};

const OrdersStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} headerMode={false}>
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} headerMode={false}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export {MainStackNavigator, OrdersStackNavigator, ProfileStackNavigator};
