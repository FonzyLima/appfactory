import { View, Text,StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import Footer from './components/shared/Footer'
const Page = () => {
  return (
    <View style={styles.container}>
     <Text style={styles.header}>Here is your grocery list</Text>
     <ScrollView>

     </ScrollView>
      <Footer/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
    backgroundColor: "#FFF",
  },
  header: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 28,
    borderBottomWidth:2,
    paddingBottom:8,
    marginBottom:8
  },
});
export default Page