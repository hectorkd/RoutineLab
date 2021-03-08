import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateRoutine from '../screens/CreateRoutine';
import PickApparatus from '../screens/PickApparatus';
import ApparatusElements from '../screens/ApparatusElements';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { UserContext } from '../context/UserProvider';
import { AntDesign } from '@expo/vector-icons';

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
          <TouchableOpacity
            onPress={logout}
            style={styles.logout}
          >
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={logout}
            style={styles.logout}
          >
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
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
          <TouchableOpacity
            onPress={logout}
            style={styles.logout}
          >
            <AntDesign name="logout" size={24} color="white" />
          </TouchableOpacity>
        ),
      }} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  logout: {
    marginRight: 10,
  }
})

export default AddRoutineStack;