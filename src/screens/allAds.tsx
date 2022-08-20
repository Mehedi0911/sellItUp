import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Button, CheckIcon, HStack, Icon, Pressable, Select, Text, TextArea } from "native-base";
import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AdCard from "../components/Ads/AdCard";
import AppBar from "../components/common/AppBar";
import { AdContext } from "../providers/ad";
import { colors } from "../theme/colors";

interface AllAdsProps { }

const AllAds = (props: AllAdsProps) => {
  const { allAds, adQuery, setAdQuery, sortLabel, setSortLabel } = React.useContext(AdContext)
  const [filteredAds, setFilteredAds] = React.useState(allAds as any)
  const [selectedSort, setSelectedSort] = React.useState(allAds as any)

  React.useEffect(() => {
    if (adQuery?.title !== '') {
      let title = adQuery?.title?.toLowerCase()
      const filter = allAds.filter((ad: any) => {
        return ad?.title?.toLowerCase()?.indexOf(title) > -1 || ad?.category?.toLowerCase()?.indexOf(title) > - 1
      })
      setFilteredAds(filter)
    } else {
      setFilteredAds(allAds)
    }
  }, [adQuery, sortLabel])

  const HandleSortAds = (sortName: string) => {

    if (sortName === 'Newest') {
      setSortLabel({ orderBy: 'createdAt', orderDir: 'desc' })
    } else if (sortName === 'Low Price') {
      setSortLabel({ orderBy: 'price', orderDir: 'desc' })
    } else if (sortName === 'Max Price') {
      setSortLabel({ orderBy: 'price', orderDir: 'asc' })
    }
  }

  return (
    <ScrollView style={styles.container}>
      <AppBar showToolBar darkTheme />
      <HStack p={5} alignItems="center" justifyContent="flex-start">
        <TextArea flex={1} variant='unstyled' autoCompleteType={"off"} h={12} mr={4}
          placeholder="type product name or category" p={4} bgColor={colors.grey}
          onChangeText={(text: string) => setAdQuery({ ...adQuery, title: text })}
        />
        <Button w={16} h={12} bgColor={colors.primary}><Icon as={Ionicons} name="filter-sharp" size="lg" color={colors.white} /></Button>
      </HStack>
      <HStack px={5} alignItems="center" justifyContent="space-between">
        <Text color={'grey'}>53,456 Ads Found</Text>
        <Select selectedValue={selectedSort}
          onValueChange={(itemValue) => {
            HandleSortAds(itemValue)
            setSelectedSort(itemValue)
          }}
          bgColor={colors.grey} minWidth="180"
          accessibilityLabel="Choose Service"
          placeholder="Newest"
          _selectedItem={{
            bg: colors.grey,
            endIcon: <CheckIcon size="5" />
          }}>
          <Select.Item label="Newest" value="Newest" />
          <Select.Item label="Low Price" value="Low Price" />
          <Select.Item label="Max Price" value="Max Price" />
        </Select>
      </HStack>
      <HStack alignItems={'center'} flexWrap='wrap' p={5}>
        {
          filteredAds?.map((ad: any, index: number) => (
            <AdCard key={index} ad={ad} />
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
