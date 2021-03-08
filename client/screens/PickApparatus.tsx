import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
          <Image style={styles.icons} source={require('../assets/Floor.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Pommel Horse" })}
        >
          <Image style={styles.icons} source={require('../assets/Pommel.png')}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Rings" })}
        >
          <Image style={styles.icons} source={require('../assets/Rings.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Vault" })}
        >
          <Image style={styles.icons} source={require('../assets/Vault.png')}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Parallel Bars" })}
        >
          <Image style={styles.icons} source={require('../assets/Pbars.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.apparatusBox}
          onPress={() => navigation.navigate('CREATE ROUTINE', { apparatus: "Horizontal Bars" })}
        >
          <Image style={styles.icons} source={require('../assets/Bar.png')}></Image>
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
    backgroundColor: '#89BFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    width: 100,
    height: 100
  }
})

export default AddRoutine;