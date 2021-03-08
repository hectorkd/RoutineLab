import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import PickApparatus from '../screens/PickApparatus';
import CreateRoutine from '../screens/CreateRoutine';
import ApparatusElements from '../screens/ApparatusElements';
import SavedRoutines from '../screens/SavedRoutines';
import CompetitionResults from '../screens/CompetitionResults';
import CompetitionRoutines from '../screens/CompetitionRoutines';
import CoachSuggestions from '../screens/CoachSuggestions';
import { Button } from 'react-native';
import { UserContext } from '../context/UserProvider';

// export type HomeStackNavigator = {
//   HOME: undefined,
//   "PICK APPARATUS": undefined,
//   "CREATE ROUTINE": undefined,
//   ELEMENTS: undefined,
//   "SAVED ROUTINES": undefined,
//   "COMPETITION ROUTINES": undefined,
//   "COMPETITION RESULTS": undefined,
//   "COACH SUGGESTIONS": undefined,
// }

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  const { logout } = useContext(UserContext)
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
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),

      }} />
      <Stack.Screen name="PICK APPARATUS" component={PickApparatus} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
      <Stack.Screen name="CREATE ROUTINE" component={CreateRoutine} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
      <Stack.Screen name="ELEMENTS" component={ApparatusElements} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
      <Stack.Screen name="SAVED ROUTINES" component={SavedRoutines} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
      <Stack.Screen name="COMPETITION ROUTINES" component={CompetitionResults} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
      <Stack.Screen name="COMPETITION RESULTS" component={CompetitionRoutines} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
      <Stack.Screen name="COACH SUGGESTIONS" component={CoachSuggestions} options={{
        headerStyle: {
          backgroundColor: '#89BFFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerRight: () => (
          <Button
            onPress={logout}
            title="Logout"
            color="#fff"
          />
        ),
      }} />
    </Stack.Navigator>
  )
}

export default HomeStack;