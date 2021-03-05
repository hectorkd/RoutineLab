import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface addRoutineProps { navigation: any }

const AddRoutine: React.FC<addRoutineProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Floor" })}
        >
          <Text style={styles.text}>Floor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Pommel Horse" })}
        >
          <Text style={styles.text}>Pommel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Rings" })}
        >
          <Text style={styles.text}>Rings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Vault" })}
        >
          <Text style={styles.text}>Vault</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Parallel Bars" })}
        >
          <Text style={styles.text}>P-bars</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Horizontal Bars" })}
        >
          <Text style={styles.text}>H-bar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },
  row: {
    flex: 1,
    width: 400,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export default AddRoutine;