import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import AppBar from "../components/common/AppBar";
import Banner from "../components/Home/Banner";
import BrowseCategories from "../components/Home/BrowseCategories";
import SearchArea from "../components/Home/SearchArea";
import PopularAds from "../components/Ads/PopularAds";

interface HomeProps { }

const Home = (props: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <AppBar showToolBar={true} darkTheme={true} />
        <Banner />
        <SearchArea />
        <View style={{ paddingHorizontal: 20 }}>
          <BrowseCategories />
          <PopularAds />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
