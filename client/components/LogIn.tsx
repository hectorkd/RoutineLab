import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

interface LogInProps { handleLogIn: any, setIsRegistering: any }

const LogIn: React.FC<LogInProps> = ({ handleLogIn, setIsRegistering }) => {
  return (
    <View>
      <TextInput style={styles.inputBox} placeholder="Email"></TextInput>
      <TextInput style={styles.inputBox} placeholder="Password"></TextInput>
      <View style={styles.buttonCenter}>
        <TouchableOpacity
          onPress={handleLogIn}>
          <View style={styles.logInButton}>
            <Text style={styles.buttonText}>Log in</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.register}>
          <TouchableOpacity
            onPress={() => setIsRegistering(true)}
          >
            <Text>Register?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    height: 50,
    width: 300,
    borderWidth: 2,
    borderColor: '#89BFFF',
    margin: 10,
    paddingLeft: 10,
  },
  logInButton: {
    height: 50,
    width: 300,
    borderWidth: 0,
    backgroundColor: '#89BFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  register: {
    marginTop: 10,
    width: 300,
    height: 30,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#89BFFF'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonCenter: {
    width: '100%',
    marginLeft: 9,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default LogIn;