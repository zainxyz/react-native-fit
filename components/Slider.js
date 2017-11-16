import React from 'react';
import { View, Slider as ReactSlider, StyleSheet, Text } from 'react-native';
import { gray } from '../utils/colors';

const Slider = ({ max, onChange, step, value, unit }) => (
  <View style={styles.row}>
    <ReactSlider
      maximumValue={max}
      minimumValue={0}
      onValueChange={onChange}
      step={step}
      style={{ flex: 1 }}
      value={value}
    />
    <View style={styles.metricCounter}>
      <Text style={{ fontSize: 24, textAlign: 'center' }}>{value}</Text>
      <Text style={{ fontSize: 18, color: gray }}>{unit}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  metricCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 85
  }
});

export default Slider;
