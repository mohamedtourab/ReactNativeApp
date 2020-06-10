import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ConnectionSearch from './components/ConnectionSearch';
import ResultDetails from './components/ResultDetails';
import ResultList from './components/ResultList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ConnectionSearch"
          component={ConnectionSearch}
          options={{title: 'Route search'}}
        />
        <Stack.Screen
          name="ResultList"
          component={ResultList}
          options={{title: 'Results'}}
        />
        <Stack.Screen
          name="ResultDetails"
          component={ResultDetails}
          options={{title: 'Timetable'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
