/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import UserForm from './src/Forms/form';
import Home from './src/screens/home';
import User from './src/screens/user';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as DetailsProvider} from './src/context/HistoryContext';
import History from './src/screens/history';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const homeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{header: () => null}}
          name="Home"
          component={Home}
        />
        <Stack.Screen name="Details" component={User} />
      </Stack.Navigator>
    );
  };

  const historyStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Details" component={User} />
      </Stack.Navigator>
    );
  };

  return (
    <DetailsProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={homeStack} />
          <Tab.Screen name="History" component={historyStack} />
          <Tab.Screen name="UserForm" component={UserForm} />
        </Tab.Navigator>
      </NavigationContainer>
    </DetailsProvider>
  );
};

export default App;
