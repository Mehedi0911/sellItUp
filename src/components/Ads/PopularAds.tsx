import { AntDesign } from '@expo/vector-icons';
import { HStack, Icon, Text } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import AdCard from './AdCard';

interface PopularProductsProps { }

const PopularAds = (props: PopularProductsProps) => {
    return (
        <View style={styles.container}>
            <HStack justifyContent='space-between' alignItems={'center'} mb={3}>
                <Text fontSize={'lg'} fontWeight='semibold'>Popular Ads</Text>
                <Pressable>
                    <HStack justifyContent='space-between' alignItems={'center'}>
                        <Text fontSize={'md'} fontWeight='bold' color={colors.primary} mr={1}>All Ads</Text>
                        <Icon mt={0.5} as={AntDesign} name="arrowright" size="sm" color={colors.primary} />
                    </HStack>
                </Pressable>
            </HStack>

            <HStack alignItems={'center'} flexWrap='wrap' >
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
        </View>
    );
};

export default PopularAds;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    allAdsBtn: {
        width: '50%',
        alignSelf: 'center'
    }
});
