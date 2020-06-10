import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

import ConnectionSectionOverview from './ConnectionSectionOverview';

const styles = StyleSheet.create({
  connectionCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  durationContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  container: {
    flex: 3,
  },
  intervalString: {
    marginTop: 8,
  },
});

const formatDurationPart = (durationPart, unit) => {
  if (durationPart !== '00') {
    return `${
      durationPart.startsWith('0') ? durationPart.slice(1) : durationPart
    } ${unit} `;
  }
  return '';
};
const formatDuration = duration => {
  const durationSplit = duration.split('d');
  const durationDays = durationSplit[0];
  const durationTimeSplit = durationSplit[1].split(':');
  const durationHours = durationTimeSplit[0];
  const durationMinutes = durationTimeSplit[1];
  const durationString = `${formatDurationPart(
    durationDays,
    'd',
  )}${formatDurationPart(durationHours, 'h')}${formatDurationPart(
    durationMinutes,
    'min',
  )}`;

  return durationString;
};

const ConnectionCard = ({connection, navigation}) => {
  const departureTimeString = moment(connection.from.departure).format('HH:mm');
  const arrivalTimeString = moment(connection.to.arrival).format('HH:mm');

  return (
    <TouchableOpacity
      style={styles.connectionCard}
      onPress={() => navigation.navigate('ResultDetails', {connection})}>
      <View style={styles.container}>
        <ConnectionSectionOverview connection={connection} shrinkable />
        <Text style={styles.intervalString}>
          {departureTimeString}{' '}
          {<FontAwesomeIcon icon={faLongArrowAltRight} size={11} />}{' '}
          {arrivalTimeString}
        </Text>
      </View>
      <View style={styles.durationContainer}>
        <Text>{formatDuration(connection.duration)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ConnectionCard;
