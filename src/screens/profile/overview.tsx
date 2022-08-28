import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Center, HStack, Icon, Text, View, Button } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import ComingSoon from '../../components/common/CommingSoon';
import ScreenHeader from '../../components/common/ScreenHeader';
import { colors } from '../../theme/colors';
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;


interface OverviewProps { }

const Overview = (props: OverviewProps) => {

    const data = {
        labels: ["January", "February", "March", "April"],
        datasets: [
            {
                data: [50, 100, 200, 500,]
            }
        ]
    };
    const chartConfig = {
        backgroundColor: colors.grey,
        backgroundGradientFrom: colors.primary,
        backgroundGradientTo: colors.blue,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
    }
    return (
        <View>
            <ScreenHeader title="Overview" />
            <ScrollView>
                <HStack p={4} space={2} >
                    {
                        items?.map((item, index) => (
                            <Center key={index} p={2} w={'32%'} borderRadius={5} borderWidth={2} borderColor={item?.borderColor}>
                                <Icon color={item.borderColor} size={'lg'} opacity={0.7} as={item?.iconType === 'MaterialCommunityIcons' ? MaterialCommunityIcons : item?.iconType === 'Ionicons' ? Ionicons : MaterialIcons} name={item?.iconName} />
                                <Text fontSize={'16'} fontWeight={'bold'} opacity={0.8}>{item?.title}</Text>
                                <Text fontSize={'20'} color={item.borderColor} fontWeight={'bold'}>{item?.count}</Text>
                            </Center>
                        ))
                    }
                </HStack>
                <View mx={4} overflowX={'scroll'}>
                    <BarChart
                        yAxisSuffix={''}
                        data={data}
                        width={screenWidth - 30}
                        height={350}
                        yAxisLabel=''
                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                    />
                </View>

                <View p={4} mb={20}>
                    <Text mb={2} fontWeight={600} color={colors.blue}>Current Subscription</Text>
                    <Text mb={2} fontWeight={700} opacity={0.7} fontSize={20}>Standard</Text>
                    <Text mb={2} opacity={0.6}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, vel.</Text>
                    <HStack space={3}>
                        <Button w={'40%'} variant={'solid'} bgColor={colors.green}>Upgrade Plan</Button>
                        <Button w={'40%'} variant={'outline'}>Cancel Plan</Button>
                    </HStack>
                </View>
            </ScrollView>
        </View>

    );
};

const items = [
    {
        title: 'Ads Posted',
        iconType: "MaterialCommunityIcons",
        iconName: "post-outline",
        borderColor: colors.green,
        count: 9
    },
    {
        title: 'Liked Ads',
        iconType: "MaterialIcons",
        iconName: "favorite",
        borderColor: colors.blue,
        count: 25
    },
    {
        title: 'Archived Ads',
        iconType: "Ionicons",
        iconName: "archive",
        borderColor: colors.orange,
        count: 7
    }
]
export default Overview;
const styles = StyleSheet.create({

});
