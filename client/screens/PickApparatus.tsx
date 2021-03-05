import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface addRoutineProps { navigation: any }

const AddRoutine: React.FC<addRoutineProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Floor" })}
        >
          <Text style={styles.text}>Floor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Pommel Horse" })}
        >
          <Text style={styles.text}>Pommel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Rings" })}
        >
          <Text style={styles.text}>Rings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Vault" })}
        >
          <Text style={styles.text}>Vault</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Parallel Bars" })}
        >
          <Text style={styles.text}>P-bars</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apparatusBox}
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
    width: 400,
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  apparatusBox: {
    width: 150,
    height: 150,
    borderColor: '#89BFFF',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default AddRoutine;