import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Icon, Text, View, VStack } from "native-base";
import * as React from "react";
import { StyleSheet } from "react-native";
import AppBar from "../components/common/AppBar";
import ButtonGroup from "../components/common/ButtonGroup";
import ScreenHeader from "../components/common/ScreenHeader";
import { colors } from "../theme/colors";

interface CreateAdSuccessProps {
  navigation: any
}

const CreateAdSuccess = ({ navigation }: CreateAdSuccessProps) => {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Ad Created" />
      <View style={styles.content}>
        <Icon mb={3} as={MaterialIcons} name="verified" size="3xl" color={'green.600'} />
        <Text mb={2} fontSize={'xl'}>You ad published successfully</Text>
        <Text mb={3} opacity={0.5} textAlign={'center'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati necessitatibus id, minima mollitia magnam iusto.</Text>
        <ButtonGroup leftText='Back Home' rightText='Post Another'
          onPressLeft={() => navigation.navigate('Home')}
          onPressRight={() => navigation.navigate('CreateAdScreenOne')}
        />
      </View>
    </View>
  );
};

export default CreateAdSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20
  }
});
