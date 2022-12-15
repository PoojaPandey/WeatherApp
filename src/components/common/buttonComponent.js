import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../../utils/color';

export default function buttonComponent({onPress, title, isDisabled}) {
  return (
    <TouchableOpacity
      style={[styles.button, {opacity: isDisabled ? 0.5 : 1}]}
      disabled={isDisabled}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    borderRadius: 10,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.loginButtonColor,
    margin: 10,
  },
  text: {
    color: 'white',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
});
