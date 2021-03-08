import React, { useContext, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext } from './context/UserProvider';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
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

const AppNavigator: React.FC = () => {
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
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              if (route.name === 'Home') {
                return <AntDesign name="home" size={25} color={focused ? 'orange' : "black"} />
              } else if (route.name === '+') {
                return <Octicons name="diff-added" size={25} color={focused ? 'orange' : "black"} />
              } else if (route.name === 'COP') {
                return <Image style={{ width: 25, height: 25, borderWidth: focused ? 2 : 0, borderColor: focused ? 'orange' : "transparent" }} source={require('./assets/COP.svg.png')}></Image>
              }
            }
          })}
          tabBarOptions={{
            activeTintColor: '#89BFFF',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: {
              backgroundColor: '#EFF6FF',
              height: 80,
              borderTopWidth: 1,
              borderTopColor: '#89BFFF',
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
  icons: {
    width: 25,
    height: 25,
  }
});

export default AppNavigator
