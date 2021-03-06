import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './stacks/HomeStack';
import CodeOfPointsStack from './stacks/CodeOfPointsStack';
import AppRoutineStack from './stacks/AddRoutineStack';
import Register from './components/Register';
import LogIn from './components/LogIn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ILoggedIn, IPostUser } from './interface';
import ApiServices from './ApiServices';

interface AppTabsProps { }

type AppParamList = {
  Home: undefined;
  '+': undefined;
  COP: undefined;
}

const Tab = createBottomTabNavigator<AppParamList>();

const App: React.FC<AppTabsProps> = ({ }) => {

  const [isLoggedIn, setIsLoggedIn] = useState<ILoggedIn>({ loggedIn: false, firstName: '', lastName: '', gymnasticsClub: '', gymnast: true })
  const [isRegistering, setIsRegistering] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  function handleRegister(data: IPostUser): void {
    ApiServices.addUser(data).then(res => {
      setIsLoggedIn({ loggedIn: true, firstName: res.firstName, lastName: res.lastName, gymnasticsClub: res.gymnasticsClub, gymnast: res.gymnast })
    })
    setIsRegistering(false);
  }

  function handleLogIn(): void {
    // setIsLoggedIn({ loggedIn: true, name: 'Hector', gymnast: true })
  }

  if (!isLoggedIn.loggedIn) {
    return (
      <SafeAreaView style={styles.container}>
        {
          !isRegistering
            ? <LogIn handleLogIn={handleLogIn} setIsRegistering={setIsRegistering} />
            : <Register handleRegister={handleRegister} isEnabled={isEnabled} toggleSwitch={toggleSwitch} setIsRegistering={setIsRegistering} />
        }
      </SafeAreaView >
    )
  } else if (isLoggedIn.loggedIn && !isLoggedIn.gymnast) {
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
  } else {
    return (
      <Text></Text>
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


export default App;