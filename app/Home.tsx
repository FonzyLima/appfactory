import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React from "react";
import Footer from "./components/shared/Footer";
import Icon from "react-native-vector-icons/EvilIcons";
import Icons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
interface Recipe {
    label: string;
    healthLabels: string[];
    ingredientLines:string[];
    calories:number;
  }
  
const Page = () => {
    const [recipe, setRecipe] = useState<Recipe[]>([]);
  const getRecipes = async () => {
    try {
      const response = await fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=all&app_id=67f43a52&app_key= 257a9e063564019af4d5257ab5033236"
      );
      const json = await response.json();
      console.log("here", json.hits[0].recipe.calories);
      const recipes: Recipe[] = json.hits.map((hit: any) => ({
        label: hit.recipe.label,
        calories: hit.recipe.calories || 0,
        healthLabels: hit.recipe.healthLabels || [],

// Default to 0 if calories are not available
      }));
      setRecipe(recipes);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <View>
          <Icon name="search" size={30} color="#A1AEB1" />
        </View>
      
        <TextInput style={{ flexGrow: 1 }} maxLength={36} />
        <View>
          <Icons name="reorder-three" size={30} color="#A1AEB1" />
        </View>
      </View>
      <ScrollView>
      {recipe.length > 0 ? (
        recipe.map((hit, index) => (
          <View key={index}>
            <Text>Label: {hit.label}</Text>
    

            {/* Add more properties as needed */}
          </View>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "100%",
    backgroundColor: "pink",
  },
  searchBar: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#FDFDFD",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
export default Page;
