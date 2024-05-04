import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
const Footer = () => {
  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <Icon name="bowl-rice" size={30} color="#A1AEB1" />
        <Text style={style.iconText}>Recipes</Text>
      </View>
      <View style={style.iconContainer}>
        <Icon name="heart" size={30} color="#A1AEB1" />
        <Text style={style.iconText}>Favorites</Text>
      </View>
      <View style={style.iconContainer}>
        <Icon name="list-check" size={30} color="#A1AEB1" />
        <Text style={style.iconText}>Grocery List</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    position: "absolute",
    bottom: 0,
    flexDirection:"row",
    justifyContent:"space-around",
    paddingVertical:16,
    backgroundColor:"white",
  
  },
  iconContainer:{
    alignItems:"center",
    gap:4,
    width:"33%"
  },
  iconText:{

  }
});
export default Footer;
