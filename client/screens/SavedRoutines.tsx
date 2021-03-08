import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { SectionList, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native'
import ApiServices from '../ApiServices';
import IndividualSavedRoutines from '../components/IndividualSavedRoutines';
import { UserContext } from '../context/UserProvider';
import { IPostRoutine } from '../interface';

interface SavedRoutinesProps { navigation: any }

const SavedRoutines: React.FC<SavedRoutinesProps> = ({ navigation }) => {

  const context = useContext(UserContext);

  const [savedRoutines, setSavedRoutines] = useState<IPostRoutine[]>([])

  const floor: IPostRoutine[] = savedRoutines.filter(routine => routine.apparatus === 'Floor').sort((a: IPostRoutine, b: IPostRoutine) => {
    if (a.routineName < b.routineName) return 1;
    if (b.routineName > b.routineName) return -1;
    return 0;
  });
  // const pommel: IMove[] = savedRoutines.filter(item => item.apparatus === 'floor');
  // const rings: IMove[] = savedRoutines.filter(item => item.apparatus === 'floor');
  const vault: IPostRoutine[] = savedRoutines.filter(routine => routine.apparatus === 'Vault').sort((a: IPostRoutine, b: IPostRoutine) => {
    if (a.routineName < b.routineName) return 1;
    if (b.routineName > b.routineName) return -1;
    return 0;
  });
  const pBars: IPostRoutine[] = savedRoutines.filter(routine => routine.apparatus === 'Parallel Bars').sort((a: IPostRoutine, b: IPostRoutine) => {
    if (a.routineName < b.routineName) return 1;
    if (b.routineName > b.routineName) return -1;
    return 0;
  });
  const hBar: IPostRoutine[] = savedRoutines.filter(routine => routine.apparatus === 'Horizontal Bars').sort((a: IPostRoutine, b: IPostRoutine) => {
    if (a.routineName < b.routineName) return 1;
    if (b.routineName > b.routineName) return -1;
    return 0;
  });

  const savedRoutineList: any = [
    {
      title: 'Floor:',
      data: floor
    },
    {
      title: 'Pommel Horse:',
      data: []
    },
    {
      title: 'Rings:',
      data: []
    },
    {
      title: 'Vault:',
      data: vault
    },
    {
      title: 'Parallel Bars:',
      data: pBars
    },
    {
      title: 'Horizontal Bars:',
      data: hBar
    },
  ]


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
        renderItem={(data) => <IndividualSavedRoutines navigation={navigation} savedRoutine={data.item} />}
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