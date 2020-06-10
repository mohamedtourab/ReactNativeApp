import React from 'react';
import {View, FlatList} from 'react-native';
import ConnectionCard from './ConnectionCard';

const ResultList = ({route, navigation}) => {
  const {connectionList} = route.params;
  return (
    <View>
      <FlatList
        data={connectionList}
        renderItem={({item}) => (
          <ConnectionCard connection={item} navigation={navigation} />
        )}
        keyExtractor={item => `${item.from.departure}-${item.to.arrival}`}
      />
    </View>
  );
};

export default ResultList;
