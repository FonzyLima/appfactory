import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link, router, useRouter } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
const Recipe = ({
  name,
  calories,
  image,
  source,
  ingredientList,
  protein,
  carbs,
  fat,
}: {
  name: string;
  calories: number;
  image: string;
  source: string;
  ingredientList: string[];
  protein: number;
  carbs: number;
  fat: number;
}) => {
  const router = useRouter();
  const encodedURL = encodeURIComponent(image);
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/${name}`,
          params: {
            name: name,
            calories: calories,
            image: encodedURL,
            source: source,
            ingredientList: JSON.stringify(ingredientList),
            protein:protein,
            carbs:carbs,
            fat:fat,
          },
        })
      }
    >
      <View style={styles.container}>
     
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.bottomContainer}>
          <Text selectable={true} style={styles.recipeName}>
            {name}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.grayText}>{source}</Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Icon name="fire" size={16} color="#A1AEB1" />
              <Text style={styles.grayText}>{Math.round(calories)} kcal</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D9D9D9",
    marginTop: 10,
    borderRadius: 20,
  },
  bottomContainer: {
    padding: 16,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "700",
  },
  grayText: {
    color: "#808080",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 160,
    resizeMode: "cover",
    borderTopLeftRadius: 12, // Top-left border radius
    borderTopRightRadius: 12, // Top-right border radius
  },
});
export default Recipe;
