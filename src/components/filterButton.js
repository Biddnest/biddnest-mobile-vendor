import React from 'react';
import {Image, Pressable} from 'react-native';
import {hp} from '../constant/colors';
import Filter from '../assets/svg/filter.svg';

const FilterButton = (props) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        position: 'absolute',
        height: hp(9),
        width: hp(9),
        bottom: hp(1),
        right: hp(1),
      }}>
      <Filter width={hp(9)} height={hp(9)} />
    </Pressable>
  );
};

export default FilterButton;
