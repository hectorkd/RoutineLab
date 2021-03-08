import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface SavedRoutinesProps { navigation: any }

const SavedRoutines: React.FC<SavedRoutinesProps> = ({ navigation }) => {

  const [savedRoutines, setSavedRoutines] = useState<[]>([])

  // useEffect(() => {
  //   getSavedRoutines(name).then
  // }, [])

  return (
    <View style={styles.container}>
      <Text>SavedRoutines Page!</Text>
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
})

export default SavedRoutines;