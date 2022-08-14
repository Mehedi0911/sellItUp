import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Button, CheckIcon, HStack, Icon, Pressable, Select, Text, TextArea } from "native-base";
import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AdCard from "../components/Ads/AdCard";
import AppBar from "../components/common/AppBar";
import { colors } from "../theme/colors";

interface AllAdsProps { }

const AllAds = (props: AllAdsProps) => {
  const [category, setCategory] = React.useState('Newest');
  return (
    <ScrollView style={styles.container}>
      <AppBar showToolBar darkTheme />
      <HStack p={6} alignItems="center" justifyContent="flex-start">
        <TextArea variant='unstyled' autoCompleteType={"off"} h={12} w={'85%'} mr={4} placeholder="search for anything" p={4} bgColor={colors.grey} />
        <Button w={16} h={12} bgColor={colors.primary}><Icon as={Ionicons} name="filter-sharp" size="lg" color={colors.white} /></Button>
      </HStack>
      <HStack px={7} alignItems="center" justifyContent="space-between">
        <Text color={'grey'}>53,456 Ads Found</Text>
        <Select selectedValue={category}
          onValueChange={itemValue => setCategory(itemValue)}
          bgColor={colors.grey} minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Newest"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}>
          <Select.Item label="Latest" value="ux" />
          <Select.Item label="Low Price" value="web" />
          <Select.Item label="Max Price" value="cross" />
          <Select.Item label="New" value="ui" />
          <Select.Item label="Used" value="backend" />
        </Select>
      </HStack>
      <HStack alignItems={'center'} flexWrap='wrap' p={5}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ad, index) => (
            <AdCard key={index} />
          ))
        }
      </HStack>
      <Pressable style={styles.allAdsBtn}>
        <HStack alignItems={'center'} justifyContent='center' my={5} background={"brandPrimary.100"} p={3} borderRadius={5}>
          <Text fontSize={'md'} fontWeight='bold' color={colors.primary} mr={1}>All Ads</Text>
          <Icon mt={0.5} as={AntDesign} name="arrowright" size="sm" color={colors.primary} />
        </HStack>
      </Pressable>
    </ScrollView>
  );
};

export default AllAds;

const styles = StyleSheet.create({
  container: {

  },
  allAdsBtn: {
    width: '50%',
    alignSelf: 'center'
  }
});