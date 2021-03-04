import React from 'react';
import {Image, Pressable} from 'react-native';
import {hp} from '../constant/colors';

const FilterButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        position: 'absolute',
        height: 70,
        width: 70,
        bottom: hp(1),
        right: hp(1),
      }}>
      <Image
        source={require('../assets/images/filter.png')}
        style={{height: 70, width: 70}}
        resizeMode={'contain'}
      />
    </Pressable>
  );
};

export default FilterButton;
