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

export const PAYMENT_OPTION = [
  {
    image: renderImage(require('../assets/images/credit_card.png'), 40),
    name: 'Credit Card',
  },
  {
    image: renderImage(require('../assets/images/debit_card.png'), 40),
    name: 'Debit Card',
  },
  {
    image: renderImage(require('../assets/images/netbanking.png'), 40),
    name: 'Net Banking',
  },
  {
    image: renderImage(require('../assets/images/upipayment.png')),
    name: 'UPI Payment',
  },
];

export const FAQS_OPTION = [
  {
    image: renderImage(require('../assets/images/delivery.png')),
    name: 'Delivery',
  },
  {
    image: renderImage(require('../assets/images/packaging.png')),
    name: 'Packaging',
  },
  {
    image: renderImage(require('../assets/images/vendor.png')),
    name: 'Vendor',
  },
  {
    image: renderImage(require('../assets/images/bidding.png')),
    name: 'Bidding',
  },
  {
    image: renderImage(require('../assets/images/safety.png')),
    name: 'Safety',
  },
  {
    image: renderImage(require('../assets/images/pricing.png')),
    name: 'Pricing',
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
    navigate: 'MyBooking',
  },
  {
    iconFamily: 'MaterialCommunityIcons',
    icon: 'credit-card-outline',
    topText: 'Payouts',
    bottomText: 'Search Orders',
    navigate: 'AboutUs',
  },
  {
    iconFamily: 'AntDesign',
    icon: 'filetext1',
    topText: 'Reports',
    bottomText: 'Search Orders',
    navigate: 'AboutUs',
  },
  {
    iconFamily: 'Feather',
    icon: 'info',
    topText: 'Legal Policies',
    bottomText: 'Search Orders',
    navigate: 'AboutUs',
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
    navigate: 'FAQs',
  },
  {
    iconFamily: 'Ionicons',
    icon: 'call-outline',
    topText: 'Support',
    bottomText: 'Raise a request to change price',
    navigate: 'ContactUs',
  },
];
