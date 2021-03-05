import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import CodeOfPointsStack from './stacks/CodeOfPointsStack';
import AppRoutineStack from './stacks/AddRoutineStack';

interface AppTabsProps { }

type AppParamList = {
  // IndividualMove: { move: IMove }
  Home: undefined;
  '+': undefined;
  COP: undefined;
}

const Tab = createBottomTabNavigator<AppParamList>();

const App: React.FC<AppTabsProps> = ({ }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#89BFFF',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 25,
          },
          style: {
            backgroundColor: '#EFF6FF',
          }
        }}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        {/* <Tab.Screen name="IndividualMove">{props => (<IndividualMove move={data}
          {...props} />)}
        </Tab.Screen> */}
        <Tab.Screen name="+" component={AppRoutineStack} />
        <Tab.Screen name="COP" component={CodeOfPointsStack} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;