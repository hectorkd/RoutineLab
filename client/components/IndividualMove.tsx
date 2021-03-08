import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { IMove } from '../interface';

interface IndividualMoveProps { move: IMove }

const IndividualMove: React.FC<IndividualMoveProps> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.value}>
          <Text style={styles.valueText}>{props.move.pointValue}</Text>
          {props.move.apparatus !== 'Vault' && <Text style={styles.valueText}>{props.move.letterValue}</Text>}
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{props.move.name}</Text>
          <Text style={styles.infoText}>Group: {props.move.copGroup}</Text>
        </View>
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
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A9A9A9',
    textAlign: 'left',
  },
  box: {
    marginTop: 15,
    height: 100,
    width: 400,
    backgroundColor: '#89BFFF',
    borderRadius: 20,
    flexDirection: 'row'
  },
  value: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#fff',
  },
  info: {
    flex: 3,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: 100,
    width: 100,
    backgroundColor: '#EFF6FF',
    borderColor: '#89BFFF',
    borderWidth: 8,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  }
})

export default IndividualMove;