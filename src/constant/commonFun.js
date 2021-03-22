import {CommonActions} from '@react-navigation/native';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-simple-toast';
import {IMAGE_OPTIONS} from './colors';

export const resetNavigator = (props, screenName) => {
  props.navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: screenName}],
    }),
  );
};

export const CustomAlert = (msg = '') => {
  return Toast.show(msg, Toast.LONG);
};

export const DiffMin = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  let d = Math.abs(Math.round(diff));

  d = Number(d);
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);
  return h + ' : ' + m + ' : ' + s;
};

export const ImageSelection = () => {
  ImagePicker.showImagePicker(IMAGE_OPTIONS, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = {uri: response.uri};

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    }
  });
};
