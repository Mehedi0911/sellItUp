import { HStack } from "native-base";
import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import CategoryCard from "../components/Ads/CategoryCard";
import AppBar from "../components/common/AppBar";
import { categories } from "../constants/data";

interface CategoriesProps { }

const Categories = (props: CategoriesProps) => {
  return (
    <ScrollView>
      <AppBar showToolBar />
      <HStack p={5} space={2}>
        {
          categories.map((category, index) => (
            <CategoryCard category={category} key={index} />
          ))
        }
      </HStack>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
});


