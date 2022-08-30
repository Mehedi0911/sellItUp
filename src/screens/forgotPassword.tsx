import { Button, Checkbox, HStack, Icon, Pressable, Text, TextArea } from "native-base";
import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import AppBar from "../components/common/AppBar";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Input from "../components/common/Input";
interface SignInProps {
  navigation: any;
}

const ForgotPassword = ({ navigation }: SignInProps) => {
  return (
    <View style={styles.container}>
      <AppBar showToolBar={false} />
      <ScrollView style={styles.contentWrapper}>
        <HStack alignItems="center" mt={10} mb={3}>
          <MaterialIcons name="admin-panel-settings" size={22} color={colors.primary} />
          <Text fontSize={"xl"} fontWeight="semibold" ml={2}>
            Forgot Password
          </Text>
        </HStack>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <Input placeHolder="email" />

        <Button onPress={() => navigation.navigate("ResetPassword")} my={3} bgColor={"brandPrimary.main"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
          Get Reset Link
        </Button>
        <Button my={3} bgColor={"brandPrimary.100"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
          Back to sign in
        </Button>
        <HStack alignItems="center">
          <Text mr={3}>Don't have account?</Text>
          <Pressable onPress={() => navigation.navigate("SignUp")}>
            <Text color="brandPrimary.main" fontWeight={"bold"}>
              Sign Up
            </Text>
          </Pressable>
        </HStack>
        <HStack alignItems="center" mt={3}>
          <Text mr={3}>Skip sining in</Text>
          <Pressable>
            <Text color="brandPrimary.main" fontWeight={"bold"}>
              Go to home
            </Text>
          </Pressable>
        </HStack>
      </ScrollView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 30,
  },
  textInput: {
    borderColor: "grey",
    borderWidth: 1.1,
    height: 40,
    borderRadius: 3,
    padding: 7,
    marginVertical: 10,
  },
});
