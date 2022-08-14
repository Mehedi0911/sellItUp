import { Ionicons } from "@expo/vector-icons";
import { HStack, Icon, Pressable, Text } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";

interface ScreenHeaderProps {
  title?: string;
  style?: any;
}

const ScreenHeader = ({ title, style }: ScreenHeaderProps) => {
  return (
    <HStack justifyContent={'space-between'} borderBottomColor={colors.grey} borderBottomWidth={2} h={12} alignItems="center" flexDirection={'row'}>
      <Pressable>
        <Icon ml={2} mt={0.5} as={Ionicons} name="chevron-back" size="lg" color={colors.black} />
      </Pressable>
      <Text fontSize={'xl'} ml={-6} fontWeight="semibold">{title}</Text>
      <Text fontSize={'xl'} ml={2} fontWeight="semibold"></Text>
    </HStack>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {},
});
