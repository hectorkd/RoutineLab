import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateRoutine from '../screens/CreateRoutine';
import PickApparatus from '../screens/PickApparatus';
import ApparatusElements from '../screens/ApparatusElements';
import { Button } from 'react-native';
import { UserContext } from '../context/UserProvider';

const Stack = createStackNavigator();

const AddRoutineStack: React.FC = () => {

  const { logout } = useContext(UserContext)

  return (
    <Stack.Navigator initialRouteName="PICK APPARATUS">
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
    </Stack.Navigator>
  )
}

export default AddRoutineStack;