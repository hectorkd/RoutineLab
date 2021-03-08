import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { ILogIn } from '../interface';
import ApiServices from '../ApiServices';
import { UserContext } from '../context/UserProvider';

interface LogInProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>
}

const initialLogInValue: ILogIn = {
  email: '',
  password: ''
}

const LogIn: React.FC<LogInProps> = ({ setIsRegistering }) => {

  const { login } = useContext(UserContext)
  const [logInValues, setLogInValues] = useState(initialLogInValue)

  function handleChange(e: any, name: string): void {
    setLogInValues({ ...logInValues, [name]: e });
  }

  function handleSubmit(): void {
    const { email, password } = logInValues;
    if (email && password) {
      try {
        ApiServices.logIn(logInValues).then((res: any) => {
          if (res.exists) {
            Alert.alert("Sorry account doesn't exist");
            setLogInValues(initialLogInValue);
          } else {
            login({ loggedIn: true, firstName: res.firstName, lastName: res.lastName, gymnasticsClub: res.gymnasticsClub, gymnast: res.gymnast })
          }
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      Alert.alert('Please fill in all fields');
    }
  }

  return (
    <View>
      <TextInput style={styles.inputBox} value={logInValues.email} onChangeText={e => handleChange(e, 'email')} placeholder="Email"></TextInput>
      <TextInput style={styles.inputBox} value={logInValues.password} onChangeText={e => handleChange(e, 'password')} textContentType='password' secureTextEntry={true} placeholder="Password"></TextInput>
      <View style={styles.buttonCenter}>
        <TouchableOpacity
          onPress={handleSubmit}>
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