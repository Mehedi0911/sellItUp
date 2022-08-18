import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, Icon, Text } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { categories } from '../../constants/data';
import { colors } from '../../theme/colors';
import CategoryCard from '../Ads/CategoryCard';

interface BrowseCategoriesProps {
    navigation: any
}

const BrowseCategories = ({ navigation }: BrowseCategoriesProps) => {
    return (
        <View style={styles.container}>
            <HStack justifyContent='space-between' alignItems={'center'} mb={3}>
                <Text fontSize={'lg'} fontWeight='semibold'>Categories</Text>

                <Pressable onPress={() => navigation.navigate('Categories')}>
                    <HStack justifyContent='space-between' alignItems={'center'}>
                        <Text fontSize={'md'} fontWeight='bold' color={colors.primary} mr={1}>Browse All</Text>
                        <Icon mt={0.5} as={AntDesign} name="arrowright" size="sm" color={colors.primary} />
                    </HStack>
                </Pressable>

            </HStack>

            <HStack flexWrap={'wrap'} justifyContent="center" space={1}>
                {
                    categories?.slice(0, 6)?.map((category, index) => (
                        <CategoryCard category={category} key={index} />
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
