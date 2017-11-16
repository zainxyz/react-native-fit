import React, { Component } from 'react';
import { ImageEditor, Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { ImagePicker } from 'expo';

import SubmitButton from './SubmitButton';
import { gray, white } from '../utils/colors';

class PickImage extends Component {
  state = {
    image: null
  };

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      allowEditing: true,
      aspect: [2, 1]
    }).then(res => {
      if (res.cancelled) {
        return;
      }

      ImageEditor.cropImage(
        res.uri,
        {
          offset: {
            x: 0,
            y: 0
          },
          size: {
            width: res.width,
            height: res.height
          },
          displaySize: {
            width: res.width,
            height: res.height
          },
          resizeMode: 'cover'
        },
        uri => this.setState(() => ({ image: uri })),
        err => console.log('Error :', err)
      );
    });
  };

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <SubmitButton onPress={this.pickImage} text="Open Camera Roll" />
        {!image && (
          <View style={styles.placeholderBackground}>
            <Text style={styles.placeholderText}>Image will show up here</Text>
          </View>
        )}
        {image && <Image style={styles.image} source={{ uri: image }} />}
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
  image: {
    backgroundColor: 'black',
    height: 250,
    marginTop: 25,
    resizeMode: 'cover',
    width: 250
  },
  placeholderBackground: {
    alignItems: 'center',
    backgroundColor: gray,
    height: 250,
    justifyContent: 'center',
    marginTop: 25,
    width: 250
  },
  placeholderText: {
    color: white
  }
});

export default PickImage;
