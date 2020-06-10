import React, {useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import moment from 'moment';
import {
  faBus,
  faSubway,
  faWalking,
  faTrain,
  faTram,
  faChevronUp,
  faChevronDown,
  faChevronRight,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import Collapsible from 'react-native-collapsible';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ConnectionSectionOverview, {
  categoryIconMapping,
} from './ConnectionSectionOverview';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  overviewStations: {
    paddingBottom: 8,
    fontSize: 24,
  },
  overviewContainer: {
    borderColor: '#FF000000',
    borderBottomColor: 'grey',
    borderWidth: 1,
    paddingVertical: 16,
  },
  sectionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
  },
  cardMainStop: {
    marginTop: 16,
    fontSize: 16,
  },
  stopList: {},
  walkingSection: {
    fontSize: 16,
  },
  transportModeContainer: {
    flexDirection: 'row',
  },
  transportName: {
    backgroundColor: '#dddddd',
    fontSize: 18,
  },
  sideBar: {
    width: 16,
    backgroundColor: '#dddddd',
    marginRight: 16,
  },
  stopsTouchable: {
    marginTop: 16,
  },
  stopCircleMain: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 2,
    top: 22,
    width: 12,
    height: 12,
    borderRadius: 36,
    elevation: 1,
  },

  stopCircleSmall: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 4,
    top: 14,
    width: 8,
    height: 8,
    borderRadius: 36,
    elevation: 1,
  },
  transportIconContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    left: -6,
    top: -3,
    width: 28,
    height: 28,
    borderRadius: 36,
    elevation: 4,
  },
  passStopStation: {
    marginTop: 8,
    marginLeft: 8,
    color: '#555555',
  },
});
const SectionCard = ({section}) => {
  console.log(section);
  const [showStops, setShowStops] = useState(false);
  const collapseIcon = showStops ? faChevronUp : faChevronDown;
  const transportModeIcon = categoryIconMapping(section);
  const departureStation = section.departure.station.name;
  const departureTime = moment(section.departure.departure).format('HH:mm');
  const arrivalStation = section.arrival.station.name;
  const arrivalTime = moment(section.arrival.arrival).format('HH:mm');

  const walkSection = walk => {
    return (
      <Text style={styles.walkingSection}>
        {' '}
        <FontAwesomeIcon icon={transportModeIcon} size={24} />
        {walk.duration / 60}
        {' min'}
      </Text>
    );
  };

  const stopList = passList => (
    <View style={styles.stopContainer}>
      <View style={styles.transportModeContainer}>
        <View style={styles.sideBar} />
        <TouchableOpacity
          style={styles.stopsTouchable}
          onPress={() => setShowStops(!showStops)}>
          <Text>
            {passList.slice(1, -1).length} Stops{'\t\t'}
            <FontAwesomeIcon icon={collapseIcon} size={11} />
          </Text>
        </TouchableOpacity>
      </View>
      <Collapsible style={styles.stopList} collapsed={!showStops}>
        {passList.slice(1, -1).map(location => (
          <View style={styles.transportModeContainer}>
            <View style={styles.sideBar} />
            <View style={styles.stopCircleSmall} />
            <Text style={styles.passStopStation}>{location.station.name}</Text>
          </View>
        ))}
      </Collapsible>
    </View>
  );

  const journeySection = journey => (
    <View>
      <View style={styles.transportModeContainer}>
        <View style={styles.sideBar} />
        <View style={styles.transportIconContainer}>
          <FontAwesomeIcon
            style={styles.transportIcon}
            icon={transportModeIcon}
            size={16}
          />
        </View>

        <Text>
          {' '}
          <Text style={styles.transportName}> {journey.name} </Text>
        </Text>
      </View>
      <View style={styles.transportModeContainer}>
        <View style={styles.sideBar} />
        <View style={styles.stopCircleMain} />
        <Text style={styles.cardMainStop}>
          {departureStation} {departureTime}
        </Text>
      </View>
      {journey.passList && stopList(journey.passList)}

      <View style={styles.transportModeContainer}>
        <View
          style={{
            ...styles.sideBar,
            borderBottomStartRadius: 8,
            borderBottomEndRadius: 8,
          }}
        />
        <View style={styles.stopCircleMain} />
        <Text style={styles.cardMainStop}>
          {arrivalStation} {arrivalTime}
        </Text>
      </View>
    </View>
  );

  return (
    <View
      style={styles.sectionCard}
      onPress={() => navigation.navigate('ResultDetails', {timetable})}>
      {section.journey && journeySection(section.journey)}
      {section.walk && walkSection(section.walk)}
    </View>
  );
};

const ResultDetails = ({route}) => {
  const {connection} = route.params;
  return (
    <View style={styles.container}>
      <FlatList
        data={connection.sections}
        ListHeaderComponent={() => (
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewStations}>
              {connection.from.station.name}{' '}
              {<FontAwesomeIcon icon={faLongArrowAltRight} size={16} />}{' '}
              {connection.to.station.name}
            </Text>
            <ConnectionSectionOverview
              connection={connection}
              shrinkable={false}
            />
          </View>
        )}
        renderItem={({item}) => <SectionCard section={item} />}
        keyExtractor={item => item.departure.station.id}
        contentContainerStyle={{paddingBottom: 16}}
        ItemSeparatorComponent={() => (
          <FontAwesomeIcon
            style={{alignSelf: 'center', color: '#bbbbbb'}}
            icon={faChevronDown}
            size={32}
          />
        )}
      />
    </View>
  );
};

export default ResultDetails;
