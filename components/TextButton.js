import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { purple } from '../utils/colors';

const TextButton = ({ onPress, children, style = {} }) => (
  <TouchableHighlight onPress={onPress}>
    <Text style={[styles.reset, style]}>{children}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  reset: {
    color: purple,
    textAlign: 'center'
  }
});

export default TextButton;
