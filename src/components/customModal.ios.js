import React from 'react';
import {Modal, View, StyleSheet, ScrollView} from 'react-native';
import {wp, hp} from '../constant/colors';

const CustomModalAndroid = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        if (props.onPress) {
          props.onPress();
        }
      }}>
      <View style={styles.centeredView}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          style={styles.modalView}>
          {props.children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CustomModalAndroid;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: wp(100),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    width: wp(100),
    maxHeight: hp(80),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
