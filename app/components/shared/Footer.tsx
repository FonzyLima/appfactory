import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useRouter } from "expo-router";
const Footer = () => {
  const router = useRouter()
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.iconContainer} onPress={()=>router.replace("/")}>
        <Icon name="bowl-rice" size={30} color="#A1AEB1" />
        <Text style={style.iconText}>Recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.iconContainer} onPress={()=>router.replace("/Favorites")}>
        <Icon name="heart" size={30} color="#A1AEB1" />
        <Text style={style.iconText}>Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.iconContainer} onPress={()=>router.replace("/Grocery")}>
        <Icon name="list-check" size={30} color="#A1AEB1" />
        <Text style={style.iconText}>Grocery List</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height:100,
    position: "absolute",
    bottom: 0,
    flexDirection:"row",
    justifyContent:"space-around",
    paddingVertical:16,
    backgroundColor:"white",
    borderTopWidth:0.5
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
