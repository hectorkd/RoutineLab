import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CompetitionResults: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>CompetitionResults Page!</Text>
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

export default CompetitionResults;