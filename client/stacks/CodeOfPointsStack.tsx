import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button } from 'react-native';
import { View, Text, SafeAreaView } from 'react-native';
import { UserContext } from '../context/UserProvider';
import CodeOfPoints from '../screens/CodeOfPoints';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {

  const { logout } = useContext(UserContext)

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