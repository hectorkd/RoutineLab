import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { IMove } from '../interface'

interface SavedRoutinesProps { navigation: any, elements: IMove[], apparatus: string, setRoutineArray: React.Dispatch<React.SetStateAction<IMove[]>>, routineArray: IMove[], isChanging: boolean }

const SingleAddButton: React.FC<SavedRoutinesProps> = ({ navigation, elements, apparatus, setRoutineArray, routineArray, isChanging }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('ELEMENTS', { elements, apparatus: apparatus, setRoutineArray: setRoutineArray, routine: routineArray, isChanging: false })}
      >
        <Text style={styles.addButtonText}>{apparatus === 'Vault' ? 'Add vault' : 'Add element'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
})

export default SingleAddButton;