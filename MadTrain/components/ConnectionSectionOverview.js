import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBus,
  faSubway,
  faWalking,
  faTrain,
  faTram,
  faChevronRight,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  connectionNumber: {
    backgroundColor: '#dddddd',
    fontSize: 14,
  },
  walkingDuration: {
    fontSize: 12,
  },
});
export const categoryIconMapping = section => {
  if (section.journey) {
    switch (section.journey.category) {
      case 'M':
        return faSubway;
      case 'B':
        return faBus;
      case 'FUN':
        return faTram;
      default:
        return faTrain;
    }
  }
  if (section.walk) {
    return faWalking;
  }
  return faQuestion;
};

const ConnectionSectionOverview = ({connection, shrinkable}) => {
  const sectionHasNonZeroWalk = section =>
    section.walk && section.walk.duration > 0;

  const shownSections = connection.sections.filter(
    section => section.journey || sectionHasNonZeroWalk(section),
  );
  const shownSectionCount = shownSections.length;
  const numberOfLines = shrinkable ? 1 : 10;
  return (
    <Text numberOfLines={numberOfLines}>
      {shownSections.map((section, i) => {
        const {journey} = section;
        const isNotLast = i !== shownSectionCount - 1;
        const icon = categoryIconMapping(section);
        if (journey) {
          return (
            <Text>
              <FontAwesomeIcon icon={icon} />{' '}
              {(shownSectionCount < 6 || !shrinkable) && (
                <Text style={styles.connectionNumber}> {journey.number} </Text>
              )}{' '}
              {isNotLast && <FontAwesomeIcon icon={faChevronRight} size={10} />}{' '}
            </Text>
          );
        }
        if (section.walk) {
          return (
            <Text style={styles.walkingDuration}>
              <FontAwesomeIcon icon={icon} />
              {section.walk.duration / 60}{' '}
              {isNotLast && <FontAwesomeIcon icon={faChevronRight} size={10} />}{' '}
            </Text>
          );
        }
      })}
    </Text>
  );
};

export default ConnectionSectionOverview;
