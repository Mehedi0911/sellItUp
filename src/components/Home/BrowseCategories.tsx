import { AntDesign, Ionicons } from '@expo/vector-icons';
import { HStack, Icon, Text } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { colors } from '../../theme/colors';

interface BrowseCategoriesProps { }

const BrowseCategories = (props: BrowseCategoriesProps) => {
    return (
        <View style={styles.container}>
            <HStack justifyContent='space-between' alignItems={'center'} mb={3}>
                <Text fontSize={'lg'} fontWeight='semibold'>Categories</Text>

                <Pressable>
                    <HStack justifyContent='space-between' alignItems={'center'}>
                        <Text fontSize={'md'} fontWeight='bold' color={colors.primary} mr={1}>Browse All</Text>
                        <Icon mt={0.5} as={AntDesign} name="arrowright" size="sm" color={colors.primary} />
                    </HStack>
                </Pressable>

            </HStack>

            <HStack flexWrap={'wrap'} justifyContent="center">
                {
                    [1, 2, 3, 4, 5, 6].map((cat, ind) => (
                        <View style={styles.box} key={ind}>
                            <Icon alignSelf={'center'} mt={0.5} as={AntDesign} name="arrowright" size="sm" color={colors.primary} />
                            <Text alignSelf={'center'} fontSize="md">Mobiles</Text>
                            <Text alignSelf={'center'} fontSize="xs" color={'grey'}>49,500 Ads</Text>
                        </View>
                    ))
                }
            </HStack>
        </View>
    );
};

export default BrowseCategories;

const styles = StyleSheet.create({
    container: {
        marginTop: -50
    },
    box: {
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 5,
        padding: 10,
        margin: 5,
        width: '30%'
    }
});
