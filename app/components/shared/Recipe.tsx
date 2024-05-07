import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Link, router, useRouter } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
interface Recipe {
  label: string;
  healthLabels: string[];
  ingredientLines: string[];
  calories: number;
  image: string;
  source: string;
  dishType: string;
  nutrients: {
    protein: number;
    fat: number;
    carbs: number;
  };
}

const Recipe = ({
  recipe
}: {
  recipe:Recipe;
}) => {
  const router = useRouter();
  const encodedURL = encodeURIComponent(recipe.image);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/${recipe.label}`,
          params: {
            name: recipe.label,
            calories: recipe.calories,
            image: encodedURL,
            source: recipe.source,
            ingredientList: recipe.ingredientLines ? JSON.stringify(recipe.ingredientLines) : recipe.ingredientLines,
            nutrients:JSON.stringify(recipe.nutrients)
    
          },
        })
      }
    >
      <View style={styles.container}>
     
        <Image style={styles.image} source={{ uri: recipe.image }} />
        <View style={styles.bottomContainer}>
          <Text selectable={true} style={styles.recipeName}>
            {recipe.label}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.grayText}>{recipe.source}</Text>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Icon name="fire" size={16} color="#A1AEB1" />
              <Text style={styles.grayText}>{Math.round(recipe.calories)} kcal</Text>
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
