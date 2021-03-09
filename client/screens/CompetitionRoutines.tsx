import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, SectionList } from 'react-native'
import ApiServices from '../ApiServices';
import IndividualCompRoutine from '../components/IndividualCompRoutine';
import { UserContext } from '../context/UserProvider';
import helperfunctions from '../helperfunctions';
import { IPostRoutine, ISavedRoutines } from '../interface'

interface CompetitionRoutinesProps { navigation: any, route: any }

const CompetitionRoutines: React.FC<CompetitionRoutinesProps> = ({ navigation, route }) => {

  const { overallStart } = route.params

  const context = useContext(UserContext);

  const [compRoutines, setCompRoutines] = useState<IPostRoutine[]>([]);

  useEffect(() => {
    if (context.user?.firstName) {
      ApiServices.getCompRoutines(context.user?.firstName).then(res => {
        setCompRoutines(res);
      })
    }
  }, []);

  const savedRoutineList: ISavedRoutines[] = helperfunctions.convertSavedRoutines(compRoutines);

  return (
    <View style={styles.container}>
      <View style={styles.top} >
        < SectionList
          sections={savedRoutineList}
          keyExtractor={item => item._id}
          renderItem={(data) => <IndividualCompRoutine savedRoutine={data.item} navigation={navigation} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerView}>
              <Text style={styles.header}>{title}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>No saved routines for this apparatus</Text>}
        />
      </View>
      <View style={styles.bottom} >
        <View style={styles.routineAdditionDisplay}>
          <Text style={[styles.totalValueNum, styles.colorFour]}>TOTAL START VALUE: </Text>
          <Text style={styles.totalValueNum}>{overallStart}</Text>
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
  top: {
    flex: 5,
  },
  bottom: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routineAdditionDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorFour: {
    color: 'grey',
  },
  totalValueNum: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'orange',
  },
})

export default CompetitionRoutines;