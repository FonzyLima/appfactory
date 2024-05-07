import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Footer from "./components/shared/Footer";
import { useLocalSearchParams, router } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Heart from "react-native-vector-icons/AntDesign";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Recipe {
  label: string;
  healthLabels: string[];
  ingredientList: string[];
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
  const [favorite, setFavorite] = useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-fave");
      if (value !== null) {
        setFaves(JSON.parse(value));
        if (JSON.parse(value).label == name) {
          setFavorite(true);
        }
      }
    } catch (e) {}
  };
  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem("my-fave", value);
      setFaves(value);
    } catch (e) {
      console.log(e);
    }
  };
  const removeFavorite = async () => {
    try {
      await AsyncStorage.removeItem("my-fave");
      setFavorite(false);
    } catch (e) {
      console.log(e);
    }
  };
  const addFavorite = (newRecipe: Recipe) => {
    setFavorite(true);
    // const updatedFaves = [...faves, newRecipe];
    // setFaves(updatedFaves);
    storeData(JSON.stringify(newRecipe));
  };

  useEffect(() => {
    getData();
    console.log("changege");
  }, []);

  const {
    recipe,
    name,
    image,
    source,
    ingredientList,
    protein,
    carbs,
    fat,
    calories,
  } = useLocalSearchParams();
  const parsedIngredientList = ingredientList ? JSON.parse(ingredientList) : [];
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: image as any }} />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 64,
        }}
      >
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.nameText}>{name}</Text>
            {favorite ? (
              <TouchableOpacity onPress={() => removeFavorite()}>
                <Heart name="heart" size={30} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  addFavorite({
                    label: name,
                    image: image,
                    source: source,
                    protein: protein,
                    carbs: carbs,
                    fat: fat,
                    calories: calories,
                    ingredientList: ingredientList,
                  })
                }
              >
                <Heart name="hearto" size={30} color="red" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.grayText}>{source}</Text>
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientsRow}>
              <View style={styles.nutrientBox}>
                <View style={styles.iconBox}>
                  <Icon name="fire" size={18} color="#000" />
                </View>
                <Text style={{ fontSize: 16 }}>
                  {Math.round(Number(calories))} kcal
                </Text>
              </View>
              <View style={styles.nutrientBox}>
                <View style={styles.iconBox}>
                  <Icons name="food-steak" size={20} color="#000" />
                </View>
                <Text
                  style={{ fontSize: 16, flex: 1 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {Math.round(Number(protein))}g protein
                </Text>
              </View>
            </View>
            <View style={styles.nutrientsRow}>
              <View style={styles.nutrientBox}>
                <View style={styles.iconBox}>
                  <Icon name="plate-wheat" size={18} color="#000" />
                </View>
                <Text style={{ fontSize: 16 }} numberOfLines={1}>
                  {Math.round(Number(carbs))}g carbs
                </Text>
              </View>
              <View style={styles.nutrientBox}>
                <View style={styles.iconBox}>
                  <Icon name="pizza-slice" size={18} color="#000" />
                </View>
                <Text
                  style={{ fontSize: 16, flex: 1 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {Math.round(Number(fat))}g fat
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.boldText}>Ingredients:</Text>
          <View>
            {parsedIngredientList.map((ingredient: string, i: number) => (
              <Text style={{ fontSize: 16 }} key={i}>
                {ingredient}
              </Text>
            ))}
          </View>
        </View>
        <View style={{ height: 40, width: "100%" }} />
      </ScrollView>
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFF",
  },
  image: {
    width: "100%",
    height: 210,
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerContainer: {
    paddingHorizontal: 16,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "700",
  },
  ingredientsContainer: {
    gap: 6,
    marginTop: 20,
    backgroundColor: "#F1F1F1",
    padding: 16,
  },
  boldText: {
    fontSize: 20,
    fontWeight: "700",
  },
  grayText: {
    color: "#808080",
    fontSize: 18,
  },
  nutrientsContainer: {
    marginTop: 20,
    gap: 6,
  },
  nutrientsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconBox: {
    backgroundColor: "#F1F1F1",
    padding: 8,
    borderRadius: 4,
    width: 36,
    alignItems: "center",
  },
  nutrientBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 140,
  },
});
export default Page;
