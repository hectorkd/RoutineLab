import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import CodeOfPointsStack from './stacks/CodeOfPointsStack';
import AppRoutineStack from './stacks/AddRoutineStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ILoggedIn } from './interface';

interface AppTabsProps { }

type AppParamList = {
  Home: undefined;
  '+': undefined;
  COP: undefined;
}

const Tab = createBottomTabNavigator<AppParamList>();

const App: React.FC<AppTabsProps> = ({ }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<ILoggedIn>({ loggedIn: false, name: '', gymnast: true })

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.inputBox} placeholder="Email"></TextInput>
        <TextInput style={styles.inputBox} placeholder="Password"></TextInput>
        <View style={styles.logInButton}>
          <Text>Log in</Text>
        </View>
        <Text>Register?</Text>
      </SafeAreaView>
    )
  } else {
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
          <Tab.Screen name="+" component={AppRoutineStack} />
          <Tab.Screen name="COP" component={CodeOfPointsStack} />
        </Tab.Navigator>
      </NavigationContainer >
    );
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
  inputBox: {
    height: 50,
    width: 300,
    borderWidth: 2,
    borderColor: '#89BFFF',
    margin: 10,
  },
  logInButton: {
    height: 50,
    width: 300,
    borderWidth: 0,
    backgroundColor: '#89BFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default App;