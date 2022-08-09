import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button, Checkbox, HStack, Icon, Pressable, Text, TextArea } from "native-base";
import AppBar from "../components/common/AppBar";
import { typography } from "../theme/typography";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Input from "../components/common/Input";
interface SignUpProps {
  navigation: any;
}

const SignUp = ({ navigation }: SignUpProps) => {
  return (
    <View style={styles.container}>
      <AppBar showToolBar={false} />
      <ScrollView style={styles.contentWrapper}>
        <HStack alignItems="center" mt={5} mb={3}>
          <FontAwesome name="user-circle-o" size={22} color={colors.primary} />
          <Text fontSize={"xl"} fontWeight="semibold" fontFamily={typography.primary} ml={2}>
            Sign Up
          </Text>
        </HStack>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <Input placeHolder="Full Name" autoCapitalize="words" />
        <Input placeHolder="email" />
        <Input placeHolder="password" secureTextEntry />
        <Input placeHolder="confirm password" secureTextEntry />

        <Button my={3} bgColor={"brandPrimary.main"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
          Sign Up
        </Button>
        <HStack alignItems="center">
          <Text mr={3}>Already have account?</Text>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text color="brandPrimary.main" fontWeight={"bold"}>
              Sign In
            </Text>
          </Pressable>
        </HStack>
        <HStack alignItems="center" mt={3}>
          <Text mr={3}>Skip sining up</Text>
          <Pressable onPress={() => navigation.navigate("VerifyAccount")}>
            <Text color="brandPrimary.main" fontWeight={"bold"}>
              Go to home
            </Text>
          </Pressable>
        </HStack>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 30,
  },
});
