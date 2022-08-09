import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
