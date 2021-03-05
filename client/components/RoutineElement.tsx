import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IMove } from '../interface';

interface RoutineElementProps { move: IMove, index: number }

const RoutineElement: React.FC<RoutineElementProps> = ({ move, index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{index}.</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.move}>
          <View style={styles.left}>
            <Text style={styles.letter}>{move.letterValue}</Text>
          </View>
          <View style={styles.right}>
            <Text>{move.name}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 2,
    // borderColor: 'green',
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'pink',
  },
  infoContainer: {
    flex: 6,
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  move: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#89BFFF',
    borderWidth: 2,
    height: 40,
    borderRadius: 15,
  },
  number: {
    fontSize: 30,
    height: 40,
    color: 'grey',
    // borderWidth: 2,
    // borderColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#89BFFF',
    height: 40,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  right: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  }
})

export default RoutineElement;