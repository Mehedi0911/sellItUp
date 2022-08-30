import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation";
import "react-native-gesture-handler";
import { extendTheme, NativeBaseProvider, theme } from "native-base";
import { colors } from "./src/theme/colors";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import * as Font from "expo-font";
import { firebaseConfig } from "./src/utils/firebaseConfig";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AuthProvider from "./src/providers/auth";
import AdProviders from "./src/providers/ad";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
const app = initializeApp({ ...firebaseConfig });
export const db = getFirestore(app);
// export const auth = getAuth(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default function App() {

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
      <AdProviders>
        <AuthProvider>
          <NativeBaseProvider theme={appTheme}>
            <Navigation />
          </NativeBaseProvider>
          <StatusBar style="auto" />
        </AuthProvider>
      </AdProviders>
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
