import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { purple } from '../utils/colors';

const DateHeader = ({ date }) => <Text style={styles.text}>{date}</Text>;

const styles = StyleSheet.create({
  text: {
    color: purple,
    fontSize: 25
  }
});

export default DateHeader;
