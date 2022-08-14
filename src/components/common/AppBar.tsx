import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, IconButton, Image, StatusBar, Text } from "native-base";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
interface AppBarProps {
  showToolBar: boolean;
  darkTheme?: boolean
  minimal?: boolean
}

const AppBar = ({ showToolBar, darkTheme, minimal }: AppBarProps) => {
  return (
    <View>
      <HStack bg={darkTheme ? colors.dark : colors.white} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          {!showToolBar && <Ionicons name="chevron-back" size={26} color="black" />}
          {darkTheme ?
            <Image source={require("../../../assets/logoWhite.png")} alt="logo" ml={2} /> :
            <Image source={require("../../../assets/logoBlack.png")} alt="logo" ml={2} />
          }
        </HStack>
        {showToolBar && (
          <HStack alignItems={'center'}>
            {!minimal &&
              <IconButton icon={<Icon as={MaterialIcons} name="search" size="lg" color={darkTheme ? colors.white : colors.black} />} />
            }
            {!minimal &&
              <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="lg" color={darkTheme ? colors.white : colors.black} />} />
            }
            <IconButton icon={<Icon as={MaterialIcons} name="notifications" size="lg" color={darkTheme ? colors.white : colors.black} />} />
          </HStack>
        )}
      </HStack>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({

});
