import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import CodeOfPoints from '../screens/CodeOfPoints';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CODE OF POINTS" component={CodeOfPoints} options={{
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