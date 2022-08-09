import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, Image, StatusBar, Text } from "native-base";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
interface AppBarProps {
  showToolBar: boolean;
}

const AppBar = ({ showToolBar }: AppBarProps) => {
  return (
    <View>
      <HStack shadow={1} bg="#fff" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <Ionicons name="chevron-back" size={26} color="black" />
          <Image source={require("../../../assets/textLogo.png")} alt="logo" ml={2} />
        </HStack>
        {showToolBar && (
          <HStack>
            <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="lg" color="#393939" />} />
            <IconButton icon={<Icon as={MaterialIcons} name="search" size="lg" color="#393939" />} />
            <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="lg" color="#393939" />} />
          </HStack>
        )}
      </HStack>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({});
