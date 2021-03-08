import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from './context/UserProvider';
import LogIn from './components/LogIn';
import Register from './components/Register';
import HomeStack from './stacks/HomeStack';
import CodeOfPointsStack from './stacks/CodeOfPointsStack';
import AppRoutineStack from './stacks/AddRoutineStack';

type AppParamList = {
  Home: undefined;
  '+': undefined;
  COP: undefined;
}

const Tab = createBottomTabNavigator<AppParamList>();

const AppNavigator = () => {
  const context = useContext(UserContext)
  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  if (!context.user) {
    return (
      <SafeAreaView style={styles.container}>
        {
          !isRegistering
            ? <LogIn setIsRegistering={setIsRegistering} />
            : <Register setIsRegistering={setIsRegistering} />
        }
      </SafeAreaView >
    )
  } else if (context.user && context.user.loggedIn && context.user.gymnast) {
    return (

      <NavigationContainer >
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
          <Tab.Screen name="+" component={AppRoutineStack} />
          <Tab.Screen name="COP" component={CodeOfPointsStack} />
        </Tab.Navigator>
      </NavigationContainer >
    );
  } else {
    return (
      <Text>Test</Text>
    )
  }
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

export default AppNavigator
