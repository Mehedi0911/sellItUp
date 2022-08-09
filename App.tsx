import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation";
import "react-native-gesture-handler";
import { extendTheme, NativeBaseProvider, theme } from "native-base";
import { colors } from "./src/theme/colors";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
          "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
          "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFontsLoaded(true);
      }
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const appTheme = extendTheme({
    colors: {
      brandPrimary: {
        100: "#85a3b8",
        200: "#6d91a9",
        300: "#547e9b",
        400: "#3c6c8d",
        500: "#23597e",
        main: "#0B4770",
      },
      brandSecondary: {
        main: "#F7931E",
        100: "#fbc98f",
        200: "#fabe78",
        300: "#f9b362",
        400: "#f9a94b",
        500: "#f89e35",
      },
    },
  });

  return (
    <View style={styles.container}>
      <NativeBaseProvider theme={appTheme}>
        <Navigation />
      </NativeBaseProvider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
  },
});
