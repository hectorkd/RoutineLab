import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import RoutineElement from '../components/RoutineElement';
import { IMove } from '../interface';

interface CreateRoutineProps { route: any }

const SavedRoutineDisplay: React.FC<CreateRoutineProps> = ({ route }) => {

  const { apparatus, routineName, routineArray, startValue } = route.params;

  function flatListSeperator(): JSX.Element {
    return (
      <View style={styles.elementList}></View>
    )
  }

  function flatListHeader(): JSX.Element {
    return (
      <View style={styles.vaultList}></View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{routineName}</Text>
      </View>
      <View style={styles.middle}>
        <FlatList
          data={routineArray}
          renderItem={(data) => <RoutineElement apparatus={apparatus} move={data.item} index={data.index + 1} />}
          keyExtractor={(item: IMove) => item._id}
          ItemSeparatorComponent={flatListSeperator}
          scrollEnabled={false}
          ListHeaderComponent={(apparatus === 'Vault' ? flatListHeader : flatListSeperator)}
        />
      </View>
      <View style={(apparatus === 'Vault' ? styles.vaultBottom : styles.bottom)}>
        {
          apparatus === 'Vault'
            ? <View>
              <View style={styles.routineAdditionDisplay}>
                <View style={[styles.additionBox, styles.colorOne]}>
                  <Text style={styles.textBold}>{startValue[0].eScore}</Text>
                </View>

                <Text style={styles.addSign}>+</Text>
                <View style={[styles.additionBox, styles.colorThree]}>
                  <Text style={styles.textBold}>{startValue[0].elementTotal}</Text>
                </View>
              </View>
              <View style={styles.vaultRoutineAdditionDisplay}>
                <Text style={[styles.totalValueNum, styles.colorFour]}>FIRST VAULT START: </Text>
                <Text style={styles.totalValueNum}>{startValue[0].totalStartValue}</Text>
              </View>
              {
                routineArray.length === 2 && <View><View style={styles.routineAdditionDisplay}>
                  <View style={[styles.additionBox, styles.colorOne]}>
                    <Text style={styles.textBold}>{startValue[1].eScore}</Text>
                  </View>

                  <Text style={styles.addSign}>+</Text>
                  <View style={[styles.additionBox, styles.colorThree]}>
                    <Text style={styles.textBold}>{startValue[1].elementTotal}</Text>
                  </View>
                </View>
                  <View style={styles.routineAdditionDisplay}>
                    <Text style={[styles.totalValueNum, styles.colorFour]}>SECOND VAULT START: </Text>
                    <Text style={styles.totalValueNum}>{startValue[1].totalStartValue}</Text>
                  </View>
                </View>
              }
            </View>
            : <View style={styles.bottom}>
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
        }
      </View >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  top: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 10,
  },
  bottom: {
    flex: 1.5,
    justifyContent: 'space-evenly',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#89BFFF'
  },
  routineAdditionDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addSign: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 15,
    color: 'grey'
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
  totalValueNum: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
  },
  elementList: {
    marginTop: 11,
  },
  vaultList: {
    marginTop: 120,
  },
  vaultRoutineAdditionDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  vaultBottom: {
    flex: 4,
    justifyContent: 'center',
  }
})

export default SavedRoutineDisplay;