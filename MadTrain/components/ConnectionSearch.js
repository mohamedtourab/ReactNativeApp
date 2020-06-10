import React, {useState} from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import StationAutoComplete from './StationAutoComplete';

export const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  dateTimeContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  dateContainer: {
    flex: 1,
  },
  timeContainer: {
    flex: 1,
  },
  dateTime: {
    fontSize: 24,
  },
  search: {
    marginTop: 16,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
});

const ConnectionSearch = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  const [departureStation, setDepartureStation] = useState('');
  const [departureError, setDepartureError] = useState(false);
  const [arrivalStation, setArrivalStation] = useState('');
  const [arrivalError, setArrivalError] = useState(false);
  const [autocompleteApiError, setAutoCompleteApiError] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const fecthConnections = async () => {
    try {
      const formatted_date = moment(date).format('YYYY-MM-DD');
      const formatted_time = moment(date).format('HH:mm');
      const response = await fetch(
        `http://transport.opendata.ch/v1/connections?from=${departureStation}&to=${arrivalStation}&date=${formatted_date}&time=${formatted_time}&limit=${10}`,
      );
      const json = await response.json();
      return json.connections;
    } catch (error) {
      setLoading(false);
      setSearchError(true);
      console.error(error);
    }
  };

  return (
    <View style={styles.autocompleteContainer}>
      {autocompleteApiError && <Text>Could not fetch a list of stations</Text>}

      <StationAutoComplete
        label="From"
        station={departureStation}
        selectStation={setDepartureStation}
        setAutoCompleteApiError={setAutoCompleteApiError}
        validityError={departureError}
        setValidityError={setDepartureError}
      />

      <StationAutoComplete
        label="To"
        station={arrivalStation}
        selectStation={setArrivalStation}
        setAutoCompleteApiError={setAutoCompleteApiError}
        validityError={arrivalError}
        setValidityError={setArrivalError}
      />

      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Departure date</Text>
          <TouchableOpacity
            style={styles.dateTouchable}
            onPress={showDatepicker}>
            <Text style={styles.dateTime}>
              {moment(date).format('D.M.YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.label}>Departure time</Text>
          <TouchableOpacity
            style={styles.timeTouchable}
            onPress={showTimepicker}>
            <Text style={styles.dateTime}>{moment(date).format('HH:mm')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.search}>
        <Button
          title="Search"
          onPress={async () => {
            const departureSet = departureStation !== '';
            const arrivalSet = arrivalStation !== '';
            if (arrivalSet !== '' && arrivalSet) {
              setLoading(true);
              setSearchError(false);
              const connectionList = await fecthConnections();
              setLoading(false);
              navigation.navigate('ResultList', {connectionList});
            } else {
              setDepartureError(!departureSet);
              setArrivalError(!arrivalSet);
            }
          }}
        />
      </View>
      {loading && <ActivityIndicator size="large" />}
      {searchError && (
        <Text style={{color: 'red'}}>Error while searching connections</Text>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default ConnectionSearch;
