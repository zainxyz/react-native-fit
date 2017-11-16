import React, { Component } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

// 3 main types of animations in react-native
//
// 1. decay  - initial velocity and slow to a stop
// 2. spring - spring physics model
// 3. timing - animated a value over time

class AnimatedNative extends Component {
  state = {
    height: new Animated.Value(0),
    opacity: new Animated.Value(0),
    width: new Animated.Value(0)
  };

  componentDidMount() {
    const { height, opacity, width } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000
    }).start();

    Animated.spring(width, {
      toValue: 300,
      speed: 5
    }).start();

    Animated.spring(height, {
      toValue: 300,
      speed: 5
    }).start();
  }

  render() {
    const { height, opacity, width } = this.state;

    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.img, { height, opacity, width }]}
          source={{
            uri:
              'http://icons.iconarchive.com/icons/creativeflip/starwars-longshadow-flat/512/Darth-Vader-icon.png'
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  img: {
    height: 200,
    width: 200
  }
});

export default AnimatedNative;
