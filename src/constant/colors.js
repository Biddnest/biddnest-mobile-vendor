import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import React from 'react';

export const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  textLabelColor: '#424D58',
  inputTextColor: '#3B4B58',
  textBG: '#FDFDFD',
  btnBG: '#EBC352',
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

const renderImage = (uri, size = 50) => {
  return (
    <Image
      source={uri}
      resizeMode={'contain'}
      style={{height: size, width: size}}
    />
  );
};

export const VENDOR_INFORMATION = [
  {
    title: 'Email ID',
    body: 'davidjerome@gmail.com',
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
    title: 'Password',
    body: '*********',
  },
  {
    title: 'GSTIN Number',
    body: 'XXXXXXXXXXXX',
  },
];
export const LOCATION_INFORMATION = [
  {
    title: 'Address Line 1',
    body: 'Lorem ipsum dolor sit amet',
  },
  {
    title: 'Address Line 2',
    body: 'Consetetur sadipscing elitr',
  },
  {
    title: 'Landmark',
    body: 'Sed diam nonumy',
  },
  {
    title: 'City',
    body: 'Bengaluru',
  },
  {
    title: 'District',
    body: 'Bengaluru',
  },
  {
    title: 'Pincode',
    body: '560097',
  },
  {
    title: 'State',
    body: 'Karnataka',
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

export const SIDE_DRAWER = [
  {
    iconFamily: 'FontAwesome5',
    icon: 'list-ul',
    topText: 'Home',
    bottomText: 'Search Orders',
    navigate: 'Home',
  },
  {
    iconFamily: 'Feather',
    icon: 'users',
    topText: 'User Roles',
    bottomText: 'Search Orders',
    navigate: 'UserRole',
  },
  {
    iconFamily: 'MaterialCommunityIcons',
    icon: 'credit-card-outline',
    topText: 'Payouts',
    bottomText: 'Search Orders',
    navigate: 'PayOuts',
  },
  {
    iconFamily: 'AntDesign',
    icon: 'filetext1',
    topText: 'Reports',
    bottomText: 'Search Orders',
    navigate: 'Reports',
  },
  {
    iconFamily: 'Feather',
    icon: 'info',
    topText: 'Legal Policies',
    bottomText: 'Search Orders',
    navigate: 'LegalPolicies',
  },
  {
    iconFamily: 'AntDesign',
    icon: 'copyright',
    topText: 'Terms and Conditions',
    bottomText: 'Search Orders',
    navigate: 'TermsAndConditions',
  },
  {
    iconFamily: 'MaterialCommunityIcons',
    icon: 'comment-question-outline',
    topText: 'Privacy Policy',
    bottomText: 'Search Orders',
    navigate: 'PrivacyPolicy',
  },
  {
    iconFamily: 'Ionicons',
    icon: 'call-outline',
    topText: 'Support',
    bottomText: 'Raise a request to change price',
    navigate: 'Support',
  },
];
