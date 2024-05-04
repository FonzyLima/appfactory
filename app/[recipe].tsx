import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Footer from "./components/shared/Footer";
import { useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";
const Page = () => {
  const { recipe, name, image, source } = useLocalSearchParams();
  const imagePath = image;
  console.log(imagePath);
  return (
    <View style={styles.container}>
      <View>{/* <Image style={styles.image} source={{ uri: image}} /> */}</View>

      <ScrollView>
        <View>
          <View>
            <Text>{name}</Text>
            <TouchableOpacity>
            <Icon name="heart" size={30} color="#A1AEB1" fill="#FFFF" />
            </TouchableOpacity>
        
          </View>

          <Text>{source}</Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: "cover",
    borderTopLeftRadius: 12, // Top-left border radius
    borderTopRightRadius: 12, // Top-right border radius
  },
});
export default Page;
