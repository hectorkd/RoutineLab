import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { IStartValue } from '../interface'

interface RoutineStartValueProps { startValue: IStartValue }

const RoutineStartValue: React.FC<RoutineStartValueProps> = ({ startValue }) => {
  return (
    <View>
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
  )
}

const styles = StyleSheet.create({
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
  addSign: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'grey'
  },
  textBold: {
    fontWeight: 'bold',
  },
  totalValueNum: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
  },
})

export default RoutineStartValue;