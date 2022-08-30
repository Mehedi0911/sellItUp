import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import { Button, Checkbox, HStack, Icon, Image, Pressable, Spinner, Text, TextArea } from "native-base";
import AppBar from "../components/common/AppBar";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useToast } from 'native-base';
import Input from "../components/common/Input";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../App";
import ToastBox from "../components/common/ToastBox";
import { AuthContext } from "../providers/auth";
interface SignUpProps {
  navigation: any;
}

const provider = new GoogleAuthProvider();

const SignUp = ({ navigation }: SignUpProps) => {
  const toast = useToast()
  const { signUpUserWithEmail, loading } = React.useContext(AuthContext)
  const [confirmedPassword, setConfirmedPassword] = React.useState('')
  const [newUser, setNewUser] = React.useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    website: ''
  })


  const GoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
    } catch (error) {
    }
  }

  return (
    <View style={styles.container}>
      <AppBar showToolBar={false} />
      <ScrollView style={styles.contentWrapper}>
        <HStack alignItems="center" mt={5} mb={3}>
          <FontAwesome name="user-circle-o" size={22} color={colors.primary} />
          <Text fontSize={"xl"} fontWeight="semibold" ml={2}>
            Sign Up
          </Text>
        </HStack>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <Input placeHolder="Full Name" autoCapitalize="words"
          onChangeText={(text: string) => setNewUser({ ...newUser, fullName: text })}
        />
        <Input placeHolder="email"
          onChangeText={(text: string) => setNewUser({ ...newUser, email: text })}
        />
        <Input placeHolder="password" secureTextEntry
          onChangeText={(text: string) => setNewUser({ ...newUser, password: text })}
        />
        <Input placeHolder="confirm password" secureTextEntry
          onChangeText={(text: string) => setConfirmedPassword(text)}
        />

        {loading ? <Spinner size="lg" color={colors.secondary} /> :
          <Button onPress={() => signUpUserWithEmail(newUser, navigation)} my={3} bgColor={"brandPrimary.main"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
            Sign Up
          </Button>}
        <HStack space={2} justifyContent="center">
          <Button onPress={() => GoogleSignUp()} my={1} w={'48.5%'} bgColor={colors.primary}>
            <Image source={require("../../assets/google.png")} alt="logo" />
          </Button>
          <Button my={1} w={'48.5%'} bgColor={colors.primary}>
            <Image source={require("../../assets/facebook.png")} alt="logo" />
          </Button>
        </HStack>
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
