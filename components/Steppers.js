import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';

import { white, gray, purple } from '../utils/colors';

const Steppers = ({ max, unit, step, value, onIncrement, onDecrement }) => (
  <View style={[styles.row]}>
    <View style={{ flexDirection: 'row' }}>
      <TouchableHighlight
        style={[styles.iosBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
        onPress={onDecrement}
      >
        <FontAwesome name="minus" size={30} color={purple} />
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.iosBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
        onPress={onIncrement}
      >
        <FontAwesome name="plus" size={30} color={purple} />
      </TouchableHighlight>
    </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iosBtn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Steppers;
