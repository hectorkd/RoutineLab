import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IMove } from '../interface';

interface RoutineElementProps { move: IMove, index: number, apparatus: string }

const RoutineElement: React.FC<RoutineElementProps> = ({ move, index, apparatus }) => {

  if (apparatus === 'Vault') {
    return (
      <View style={styles.vaultContainer}>
        <View style={styles.vaultMoveContainer}>
          <View style={styles.vaultNumberContainer}>
            <Text style={styles.number}>{index === 1 ? 'First vault:' : 'Second vault:'}</Text>
          </View>
          <View style={styles.vaultInfoContainer}>
            <View style={styles.move}>
              <View style={styles.left}>
                <Text style={styles.letter}>{move.pointValue}</Text>
              </View>
              <View style={styles.right}>
                <Text>{move.name}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  } else {

    return (
      <View style={styles.container} >
        <View style={styles.moveContainer}>
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
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'green',
  },
  moveContainer: {
    height: '100%',
    width: 400,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  numberContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'pink',
  },
  infoContainer: {
    flex: 8,
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
  },
  vaultMoveContainer: {
    height: 50,
    width: 400,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 2,
    // borderColor: 'yellow',
  },
  vaultNumberContainer: {
    // backgroundColor: 'pink',
    width: 400,
    marginBottom: 20,
  },
  vaultInfoContainer: {
    // backgroundColor: 'pink',
    width: 400
  },
  vaultContainer: {
    width: '100%',
    height: 120,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green'
  }
})

export default RoutineElement;