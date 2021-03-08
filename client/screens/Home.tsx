import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiServices from '../ApiServices';
import { UserContext } from '../context/UserProvider';
import { IPostRoutine } from '../interface';


interface homeProps { navigation: any }

const Home: React.FC<homeProps> = ({ navigation }) => {

  const context = useContext(UserContext);

  const [routines, setRoutines] = useState<IPostRoutine[]>([]);
  const [compRoutines, setCompRoutines] = useState<[]>([]);

  useEffect(() => {
    if (context.user?.firstName) {
      ApiServices.getRoutines(context.user?.firstName).then(res => {
        console.log(res);
        setRoutines(res);
      })
    }
  }, [])

  console.log('routines --------------', routines);

  if (!routines.length) {
    return (
      <View style={styles.container} >
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
      <View style={styles.container}>
        {
          !compRoutines.length
            ? <View />
            : <View style={styles.homeDisplayTop}>
              <Text style={styles.blueText}>OVERALL START:</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('COMPETITION ROUTINES')}
                >
                  <View style={[styles.boxDisplay, styles.shadow]}>
                    <Text style={styles.blueText}>79.0</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.blueText}>BEST APPARATUS:</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => { }}
                >
                  <View style={[styles.boxDisplay, styles.shadow]}>
                    <Text style={styles.blueText}>FLOOR</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.blueText}>WEAKEST APPARATUS:</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => { }}
                >
                  <View style={[styles.boxDisplay, styles.shadow]}>
                    <Text style={styles.blueText}>VAULT</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        }

        <View style={styles.homeDisplayBottom}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SAVED ROUTINES')}
            >
              <View style={[styles.buttons, styles.shadow]}>
                <Text style={styles.blueButtonText}>SAVED ROUTINES</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('COMPETITION ROUTINES')}
            >
              <View style={[styles.buttons, styles.shadow]}>
                <Text style={styles.blueButtonText}>COMPETITION ROUTINES</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('COMPETITION RESULTS')}
            >
              <View style={[styles.buttons, styles.shadow]}>
                <Text style={styles.blueButtonText}>COMPETITION RESULTS</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('COACH SUGGESTIONS')}
            >
              <View style={[styles.buttons, styles.shadow]}>
                <Text style={styles.blueButtonText}>COACH SUGGESTIONS</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  homeDisplayTop: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  homeDisplayBottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueText: {
    color: '#89BFFF',
    fontSize: 30,
    fontWeight: '800',
    marginLeft: 15,
  },
  blueButtonText: {
    color: '#89BFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    shadowColor: 'transparent',
  },
  buttons: {
    height: 100,
    width: 180,
    borderColor: '#89BFFF',
    borderWidth: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  boxDisplay: {
    height: 50,
    width: 300,
    borderColor: '#89BFFF',
    borderWidth: 5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  center: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Home;