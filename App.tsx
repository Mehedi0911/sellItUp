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
        100: "#e6f5ff",
        200: "#99d8ff",
        300: "#80ceff",
        400: "#4dbaff",
        500: "#33b1ff",
        main: colors.primary,
      },
      brandSecondary: {
        main: colors.secondary,
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
