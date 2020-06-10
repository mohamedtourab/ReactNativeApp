import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';
import {styles as searchStyles} from './ConnectionSearch';

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  textInputStyle: {
    borderRadius: 4,
    borderWidth: 2,
    padding: 8,
  },
  inputContainerStyle: {
    borderWidth: 0,
  },
  autoCompleteItemStyle: {
    padding: 4,
  },
  list: {
    margin: 0,
    padding: 8,
    borderRadius: 4,
  },
});

const StationAutoComplete = ({
  label,
  selectStation,
  setAutoCompleteApiError,
  validityError,
  setValidityError,
}) => {
  const [stationList, setStationList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchStations = (query, setFunction) => {
    fetch(
      `http://transport.opendata.ch/v1/locations?type=stations&query=${query}`,
    )
      .then(response => response.json())
      .then(json => {
        setAutoCompleteApiError(false);
        setFunction(
          json.stations
            .map(station => station.name)
            .filter(name => name != null),
        );
      })
      .catch(error => {
        setAutoCompleteApiError(true);

        console.log(error);
      });
  };
  const inputBorderColor = validityError ? '#bb0000' : 'grey';
  return (
    <View style={styles.container}>
      <Text style={searchStyles.label}>{label}</Text>
      <Autocomplete
        style={{...styles.textInputStyle, borderColor: inputBorderColor}}
        inputContainerStyle={styles.inputContainerStyle}
        listStyle={styles.list}
        data={stationList}
        defaultValue={inputValue}
        onChangeText={text => {
          setInputValue(text);
          selectStation('');
          fetchStations(text, setStationList);
        }}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.autoCompleteItemStyle}
            onPress={() => {
              selectStation(item);
              setInputValue(item);
              setStationList([]);
              setValidityError(false);
            }}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default StationAutoComplete;
