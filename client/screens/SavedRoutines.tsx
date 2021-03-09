import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Alert, SectionList, TouchableOpacity } from 'react-native';
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
    if (apparatusFilter.some(element => element.isCompRoutine === true)) {
      Alert.alert(
        "Alert",
        "Are you sure you want to add/remove this routine to competition routines?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel add"),
            style: "cancel"
          },
          {
            text: "OK", onPress: () => {
              ApiServices.addToCompRoutines(routine).then(res => {
                setSavedRoutines(res);
              })
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      ApiServices.addToCompRoutines(routine).then(res => {
        setSavedRoutines(res);
      })
      console.log(routine);
    }
  }

  useEffect(() => {
    if (context.user?.firstName) {
      ApiServices.getRoutines(context.user?.firstName).then(res => {
        setSavedRoutines(res);
      })
    }
  }, [])

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
})

export default SavedRoutines;