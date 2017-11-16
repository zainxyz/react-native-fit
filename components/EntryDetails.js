import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import MetricCard from './MetricCard';
import TextButton from './TextButton';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { white } from '../utils/colors';

class EntryDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params;

    const year = entryId.slice(0, 4);
    const month = entryId.slice(5, 7);
    const day = entryId.slice(8);

    return {
      title: `${month}/${day}/${year}`
    };
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.metrics !== null && !nextProps.metrics.today;
  }

  reset = () => {
    const { remove, goBack, entryId } = this.props;

    remove();
    goBack();
    removeEntry(entryId);
  };

  render() {
    const { metrics, navigation } = this.props;

    return (
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{ margin: 20 }}>
          Reset
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    entryId,
    metrics: state[entryId]
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  const { entryId } = navigation.state.params;

  return {
    remove: () =>
      dispatch(
        addEntry({
          [entryId]: timeToString() === entryId ? getDailyReminderValue() : null
        })
      ),
    goBack: () => navigation.goBack()
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetails);
