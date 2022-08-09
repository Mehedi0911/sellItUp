import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";
import Home from "../screens/home";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";
import AppBar from "../components/common/AppBar";
import ResetPassword from "../screens/resetPassword";
import ForgotPassword from "../screens/forgotPassword";
import VerifyAccount from "../screens/verifyAccount";

interface NavigationProps {}

const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
};

const AuthStackGroup = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <AuthStack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <AuthStack.Screen name="VerifyAccount" component={VerifyAccount} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#FFFF",
  },
};

const Navigation = (props: NavigationProps) => {
  const user = false; //temporary user
  return (
    <View style={styles.container}>
      <NavigationContainer theme={AppTheme}>
        <Drawer.Navigator initialRouteName="HomeStackGroup" useLegacyImplementation={true} screenOptions={{ headerShown: false }}>
          {user ? <Drawer.Screen name="HomeStackGroup" component={HomeStackGroup} /> : <Drawer.Screen name="AuthStackGroup" component={AuthStackGroup} />}
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
});
