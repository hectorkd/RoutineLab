import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface homeProps { navigation: any }

const Home: React.FC<homeProps> = ({ navigation }) => {

  const [routines, setRoutines] = useState<[]>([])

  if (!routines.length) {
    return (
      < View style={styles.container} >
        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate('PICK APPARATUS')}
        >
          <Text style={styles.text}>Click here to create your first routine</Text>
        </TouchableOpacity>
      </View >
    )
  } else {
    return (
      <View>
        <Text>Overall start</Text>
        <Text>Best routine</Text>
        <Text>Worst routine</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  box: {
    height: 250,
    width: 350,
    backgroundColor: '#89BFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }
})

export default Home;