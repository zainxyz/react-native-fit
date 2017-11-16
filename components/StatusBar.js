import React from 'react';
import { StatusBar as ReactStatusBar, View } from 'react-native';
import { Constants } from 'expo';

const StatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <ReactStatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default StatusBar;
