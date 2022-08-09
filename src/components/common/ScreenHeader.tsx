import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ScreenHeaderProps {
  title: string;
  style: any;
  icon: any;
}

const ScreenHeader = (props: ScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text>ScreenHeader</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {},
});
