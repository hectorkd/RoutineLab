import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SectionList, View, ActivityIndicator } from 'react-native';
import { IMove, IMoveSection } from '../interface';
import apiService from '../ApiServices';
import IndividualMove from '../components/IndividualMove';

const CodeOfPoints: React.FC = () => {

  const [cop, setCop] = useState<IMove[]>([]);

  const floor: IMove[] = cop.filter(item => item.apparatus === 'Floor').sort((a, b) => a.pointValue - b.pointValue);
  // const pommel: IMove[] = cop.filter(item => item.apparatus === 'floor');
  // const rings: IMove[] = cop.filter(item => item.apparatus === 'floor');
  const vault: IMove[] = cop.filter(item => item.apparatus === 'Vault').sort((a, b) => a.pointValue - b.pointValue);
  const pBars: IMove[] = cop.filter(item => item.apparatus === 'Parallel Bars').sort((a, b) => a.pointValue - b.pointValue);
  const hBar: IMove[] = cop.filter(item => item.apparatus === 'Horizontal Bars').sort((a, b) => a.pointValue - b.pointValue);

  const copList: IMoveSection[] = [
    {
      title: 'Floor',
      data: floor
    },
    // {
    //   title: 'Pommel Horse',
    //   data: pommel
    // },
    // {
    //   title: 'Rings',
    //   data: rings
    // },
    {
      title: 'Vault',
      data: vault
    },
    {
      title: 'Parallel Bars',
      data: pBars
    },
    {
      title: 'Horizontal Bars',
      data: hBar
    },
  ]

  useEffect(() => {
    apiService.getCodeOfPoints().then(result => setCop(result));
  }, []);

  if (!copList.length) {
    return (
      <ActivityIndicator size="large" color="#89BFFF" />
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Text>Search</Text>
          <Text>Filter</Text>
        </View>
        < SectionList
          sections={copList}
          keyExtractor={item => item._id}
          renderItem={data => < IndividualMove move={data.item} />}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.headerView}>
              <Text style={styles.header}>{title}</Text>
            </View>
          )}
        />
      </View>
    )
  }

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
    backgroundColor: '#EFF6FF',
  },
  header: {
    marginLeft: 20,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 50,
    color: '#89BFFF'
  },
  search: {
    height: 60,
    width: '100%',
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  searchText: {
    color: 'black',
  }
})

export default CodeOfPoints;