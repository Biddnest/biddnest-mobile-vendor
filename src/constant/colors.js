import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import React from 'react';
import LegalPolicies from '../assets/svg/legal_policies.svg';
import PrivacyPolicy from '../assets/svg/privacy_policy.svg';

export const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  textLabelColor: '#424D58',
  inputTextColor: '#3B4B58',
  textBG: '#FDFDFD',
  btnBG: '#FFBC1E',
  silver: '#E0E5EC',
  grey: 'grey',
  transparent: 'transparent',
  red: 'red',
  lightGreen: '#8CD09B',
  error: '#C75D5E',
  darkBlue: '#0F0C75',
  pageBG: '#EFEFF4',
};

export const boxShadow = {
  shadowOffset: {width: 0, height: 4},
  shadowOpacity: 0.8,
  elevation: 2,
  shadowRadius: 2,
  shadowColor: '#3B4B5833',
};

export const IMAGE_OPTIONS = {
  title: 'Biddnest',
  takePhotoButtonTitle: 'Camera...',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.5,
};

export const wp = widthPercentageToDP;
export const hp = heightPercentageToDP;

export const VENDOR_INFORMATION = [
  {
    title: 'Organization Name',
    body: 'Abc',
  },
  {
    title: 'Vendor Type',
    body: 'Owner',
  },
  {
    title: 'Organization Description',
    body:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
  },
  {
    title: 'Secondary Contact Number',
    body: '9734523422',
  },
  {
    title: 'Password',
    body: '*********',
  },
  {
    title: 'GSTIN Number',
    body: 'XXXXXXXXXXXX',
  },
];
export const OTHER_INFORMATION = [
  {
    title: 'Categories Covered',
    body: '',
  },
  {
    title: 'Commission Rate',
    body: '10%',
  },
  {
    title: 'Status',
    body: 'Active',
  },
  {
    title: 'Service Type',
    body: 'Economic',
  },
  {
    title: 'Vendor Status',
    body: 'Verified',
  },
];
