import { Button, Checkbox, HStack, Icon, Pressable, Text, TextArea } from "native-base";
import * as React from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import AppBar from "../components/common/AppBar";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import Input from "../components/common/Input";
import { AuthContext } from "../providers/auth";
interface SignInProps {
  navigation: any;
}

const ResetPassword = ({ navigation }: SignInProps) => {
  const { resetPassword } = React.useContext(AuthContext)
  const [newPass, setNewPass] = React.useState('')
  const [confirmNewPass, setConfirmNewPass] = React.useState('')
  return (
    <View style={styles.container}>
      <AppBar showToolBar={false} />
      <ScrollView style={styles.contentWrapper}>
        <HStack alignItems="center" mt={10} mb={3}>
          <FontAwesome name="user-circle-o" size={22} color={colors.primary} />
          <Text fontSize={"xl"} fontWeight="semibold" ml={2}>
            Reset Password
          </Text>
        </HStack>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <Input placeHolder="new password" secureTextEntry onChangeText={(text: string) => setNewPass(text)} />
        <Input placeHolder="confirm new password" secureTextEntry onChangeText={(text: string) => setConfirmNewPass(text)} />

        <Button onPress={() => resetPassword(newPass, navigation)} my={3} bgColor={"brandPrimary.main"} endIcon={<Icon as={AntDesign} name="arrowright" size="sm" color="white" />}>
          Reset
        </Button>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

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
