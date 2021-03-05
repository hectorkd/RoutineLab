import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import PickApparatus from '../screens/PickApparatus';
import CreateRoutine from '../screens/CreateRoutine';
import ApparatusElements from '../screens/ApparatusElements';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="HOME">
      <Stack.Screen name="HOME" component={Home} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        }
      }} />
      <Stack.Screen name="PICK APPARATUS" component={PickApparatus} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        }
      }} />
      <Stack.Screen name="CREATE ROUTINE" component={CreateRoutine} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        }
      }} />
      <Stack.Screen name="ELEMENTS" component={ApparatusElements} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        }
      }} />
    </Stack.Navigator>
  )
}

export default HomeStack;