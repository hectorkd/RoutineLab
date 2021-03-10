import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Alert, SectionList } from 'react-native';
import { View, Text, StyleSheet } from 'react-native'
import ApiServices from '../ApiServices';
import IndividualSavedRoutines from '../components/IndividualSavedRoutines';
import { UserContext } from '../context/UserProvider';
import helperfunctions from '../helperfunctions';
import { IPostRoutine, ISavedRoutines } from '../interface';

interface SavedRoutinesProps { navigation: any }

const SavedRoutines: React.FC<SavedRoutinesProps> = ({ navigation }) => {

  const context = useContext(UserContext);

  const [savedRoutines, setSavedRoutines] = useState<IPostRoutine[]>([])

  const savedRoutineList: ISavedRoutines[] = helperfunctions.convertSavedRoutines(savedRoutines);

  function handleAddToCompRoutine(routine: IPostRoutine): void {
    const apparatusFilter = savedRoutines.filter(IndividualRoutine => IndividualRoutine.apparatus === routine.apparatus);
    if (apparatusFilter.some(element => element.isCompRoutine === true) && typeof context.user?.firstName === 'string') {
      Alert.alert(
        "Alert",
        "Are you sure you want to add/remove this routine to competition routines?",
        [
          {
            text: "Cancel",
            onPress: () => { },
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              ApiServices.addToCompRoutines(routine, context.user?.firstName).then(res => {
                setSavedRoutines(res);
              })
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      ApiServices.addToCompRoutines(routine, context.user?.firstName).then(res => {
        setSavedRoutines(res);
      })
    }
  }

  useEffect(() => {
    if (context.user?.firstName) {
      ApiServices.getRoutines(context.user?.firstName).then(res => {
        setSavedRoutines(res);
      })
    }
  }, [])

  function listSeperator(): JSX.Element {
    return (
      <View style={styles.elementList}></View>
    )
  }

  return (
    <View style={styles.container}>
      < SectionList
        sections={savedRoutineList}
        keyExtractor={item => item._id}
        renderItem={(data) => <IndividualSavedRoutines handleAddToCompRoutine={handleAddToCompRoutine} navigation={navigation} savedRoutine={data.item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.headerView}>
            <Text style={styles.header}>{title}</Text>
          </View>
        )}
        ItemSeparatorComponent={listSeperator}
        ListEmptyComponent={<Text>No saved routines for this apparatus</Text>}
      />
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
  headerView: {
    height: 80,
  },
  header: {
    marginLeft: 0,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 50,
    color: '#89BFFF'
  },
  elementList: {
    marginBottom: 5,
  }
})

export default SavedRoutines;