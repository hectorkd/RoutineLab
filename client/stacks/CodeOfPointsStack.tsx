import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
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

export default HomeStack;