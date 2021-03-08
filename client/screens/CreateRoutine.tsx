import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IMove, IStartValue, IRoutineId } from '../interface';
import ApiServices from '../ApiServices';
import RoutineElement from '../components/RoutineElement';
import helperFunctions from '../helperfunctions';
import UserContext from '../App';

interface CreateRoutineProps { route: any, navigation: any }

const CreateRoutine: React.FC<CreateRoutineProps> = ({ route, navigation }) => {

  const { apparatus } = route.params;

  const [routineName, setRoutineName] = useState<string>('');
  const [elements, setElements] = useState<IMove[]>([]);
  const [routineArray, setRoutineArray] = useState<IMove[]>([]);
  const [startValue, setStartValue] = useState<IStartValue>({ eScore: '0.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' });
  const [vaultStartValue, setVaultStartValue] = useState<IStartValue[]>([{ eScore: '10.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' }, { eScore: '10.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' }]);

  const context = useContext(UserContext);

  useEffect(() => {
    ApiServices.getApparatusMoves(apparatus).then(res => setElements(res));
  }, [])

  useEffect(() => {
    if (routineArray.length && apparatus !== 'Vault') {
      const start = helperFunctions.calculateRoutineStart(routineArray);
      setStartValue(start);
    } else if (routineArray.length) {
      const start = helperFunctions.calculateVaultStart(routineArray);
      setVaultStartValue(start);
    }
  }, [routineArray])

  function handleSaveRoutine(): void {
    if (!routineName) {
      Alert.alert('Please give the routine a name');
    } else {
      const routineIds: IRoutineId[] = []
      routineArray.forEach(element => {
        routineIds.push({ id: element._id });
      });
      ApiServices.postRoutine({ name: contexts, routineName, apparatus: routineArray[0].apparatus, routine: routineIds })
      navigation.resetTo();
    }
  }

  function flatListSeperator(): any {
    return (
      <View style={styles.elementList}></View>
    )
  }

  if (apparatus === 'Vault') {
    return (
      <View style={styles.container} >
        <View style={styles.top}>
          <TextInput style={styles.input} value={routineName} onChangeText={setRoutineName} placeholder="Name routine" />
        </View>
        <View style={styles.middle}>
          <View>
            {
              routineArray.length !== 0 && <FlatList
                data={routineArray}
                style={styles.vaultList}
                renderItem={(data) => <TouchableOpacity
                  onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: true, index: data.index })}
                >
                  <RoutineElement apparatus={apparatus} move={data.item} index={data.index + 1} />
                </TouchableOpacity>}
                keyExtractor={(item: IMove) => item._id}
                ItemSeparatorComponent={flatListSeperator}
                scrollEnabled={false}
              // ListHeaderComponent={flatListSeperator}
              />
            }
            {
              routineArray.length !== 0
                ? (
                  routineArray.length < 2
                    ? <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.twoButtons, styles.buttonSpace]}
                        onPress={handleSaveRoutine}
                      >
                        <Text style={styles.addButtonText}>Save routine</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.twoButtons}
                        onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: false })}
                      >
                        <Text style={styles.addButtonText}>Add element</Text>
                      </TouchableOpacity>
                    </View>
                    : <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleSaveRoutine}
                      >
                        <Text style={styles.addButtonText}>Save vault{routineArray.length ? 's' : ''}</Text>
                      </TouchableOpacity>
                    </View>
                )
                : <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: false })}
                  >
                    <Text style={styles.addButtonText}>Add vault</Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
        <View style={styles.vaultBottom}>
          <View>
            <View style={styles.routineAdditionDisplay}>
              <View style={[styles.additionBox, styles.colorOne]}>
                <Text style={styles.textBold}>{vaultStartValue[0].eScore}</Text>
              </View>

              <Text style={styles.addSign}>+</Text>
              <View style={[styles.additionBox, styles.colorThree]}>
                <Text style={styles.textBold}>{vaultStartValue[0].elementTotal}</Text>
              </View>
            </View>
            <View style={styles.vaultRoutineAdditionDisplay}>
              <Text style={[styles.totalValueNum, styles.colorFour]}>FIRST VAULT START: </Text>
              <Text style={styles.totalValueNum}>{vaultStartValue[0].totalStartValue}</Text>
            </View>
            {
              routineArray.length === 2 && <View><View style={styles.routineAdditionDisplay}>
                <View style={[styles.additionBox, styles.colorOne]}>
                  <Text style={styles.textBold}>{vaultStartValue[1].eScore}</Text>
                </View>

                <Text style={styles.addSign}>+</Text>
                <View style={[styles.additionBox, styles.colorThree]}>
                  <Text style={styles.textBold}>{vaultStartValue[1].elementTotal}</Text>
                </View>
              </View>
                <View style={styles.routineAdditionDisplay}>
                  <Text style={[styles.totalValueNum, styles.colorFour]}>SECOND VAULT START: </Text>
                  <Text style={styles.totalValueNum}>{vaultStartValue[1].totalStartValue}</Text>
                </View>
              </View>
            }

          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TextInput style={styles.input} value={routineName} onChangeText={setRoutineName} placeholder="Name routine" />
        </View>
        <View style={styles.middle}>
          <View>

            {
              routineArray.length !== 0 && <FlatList
                data={routineArray}
                renderItem={(data) => <TouchableOpacity
                  onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: true, index: data.index })}
                >
                  <RoutineElement apparatus={apparatus} move={data.item} index={data.index + 1} />
                </TouchableOpacity>
                }
                keyExtractor={(item: IMove) => item._id}
                ItemSeparatorComponent={flatListSeperator}
                scrollEnabled={false}
              // ListHeaderComponent={flatListSeperator}
              />
            }
            {
              routineArray.length < 10
                ? (
                  routineArray.length === 0
                    ? <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: false })}
                      >
                        <Text style={styles.addButtonText}>Add element</Text>
                      </TouchableOpacity>
                    </View>
                    : <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.twoButtons, styles.buttonSpace]}
                        onPress={handleSaveRoutine}
                      >
                        <Text style={styles.addButtonText}>Save routine</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.twoButtons}
                        onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: false })}
                      >
                        <Text style={styles.addButtonText}>Add element</Text>
                      </TouchableOpacity>
                    </View>
                )
                : <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleSaveRoutine}
                  >
                    <Text style={styles.addButtonText}>Save routine</Text>
                  </TouchableOpacity>
                </View>
            }
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.routineAdditionDisplay}>
            <View style={[styles.additionBox, styles.colorOne]}>
              <Text style={styles.textBold}>{startValue.eScore}</Text>
            </View>
            <Text style={styles.addSign}>+</Text>
            <View style={[styles.additionBox, styles.colorTwo]}>
              <Text style={styles.textBold}>{startValue.requirmentsTotal}</Text>
            </View>
            <Text style={styles.addSign}>+</Text>
            <View style={[styles.additionBox, styles.colorThree]}>
              <Text style={styles.textBold}>{startValue.elementTotal}</Text>
            </View>
          </View>
          <View style={styles.routineAdditionDisplay}>
            <Text style={[styles.totalValueNum, styles.colorFour]}>START VALUE: </Text>
            <Text style={styles.totalValueNum}>{startValue.totalStartValue}</Text>
          </View>
        </View>
      </View >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // justifyContent: 'center',
  },
  input: {
    borderColor: '#89BFFF',
    borderWidth: 2,
    width: 400,
    padding: 10,
    borderRadius: 15,
  },
  addButton: {
    borderColor: '#89BFFF',
    backgroundColor: '#89BFFF',
    borderWidth: 2,
    height: 50,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  element: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 400,
    height: 50,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  totalValueNum: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
  },
  top: {
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 8,
    width: '100%',
    // backgroundColor: 'pink',
  },
  bottom: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementList: {
    marginTop: 10,
  },
  additionBox: {
    borderWidth: 2,
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  routineAdditionDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSign: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'grey'
  },
  twoButtons: {
    borderColor: '#89BFFF',
    backgroundColor: '#89BFFF',
    borderWidth: 2,
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  twoButtonContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  buttonSpace: {
    marginRight: 20,
  },
  textBold: {
    fontWeight: 'bold',
  },
  colorOne: {
    borderColor: 'grey',
  },
  colorTwo: {
    borderColor: '#96FF33',
  },
  colorThree: {
    borderColor: 'pink',
  },
  colorFour: {
    color: 'grey',
  },
  vaultBottom: {
    flex: 3
  },
  vaultMiddle: {
    flex: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  vaultList: {
    // backgroundColor: 'green',
    marginTop: 80,
    marginBottom: 20
  },
  vaultRoutineAdditionDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  }
})

export default CreateRoutine;