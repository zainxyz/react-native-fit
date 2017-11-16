import React from 'react';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { createStore } from 'redux';
import {
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import AddEntry from './components/AddEntry';
import AnimatedNative from './components/AnimatedNative';
import PickImage from './components/PickImage';
import EntryDetails from './components/EntryDetails';
import History from './components/History';
import Live from './components/Live';
import StatusBar from './components/StatusBar';
import reducer from './reducers';
import { purple, white } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

const Tabs = TabNavigator(
  {
    // Animated: {
    //   screen: AnimatedNative,
    //   navigationOptions: {
    //     tabBarLabel: 'Animated',
    //     tabBarIcon: ({ tintColor }) => <Ionicons name="ios-happy" size={30} color={tintColor} />
    //   }
    // },

    PickImage: {
      screen: PickImage,
      navigationOptions: {
        tabBarLabel: 'Pick Image',
        tabBarIcon: ({ tintColor }) => <Entypo name="images" size={30} color={tintColor} />
      }
    },

    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    },
    Live: {
      screen: Live,
      navigationOptions: {
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-speedometer" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        height: 56,
        backgroundColor: white,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  EntryDetails: {
    screen: EntryDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

export default class App extends React.Component {
  state = {
    value: 6
  };

  componentDidMount() {
    setLocalNotification();
  }

  handlePress = () => alert('You pressed me!');

  renderTestStuff = () => (
    <View style={styles.testContainer}>
      <TouchableHighlight style={styles.btn} onPress={this.handlePress} underlayColor="#D4271B">
        <Text style={styles.btnText}>TouchableHighlight!</Text>
      </TouchableHighlight>
      <TouchableOpacity style={styles.btn} onPress={this.handlePress}>
        <Text style={styles.btnText}>TouchableOpacity!</Text>
      </TouchableOpacity>
      {/* <TouchableWithoutFeedback onPress={this.handlePress}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>TouchableWithoutFeedback!</Text>
        </View>
      </TouchableWithoutFeedback> */}
      {/* <Text> </Text> */}
      {/* <Slider
        maximumValue={10}
        minimumValue={-10}
        onValueChange={value => this.setState(() => ({ value }))}
        step={1}
        value={this.state.value}
        />
      <Text>Value: {this.state.value}</Text> */}
    </View>
  );

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          {/* <View style={{ height: 20 }} /> */}
          <StatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
          {/* <Tabs /> */}
          {/* <AddEntry /> */}
          {/* <History /> */}
          {/* {this.renderTestStuff()} */}
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnText: {
    color: '#F7F7F7'
  }
});
