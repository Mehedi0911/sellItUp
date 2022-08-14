import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { DarkTheme, NavigationContainer, useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import Home from "../screens/home";
import SignIn from "../screens/signin";
import SignUp from "../screens/signup";
import AppBar from "../components/common/AppBar";
import ResetPassword from "../screens/resetPassword";
import ForgotPassword from "../screens/forgotPassword";
import VerifyAccount from "../screens/verifyAccount";
import { colors } from "../theme/colors";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import AllAds from "../screens/allAds";
import Categories from "../screens/categories";
import Account from "../screens/account";
import CreateAdSuccess from "../screens/createAdSucess";
import CreateAdScreenThree from "../screens/createAdScreenThree";
import CreateAdScreenTwo from "../screens/createAdScreenTwo";
import CreateAdScreenOne from "../screens/createAdScreenOne";
import CustomDrawer from "../components/common/CustomDrawer";
import { Divider, Icon } from "native-base";
import Overview from "../screens/profile/overview";
import ProfileSettings from "../screens/profile/profileSettings";
import MayAds from "../screens/profile/myads";
import FavoriteAds from "../screens/profile/favouriteAds";
import PlanAndBillings from "../screens/profile/plans&Billings";

interface NavigationProps { }

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const CreateAdStack = createNativeStackNavigator();

const CreateAdButton = ({ children, onPress }: any) => (
  <TouchableOpacity style={{ top: -25, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
    <View style={{ height: 60, width: 60, backgroundColor: colors.primary, borderRadius: 30, borderWidth: 5, borderColor: colors.white }}>
      {children}
    </View>
  </TouchableOpacity>
)

const CreateAdsStackGroup = () => {
  return (
    <CreateAdStack.Navigator>
      <CreateAdStack.Screen name="CreateAdScreenOne" component={CreateAdScreenOne} options={{ headerShown: false }} />
      <CreateAdStack.Screen name="CreateAdScreenTwo" component={CreateAdScreenTwo} options={{ headerShown: false }} />
      <CreateAdStack.Screen name="CreateAdScreenThree" component={CreateAdScreenThree} options={{ headerShown: false }} />
      <CreateAdStack.Screen name="CreateAdSuccess" component={CreateAdSuccess} options={{ headerShown: false }} />
    </CreateAdStack.Navigator>
  )
}

const HomeTabs = () => {
  const navigation = useNavigation()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#f2f3f5",
          borderTopWidth: 0,
          elevation: 3,
          height: 60,
        },
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="home" size={20} color={focused ? colors.primary : "grey"} />
              <Text style={{ color: focused ? colors.primary : "grey" }}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="AllProducts" component={AllAds}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="ios-search" size={20} color={focused ? colors.primary : "grey"} />
              <Text style={{ color: focused ? colors.primary : "grey" }}>Search</Text>
            </View>
          ),
        }} />
      <Tab.Screen name="CreateAdsStackGroup" component={CreateAdsStackGroup}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="ios-add" size={30} color="white" />
          ),
          tabBarButton: (props) => (
            <CreateAdButton {...props} />
          )
        }}
      />
      <Tab.Screen name="Categories" component={Categories}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="category" size={20} color={focused ? colors.primary : "grey"} />
              <Text style={{ color: focused ? colors.primary : "grey" }}>Category</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen name="Account" component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <MaterialIcons name="account-circle" size={20} color={focused ? colors.primary : "grey"} />
              <Text style={{ color: focused ? colors.primary : "grey" }}>Account</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackGroup = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
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
  const user = true; //temporary user
  return (
    <View style={styles.container}>
      <NavigationContainer theme={AppTheme}>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          initialRouteName="HomeStackGroup"
          useLegacyImplementation={true}
          screenOptions={{
            headerShown: false,
            drawerLabelStyle: { marginLeft: -25 },
            drawerActiveBackgroundColor: colors.darkGrey,
            drawerActiveTintColor: colors.dark,
            drawerInactiveTintColor: 'grey',
            drawerInactiveBackgroundColor: colors.white,
          }}>
          <Drawer.Screen name="Home" component={HomeStackGroup} options={{
            drawerIcon: ({ color }) => (<Icon as={Ionicons} name="home" color={color} size='lg' />)
          }} />
          <Drawer.Screen name="Overview" component={Overview} options={{
            drawerIcon: ({ color }) => (<Icon as={MaterialIcons} name="dashboard" color={color} size='lg' />)
          }} />
          <Drawer.Screen name="My Ads" component={MayAds} options={{
            drawerIcon: ({ color }) => (<Icon as={MaterialCommunityIcons} name="post-outline" color={color} size='lg' />)
          }} />
          <Drawer.Screen name="Favorite Ads" component={FavoriteAds} options={{
            drawerIcon: ({ color }) => (<Icon as={MaterialIcons} name="favorite" color={color} size='lg' />)
          }} />
          <Drawer.Screen name="Plans & Billings" component={PlanAndBillings} options={{
            drawerIcon: ({ color }) => (<Icon as={Ionicons} name="trophy" color={color} size='lg' />)
          }} />
          <Drawer.Screen name="Profile" component={ProfileSettings} options={{
            drawerIcon: ({ color }) => (<Icon as={MaterialIcons} name="account-box" color={color} size='lg' />)
          }} />
          {/* <Drawer.Screen name="Account" component={AuthStackGroup} options={{
            drawerIcon: ({ color }) => (<Icon as={Ionicons} name="home" color={color} size='lg' />),
          }} /> */}

        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
});
