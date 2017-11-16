import React from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';
import { purple, white } from '../utils/colors';

const SubmitButton = ({ onPress, text }) => (
  <TouchableHighlight style={styles.btn} onPress={onPress} underlayColor="#D4271B">
    <Text style={styles.btnText}>{text}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: purple,
    padding: 10,
    height: 45,
    marginRight: 40,
    marginLeft: 40,
    borderRadius: 7
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
});

export default SubmitButton;
