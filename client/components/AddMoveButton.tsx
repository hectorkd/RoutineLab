import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IMove } from '../interface';

interface AddMoveButtonProps { move: IMove, navigation: any, handlePress: any }

const AddMoveButton: React.FC<AddMoveButtonProps> = ({ move, navigation, handlePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.value}>
          <Text style={styles.valueText}>{move.letterValue}</Text>
          <Text style={styles.valueText}>{move.pointValue}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{move.name}</Text>
          <Text style={styles.infoText}>Group: {move.copGroup}</Text>
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

export default AddMoveButton;