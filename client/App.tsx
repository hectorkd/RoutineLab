import React from 'react';
import UserProvider from './context/UserProvider';
import AppNavigator from './AppNavigator';

const App = (): JSX.Element => {
  return (
    <UserProvider >
      <AppNavigator />
    </UserProvider >
  )
}


export default App;