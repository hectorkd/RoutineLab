import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import ApiServices from '../ApiServices';
import helperfunctions from '../helperfunctions';
import { IMove, IPostRoutine, IStartValue } from '../interface';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IndividualSavedRoutineProps { savedRoutine: IPostRoutine, handleAddToCompRoutine: any, navigation: any }

const IndividualSavedRoutines: React.FC<IndividualSavedRoutineProps> = ({ savedRoutine, navigation, handleAddToCompRoutine }) => {

  const [elements, setElements] = useState<IMove[]>([]);
  const [routineArray, setRoutineArray] = useState<IMove[]>([]);
  const [start, setStart] = useState<IStartValue>({ eScore: '0.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' });
  const [vaultStartValue, setVaultStartValue] = useState<IStartValue[]>([{ eScore: '10.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' }, { eScore: '10.0', requirmentsTotal: '0.0', elementTotal: '0.0', totalStartValue: '0.0' }]);

  useEffect(() => {
    ApiServices.getApparatusMoves(savedRoutine.apparatus).then(res => setElements(res));
  }, [])


  useEffect(() => {
    if (elements.length > 0) {
      const routineElements: IMove[] = [];
      savedRoutine.routine.forEach(move => {
        const found = elements.find(element => element._id === move.id);
        if (found) {
          routineElements.push(found);
        }
      })
      setRoutineArray(routineElements);
      if (savedRoutine.apparatus === 'Vault') {
        const starts = helperfunctions.calculateVaultStart(routineElements);
        if (starts.length === 1) {
          setVaultStartValue(starts)
        } else {
          setVaultStartValue(starts)
        }
      } else {
        const starts = helperfunctions.calculateRoutineStart(routineElements);
        setStart(starts);
      }
    }
  }, [elements])

  return (
    < View style={styles.container} >
      <TouchableOpacity
        onPress={() => navigation.navigate('ROUTINE', { apparatus: savedRoutine.apparatus, routineArray, routineName: savedRoutine.routineName, startValue: savedRoutine.apparatus === 'Vault' ? vaultStartValue : start })}
      >
        <View style={styles.box}>
          <View style={styles.start}>
            <Text style={styles.startText}>{
              savedRoutine.apparatus === 'Vault' ? (vaultStartValue[0].totalStartValue > vaultStartValue[1].totalStartValue ? vaultStartValue[0].totalStartValue : vaultStartValue[1].totalStartValue) : start.totalStartValue
            }</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{savedRoutine.routineName}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleAddToCompRoutine(savedRoutine)}
      >
        <AntDesign name="staro" size={30} color={savedRoutine.isCompRoutine ? "gold" : "grey"} />
      </TouchableOpacity>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    width: 320,
    height: 40,
    flexDirection: 'row',
    borderColor: '#89BFFF',
    borderWidth: 2,
    borderRadius: 15,
  },
  start: {
    flex: 1,
    backgroundColor: '#89BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  name: {
    flex: 3,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  startText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A9A9A9',
  }
})

export default IndividualSavedRoutines;