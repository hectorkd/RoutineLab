import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { IPostUser } from "../interface";
import { Ionicons } from "@expo/vector-icons";
import ApiServices from "../ApiServices";
import { UserContext } from "../context/UserProvider";

interface RegisterProps {
  setIsRegistering: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialRegistrationValue: IPostUser = {
  firstName: "",
  lastName: "",
  gymnasticsClub: "",
  gymnast: true,
  email: "",
  password: "",
};

const Register: React.FC<RegisterProps> = ({ setIsRegistering }) => {
  const context = useContext(UserContext);

  const [registrationValues, setRegistrationValues] = useState(
    initialRegistrationValue
  );

  function handleChange(e: any, name: string): void {
    setRegistrationValues({ ...registrationValues, [name]: e });
  }

  function handleSubmit(): void {
    const {
      firstName,
      lastName,
      gymnasticsClub,
      gymnast,
      email,
      password,
    } = registrationValues;
    if (firstName && lastName && gymnasticsClub && email && password) {
      try {
        ApiServices.addUser(registrationValues).then((res: any) => {
          if (res.exists) {
            Alert.alert("Sorry account already exists with this email address");
            setRegistrationValues(initialRegistrationValue);
          } else {
            setIsRegistering(false);
            context.login({ loggedIn: true, ...res });
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Please fill in all fields");
    }
  }

  return (
    <View>
      <View style={styles.registerTop}>
        <TouchableOpacity
          style={styles.goBackContainer}
          onPress={() => setIsRegistering(false)}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>REGISTER:</Text>
      </View>
      <View style={styles.registerMiddle}>
        <TextInput
          style={styles.inputBox}
          value={registrationValues.firstName}
          onChangeText={(e) => handleChange(e, "firstName")}
          placeholder="First Name"
        ></TextInput>
        <TextInput
          style={styles.inputBox}
          value={registrationValues.lastName}
          onChangeText={(e) => handleChange(e, "lastName")}
          placeholder="Last Name"
        ></TextInput>
        <TextInput
          style={styles.inputBox}
          value={registrationValues.gymnasticsClub}
          onChangeText={(e) => handleChange(e, "gymnasticsClub")}
          placeholder="Gymnastics club"
        ></TextInput>
        <View style={styles.accountType}>
          <Text style={styles.gymnast}>Type of account?</Text>
        </View>
        <View style={styles.switch}>
          <Text style={styles.gymnastOrCoach}>
            {registrationValues.gymnast ? "Gymnast" : "Coach"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={registrationValues.gymnast ? "#EFF6FF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(e) => handleChange(e, "gymnast")}
            value={registrationValues.gymnast}
          />
        </View>
        <TextInput
          value={registrationValues.email}
          onChangeText={(e) => handleChange(e, "email")}
          textContentType="emailAddress"
          style={styles.inputBox}
          placeholder="Email Address"
        ></TextInput>
        <TextInput
          value={registrationValues.password}
          onChangeText={(e) => handleChange(e, "password")}
          textContentType="password"
          secureTextEntry={true}
          style={styles.inputBox}
          placeholder="Password"
        ></TextInput>
      </View>
      <View style={styles.registerBottom}>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.registerButton}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    height: 50,
    width: 300,
    borderWidth: 2,
    borderColor: "#89BFFF",
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
    backgroundColor: "#89BFFF",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  registerTop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  registerMiddle: {
    flex: 4,
  },
  registerBottom: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#89BFFF",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  switch: {
    marginRight: 20,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gymnastOrCoach: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "700",
    color: "#89BFFF",
  },
  accountType: {
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  gymnast: {
    fontSize: 20,
    fontWeight: "700",
    color: "grey",
  },
  picker: {
    width: 300,
    height: 50,
    borderColor: "blue",
    borderWidth: 1,
  },
  goBackContainer: {
    width: "100%",
    height: 30,
  },
});

export default Register;
