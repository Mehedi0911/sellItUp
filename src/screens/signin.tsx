import { Button, Checkbox, HStack, Icon, Pressable, Spinner, Text, TextArea, useToast } from "native-base";
import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";
import AppBar from "../components/common/AppBar";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Input from "../components/common/Input";
import { AuthContext } from "../providers/auth";
interface SignInProps {
  navigation: any;
}

const SignIn = ({ navigation }: SignInProps) => {
  const toast = useToast()
  const { signin, loading } = React.useContext(AuthContext)
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
  })

  return (
    <View style={styles.container}>
      <AppBar showToolBar={false} />
      <ScrollView style={styles.contentWrapper} keyboardShouldPersistTaps='handled'>
        <HStack alignItems="center" mt={10} mb={3}>
          <FontAwesome name="user-circle-o" size={22} color={colors.primary} />
          <Text fontSize={"xl"} fontWeight="semibold" ml={2}>
            Sign in to your account
          </Text>
        </HStack>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <Input placeHolder="email" onChangeText={(text: string) => setCredentials({ ...credentials, email: text })} />
        <Input placeHolder="password" secureTextEntry onChangeText={(text: string) => setCredentials({ ...credentials, password: text })} />

        <Pressable onPress={() => navigation.navigate("ForgotPassword")}>
          <Text color="brandPrimary.main" fontWeight={"bold"}>
            Forgot password?
          </Text>
        </Pressable>
        {loading ? <Spinner size="lg" color={colors.secondary} /> :
          <Button onPress={async () => {
            if (!credentials?.email || !credentials?.password) {
              toast.show({
                description: "Please fill Up the credentials",
                bgColor: colors.red,
              })
              return
            }
            Keyboard.dismiss()
            const res = await signin(credentials)
            toast.show({
              description: res[1],
              bgColor: res[0] ? colors.green : colors.red,
            })
          }} my={3} bgColor={"brandPrimary.main"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
            Sign In
          </Button>
        }
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
          <Pressable onPress={() => navigation.navigate("Home")}>
            <Text color="brandPrimary.main" fontWeight={"bold"}>
              Go to home
            </Text>
          </Pressable>
        </HStack>
      </ScrollView>
    </View>
  );
};

export default SignIn;

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
