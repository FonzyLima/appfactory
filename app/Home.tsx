import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React from "react";
import Footer from "./components/shared/Footer";
import Recipe from "./components/shared/Recipe";
import Icon from "react-native-vector-icons/EvilIcons";
import Icons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
interface Recipe {
    label: string;
    healthLabels: string[];
    ingredientLines:string[];
    calories:number;
    image:string;
    source:string;
    dishType:string;
    nutrients:{
      protein:number;
      fat:number;
      carbs:number
    }
  }
  
const Page = () => {
    const [recipe, setRecipe] = useState<Recipe[]>([]);
  const getRecipes = async () => {
    try {
      const response = await fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=thai&app_id=67f43a52&app_key=257a9e063564019af4d5257ab5033236"
      );
      const json = await response.json();
      const recipes: Recipe[] = json.hits.map((hit: any) => ({
        label: hit.recipe.label,
        calories: hit.recipe.calories || 0,
        healthLabels: hit.recipe.healthLabels || [],
        image: hit.recipe.image || '',
        source:hit.recipe.source || '',
        dishType:hit.recipe.dishType || '',
        ingredientLines:hit.recipe.ingredientLines || [],
        nutrients:{
          protein: hit.recipe.totalNutrients.PROCNT?.quantity || 0,
          fat: hit.recipe.totalNutrients.FAT?.quantity || 0,
          carbs: hit.recipe.totalNutrients.CHOCDF?.quantity || 0
        }
      }));
      console.log(typeof(json.hits[0].recipe.ingredientLines))
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
      <ScrollView >
      {recipe.length > 0 ? (
        recipe.map((hit, index) => (
         <Recipe key={index} name={hit.label} calories={hit.calories} image={hit.image} source={hit.source} ingredientList={hit.ingredientLines} protein={hit.nutrients.protein} carbs={hit.nutrients.carbs} fat={hit.nutrients.fat}/>
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
    gap:20
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
