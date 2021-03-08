import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CompetitionRoutines: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>CompetitionRoutines Page!</Text>
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

export default CompetitionRoutines;