import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ApiServices from '../ApiServices';
import { UserContext } from '../context/UserProvider';
import helperfunctions from '../helperfunctions';
import { IAllStarts, ICompRoutineMoves, IMove, IPostRoutine, IStats } from '../interface';


interface homeProps { navigation: any }

const Home: React.FC<homeProps> = ({ navigation }) => {

  const context = useContext(UserContext);

  const [routines, setRoutines] = useState<IPostRoutine[]>([]);
  const [compRoutines, setCompRoutines] = useState<IPostRoutine[]>([]);
  const [cop, setCop] = useState<IMove[]>([]);
  const [overallStart, setOverallStart] = useState<string>();
  const [bestApparatus, setBestApparatus] = useState<IStats>();
  const [weakestApparatus, setWeakestApparatus] = useState<IStats>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (context.user?.firstName) {
        ApiServices.getRoutines(context.user?.firstName).then(res => {
          setRoutines(res);
        });
        ApiServices.getCompRoutines(context.user?.firstName).then(res => {
          setCompRoutines(res);
        })
        ApiServices.getCodeOfPoints().then(res => setCop(res))
      }
    });
    return unsubscribe;
  }, []);



  useEffect(() => {
    if (compRoutines.length > 0 && cop.length > 0) {
      const routines: ICompRoutineMoves[] = []
      compRoutines.forEach(routine => {
        const routineElements: IMove[] = []
        routine.routine.forEach(element => {
          const move = cop.filter(individualMove => individualMove._id === element.id);
          routineElements.push(move[0]);
        })
        routines.push({ apparatus: routine.apparatus, routine: routineElements });
      });
      const starts: IAllStarts[] = []
      routines.forEach(index => {
        if (index.apparatus === 'Vault') {
          const totals = helperfunctions.calculateVaultStart(index.routine);
          starts.push({ apparatus: index.apparatus, total: totals })
        } else {
          const totals = helperfunctions.calculateRoutineStart(index.routine);
          starts.push({ apparatus: index.apparatus, total: totals })
        }
      })
      starts.sort((a: IAllStarts, b: IAllStarts) => {
        if (a.apparatus === 'Vault') {
          if (a.total[0].totalStartValue > a.total[1].totalStartValue) {
            if (a.total[0].totalStartValue > b.total) return 1
            if (a.total[0].totalStartValue < b.total) return -1
            else return 0;
          } else {
            if (a.total[1].totalStartValue > b.total) return 1
            if (a.total[1].totalStartValue < b.total) return -1
            else return 0;
          }
        } else if (b.apparatus === 'Vault') {
          if (b.total[0].totalStartValue > b.total[1].totalStartValue) {
            if (b.total[0].totalStartValue < b.total) return 1
            if (b.total[0].totalStartValue > b.total) return -1
            else return 0;
          } else {
            if (b.total[1].totalStartValue < b.total) return 1
            if (b.total[1].totalStartValue > b.total) return -1
            else return 0;
          }
        } else {
          if (a.total > b.total) return 1
          else if (a.total < b.total) return -1
          else return 0;
        }
      })
      let totalStart = '0.0'
      starts.forEach(index => {
        if (index.apparatus === 'Vault') {
          if (index.total[0].totalStartValue > index.total[1].totalStartValue) {
            const stringTotal = +(totalStart) + +(index.total[0].totalStartValue);
            totalStart = stringTotal.toFixed(1);
          } else {
            const stringTotal = +(totalStart) + +(index.total[1].totalStartValue);
            totalStart = stringTotal.toFixed(1);
          }
        } else {
          const stringTotal = +(totalStart) + +(index.total.totalStartValue);
          totalStart = stringTotal.toFixed(1);
        }
      })

      const best = {
        apparatus: starts[starts.length - 1].apparatus,
        routineArray: (routines.find(element => element.apparatus === starts[starts.length - 1].apparatus)?.routine),
        routineName: (compRoutines.find(element => element.apparatus === starts[starts.length - 1].apparatus)?.routineName),
        startValue: starts[starts.length - 1].total
      }
      const weakest = {
        apparatus: starts[0].apparatus,
        routineArray: (routines.find(element => element.apparatus === starts[0].apparatus)?.routine),
        routineName: (compRoutines.find(element => element.apparatus === starts[0].apparatus)?.routineName),
        startValue: starts[0].total
      }

      setOverallStart(totalStart);
      setBestApparatus(best);
      setWeakestApparatus(weakest);
    }
  }, [compRoutines, cop])

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
          !compRoutines?.length
            ? <View />
            : <View style={styles.homeDisplayTop}>
              <Text style={styles.blueText}>OVERALL START:</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('COMPETITION ROUTINES', { overallStart, bestApparatus, weakestApparatus })}
                >
                  <View style={[styles.boxDisplay, styles.shadow]}>
                    <Text style={styles.blueText}>{overallStart}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.blueText}>BEST APPARATUS:</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ROUTINE', { apparatus: bestApparatus?.apparatus, routineName: bestApparatus?.routineName, routineArray: bestApparatus?.routineArray, startValue: bestApparatus?.startValue })}
                >
                  <View style={[styles.boxDisplay, styles.shadow]}>
                    <Text style={styles.blueText}>{bestApparatus?.apparatus}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.blueText}>WEAKEST APPARATUS:</Text>
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ROUTINE', { apparatus: weakestApparatus?.apparatus, routineName: weakestApparatus?.routineName, routineArray: weakestApparatus?.routineArray, startValue: weakestApparatus?.startValue })}
                >
                  <View style={[styles.boxDisplay, styles.shadow]}>
                    <Text style={styles.blueText}>{weakestApparatus?.apparatus}</Text>
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
              onPress={() => navigation.navigate('COMPETITION ROUTINES', { overallStart, bestApparatus, weakestApparatus })}
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
    fontSize: 25,
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