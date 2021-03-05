import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IMove, ITotal } from '../interface';
import ApiServices from '../ApiServices';
import RoutineElement from '../components/RoutineElement';

interface createRoutineProps { route: any, navigation: any }

const CreateRoutine: React.FC<createRoutineProps> = ({ route, navigation }) => {

  const { apparatus } = route.params;

  const [routineName, setRoutineName] = useState<string>('')
  const [elements, setElements] = useState<IMove[]>([]);
  const [routineArray, setRoutineArray] = useState<IMove[]>([])
  const [total, setTotal] = useState<ITotal[]>([])


  useEffect(() => {
    ApiServices.getApparatusMoves(apparatus).then(res => setElements(res));
  }, [])

  // useEffect(() => {
  //   console.log(routineArray);
  // }, [routineArray])

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
            <Text>First Vault:</Text>
            <TouchableOpacity />
            <Text>Second Vault:</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus })}
            >
              <Text style={styles.addButtonText}>Add vault</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text>Total: </Text>
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
          {
            routineArray.length !== 0 && <FlatList
              data={routineArray}
              renderItem={(data) => <RoutineElement move={data.item} index={data.index + 1} />}
              keyExtractor={(item: IMove) => item._id}
              ItemSeparatorComponent={flatListSeperator}
            // ListHeaderComponent={flatListSeperator}
            />
          }
          {
            routineArray.length < 10
              ? <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray })}
              >
                <Text style={styles.addButtonText}>Add element</Text>
              </TouchableOpacity>
              : <TouchableOpacity
                style={styles.addButton}
                onPress={() => { }}
              >
                <Text style={styles.addButtonText}>Save routine</Text>
              </TouchableOpacity>
          }
        </View>
        <View style={styles.bottom}>
          <Text style={styles.totalValue}>START VALUE: </Text>
        </View>
      </View >
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: 10,
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
  top: {
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 10,
    // backgroundColor: 'pink',
  },
  bottom: {
    flex: 1,
    // backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  elementList: {
    marginTop: 13,
  }
})

export default CreateRoutine;