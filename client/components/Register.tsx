import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Switch, Alert } from 'react-native'
import { PickerIOS } from '@react-native-picker/picker';
import ApiServices from '../ApiServices';

interface RegisterProps { handleRegister: any, isEnabled: boolean, toggleSwitch: any, setIsRegistering: any }

const initialRegistrationValue: any = {
  firstName: '',
  lastName: '',
  gymnasticsClub: '',
  gymnast: true,
  email: '',
  password: ''
}

const Register: React.FC<RegisterProps> = ({ handleRegister, isEnabled, toggleSwitch, setIsRegistering }) => {

  // const [value, setValue] = useState<string>('JavaScripts');

  const [registrationValues, setRegistrationValues] = useState(initialRegistrationValue);

  function handleChange(e: any, name: any): void {
    setRegistrationValues({ ...registrationValues, [name]: e.target.value });
  }

  function handleSubmit(e: any): void {
    if (registrationValues.firstName.length && registrationValues.lastName.length && registrationValues.gymnasticsClub.length && registrationValues.email.length && registrationValues.password.length) {
      ApiServices.checkEmail(registrationValues).then(res => {
        if (res.length === 0) {
          Alert.alert('Sorry user already exist');
        } else {
          // handleRegister({ loggedIn: true, firstName: registrationValues.firstName, lastName: registrationValues.lastName, gymnasticsClub: registrationValues.gymnasticsClub, gymnast: registrationValues.gymnast });
        }
      })
    } else {
      Alert.alert('Please fill in all fields');
    }
  }

  return (
    <View>
      <View style={styles.registerTop}>
        <Text style={styles.title}>REGISTER:</Text>
      </View>
      <View style={styles.registerMiddle}>
        <TextInput style={styles.inputBox} value={registrationValues.firstName} onChange={(e) => handleChange(e, 'firstName')} placeholder="First Name"></TextInput>
        <TextInput style={styles.inputBox} value={registrationValues.lastName} onChange={(e) => handleChange(e, 'lastName')} placeholder="Last Name"></TextInput>
        {/* <PickerIOS
          selectedValue={value}
          style={styles.picker}
          onValueChange={itemValue => setValue(itemValue)}>
          <PickerIOS.Item label="JavaScript" value="JavaScripts" />
          <PickerIOS.Item label="Java" value="Java" />
          <PickerIOS.Item label="C#" value="C#" />
        </PickerIOS> */}
        <TextInput style={styles.inputBox} value={registrationValues.gymnasticsClub} onChange={(e) => handleChange(e, 'gymnasticsClub')} placeholder="Gymnastics club"></TextInput>
        <View style={styles.accountType}>
          <Text style={styles.gymnast}>Type of account?</Text>
        </View>
        <View style={styles.switch}>
          <Text style={styles.gymnastOrCoach}>{isEnabled ? 'Gymnast' : 'Coach'}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#EFF6FF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <TextInput value={registrationValues.email} onChange={(e) => handleChange(e, 'email')} textContentType='emailAddress' style={styles.inputBox} placeholder="Email Address"></TextInput>
        <TextInput value={registrationValues.password} onChange={(e) => handleChange(e, 'password')} textContentType='password' secureTextEntry={true} style={styles.inputBox} placeholder="Password"></TextInput>
        {/* <TextInput textContentType='password' secureTextEntry={true} passwordRules="minlength: 8; maxlength: 16; required: lower; required: upper; required: digit; required: special;" style={styles.inputBox} placeholder="Re-type Password"></TextInput> */}
      </View>
      <View style={styles.registerBottom}>
        <TouchableOpacity
          onPress={handleSubmit}>
          <View style={styles.registerButton}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </View>
        </TouchableOpacity>
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
  register: {
    marginTop: 10,
    width: 300,
    height: 30,
  },
  registerButton: {
    width: 300,
    height: 50,
    backgroundColor: '#89BFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerMiddle: {
    flex: 4
  },
  registerBottom: {
    flex: 1,
    alignItems: 'center',
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
  switch: {
    marginRight: 20,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gymnastOrCoach: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: '700',
    color: '#89BFFF'
  },
  accountType: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gymnast: {
    fontSize: 20,
    fontWeight: '700',
    color: 'grey'
  },
  picker: {
    width: 300,
    height: 50,
    borderColor: 'blue',
    borderWidth: 1,
  }
});

export default Register;