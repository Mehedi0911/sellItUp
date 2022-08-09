import { Button, Checkbox, HStack, Icon, Pressable, Text, TextArea } from "native-base";
import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import AppBar from "../components/common/AppBar";
import { typography } from "../theme/typography";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Input from "../components/common/Input";
interface SignInProps {
  navigation: any;
}

const VerifyAccount = ({ navigation }: SignInProps) => {
  return (
    <View style={styles.container}>
      <AppBar showToolBar={false} />
      <ScrollView style={styles.contentWrapper}>
        <HStack alignItems="center" mt={10} mb={3}>
          <Octicons name="verified" size={22} color={colors.primary} />
          <Text fontSize={"xl"} fontWeight="semibold" fontFamily={typography.primary} ml={2}>
            Email Verification
          </Text>
        </HStack>
        <Text>
          Please Enter the 6 digit code sent to the email <Text fontWeight="bold">user@account.com</Text>
        </Text>
        <Input placeHolder="verification code" />

        <Button my={3} bgColor={"brandPrimary.main"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
          Verify my account
        </Button>
        <HStack alignItems="center">
          <Text mr={3}>Didn't receive code?</Text>
          <Pressable onPress={() => navigation.navigate("SignIn")}>
            <Text color="brandPrimary.main" fontWeight={"bold"}>
              Resend
            </Text>
          </Pressable>
        </HStack>
      </ScrollView>
    </View>
  );
};

export default VerifyAccount;

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
