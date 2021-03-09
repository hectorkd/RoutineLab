import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IMove, IStartValue } from '../interface';

interface VaultStartValueProps { vaultStartValue: IStartValue[], routineArray: IMove[] }


const VaultStartValue: React.FC<VaultStartValueProps> = ({ vaultStartValue, routineArray }) => {
  return (
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
  )
}

const styles = StyleSheet.create({
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
  additionBox: {
    borderWidth: 2,
    height: 20,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  textBold: {
    fontWeight: 'bold',
  },
  addSign: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'grey'
  },
  vaultRoutineAdditionDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  totalValueNum: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
  },
})

export default VaultStartValue;