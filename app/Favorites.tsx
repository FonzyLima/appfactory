import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Footer from "./components/shared/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Recipe from "./components/shared/Recipe";
import { useState, useEffect } from "react";
interface Recipe {
  label: string;
  healthLabels: string[];
  ingredientLines: string[];
  calories: number;
  image: string;
  source: string;
  dishType: string;

  protein: number;
  fat: number;
  carbs: number;
}
const Page = () => {
  const [faves, setFaves] = useState<Recipe>();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-fave");
      // await AsyncStorage.clear()
      setFaves(JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Here are your favorite Recipes</Text>
      <ScrollView>
        {/* <Recipe name={faves[0].label} calories={faves.calories} source={faves.source} image={faves.image} ingredientList={faves.ingredientLines} protein={faves.protein} carbs={faves.carbs} fat={faves.fat}/>
         */}
        {/* {faves ? faves.map((fave,i)=><Text key={i}>{fave[0].label}</Text>):null} */}
        {faves ? (
          <Recipe
            name={faves?.label}
            calories={faves?.calories}
            source={faves?.source}
            image={faves?.image}
            ingredientList={faves?.ingredientLines}
            protein={faves?.protein}
            carbs={faves?.carbs}
            fat={faves?.fat}
          />
        ) : null}
      </ScrollView>
      <Footer />
    </View>
  );
};
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

export default Page;
