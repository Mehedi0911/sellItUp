import * as React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors";

interface InputProps {
  placeHolder?: string;
  onchange?: any;
  secureTextEntry?: boolean;
  onChangeText?: any;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  multiline?: boolean;
  value?: any;
  style?: any;
}

const Input = ({ placeHolder, secureTextEntry, onChangeText, autoCapitalize, multiline, value, style }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputStyle = StyleSheet.compose(styles.textInput, style);

  return (
    <View>
      <TextInput style={inputStyle} placeholder={placeHolder} secureTextEntry={!showPassword && secureTextEntry} onChangeText={onChangeText} autoCapitalize={autoCapitalize} multiline={multiline} value={value} />
      {secureTextEntry && <Feather name={showPassword ? "eye-off" : "eye"} size={20} color={colors.primary} style={{ position: "absolute", right: 10, top: 20 }} onPress={() => setShowPassword(!showPassword)} />}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    borderColor: "grey",
    borderWidth: 1.1,
    height: 40,
    borderRadius: 3,
    padding: 7,
    marginVertical: 10,
  },
});
