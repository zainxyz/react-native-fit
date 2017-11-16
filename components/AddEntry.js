import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import DateHeader from './DateHeader';
import Slider from './Slider';
import Steppers from './Steppers';
import SubmitButton from './SubmitButton';
import TextButton from './TextButton';
import { addEntry } from '../actions';
import { white } from '../utils/colors';
import { removeEntry, submitEntry } from '../utils/api';
import {
  clearLocalNotification,
  getDailyReminderValue,
  getMetricMetaInfo,
  setLocalNotification,
  timeToString
} from '../utils/helpers';

class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike: 0,
      eat: 0,
      run: 0,
      sleep: 0,
      swim: 0
    };
  }

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  increment = metric => {
    const { max, step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] + step;

      return {
        ...state,
        [metric]: count > max ? max : count
      };
    });
  };

  decrement = metric => {
    const { step } = getMetricMetaInfo(metric);

    this.setState(state => {
      const count = state[metric] - step;

      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      };
    });
  };

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }));
  };

  onSubmit = () => {
    const key = timeToString();
    const entry = this.state;

    // Update Redux
    this.props.dispatch(
      addEntry({
        [key]: entry
      })
    );

    // Reset the state
    this.setState({
      bike: 0,
      eat: 0,
      run: 0,
      sleep: 0,
      swim: 0
    });

    // Navigate to '/home'
    this.toHome();

    // Save to 'DB'
    submitEntry({ key, entry });

    // Clear local notifications
    clearLocalNotification().then(setLocalNotification);
  };

  reset = () => {
    const key = timeToString();

    // Update Redux
    this.props.dispatch(
      addEntry({
        [key]: getDailyReminderValue()
      })
    );

    // Route to Home
    this.toHome();

    // Update 'DB'
    removeEntry(key);
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: 'AddEntry'
      })
    );
  };

  renderDate = () => {
    const date = new Date();
    const localeDate = date.toLocaleDateString();

    return <DateHeader date={localeDate} />;
  };

  renderMetrics = () => {
    const metaInfo = getMetricMetaInfo();

    return Object.keys(metaInfo).map(key => {
      const { getIcon, type, ...restProps } = metaInfo[key];
      const value = this.state[key];

      return (
        <View key={key} style={styles.row}>
          {getIcon()}
          {type === 'slider' ? (
            <Slider value={value} onChange={value => this.slide(key, value)} {...restProps} />
          ) : (
            <Steppers
              value={value}
              onIncrement={() => this.increment(key)}
              onDecrement={() => this.decrement(key)}
              {...restProps}
            />
          )}
        </View>
      );
    });
  };

  render() {
    if (this.props.alreadyLogged) {
      return (
        <View style={styles.centeredContainer}>
          <Ionicons name="ios-happy-outline" size={100} />
          <Text>You have already logged your information for today.</Text>
          <TextButton style={{ padding: 10 }} onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderDate()}
        {this.renderMetrics()}
        <SubmitButton onPress={this.onSubmit} text="Ready Set Go!" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 20
  },
  centeredContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  }
});

const mapStateToProps = state => {
  const key = timeToString();

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  };
};

export default connect(mapStateToProps)(AddEntry);
