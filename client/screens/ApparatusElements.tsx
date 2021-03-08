import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { IMove, IRoutine } from '../interface';
import AddMoveButton from '../components/AddMoveButton';
import IndividualMove from '../components/IndividualMove';

interface ApparatusElementsProps { route: any, navigation: any }

const ApparatusElements: React.FC<ApparatusElementsProps> = ({ route, navigation }) => {

  const { apparatus, elements, setRoutineArray, routine, isChanging, index } = route.params;

  const sortedElements: IMove[] = elements.sort((a: IMove, b: IMove) => a.pointValue - b.pointValue);

  function handlePress(move: IMove): void {
    let flag = false;
    routine.forEach((element: IMove) => {
      if (element._id === move._id) flag = true;
    });
    if (!flag && !isChanging) {
      setRoutineArray((prev: IMove[]) => [...prev, move]);
      navigation.goBack();
    } else if (!flag && isChanging) {
      setRoutineArray((prev: IMove[]) => {
        const newPrev = prev.slice();
        newPrev.splice(index, 1, move);
        setRoutineArray(newPrev);
      });
      navigation.goBack();
    } else {
      Alert.alert('You have already selected this element, please choose a different one')
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{apparatus}</Text>
      <FlatList
        data={sortedElements}
        renderItem={data => (
          <TouchableOpacity
            onPress={() => handlePress(data.item)}
          >
            <IndividualMove move={data.item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#EFF6FF'
  },
  text: {
    color: '#89BFFF',
    fontSize: 50,
    fontWeight: 'bold',
    paddingLeft: 20,
  }
})

export default ApparatusElements;