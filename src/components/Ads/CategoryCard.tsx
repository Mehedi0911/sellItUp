import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Center, Icon, Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface CategoryCardProps {
    category: any
}



const CategoryCard = ({ category }: CategoryCardProps) => {
    return (
        <Center w={"32%"} bgColor={colors.grey} borderRadius={5} p={2} mb={1}>
            {
                category.iconType === 'AntDesign' ?
                    <Icon as={AntDesign} name={category?.iconName} size="xl" mb={2} /> :
                    category.iconType === 'MaterialIcons' ?
                        <Icon as={MaterialIcons} name={category?.iconName} size="xl" mb={2} /> :
                        category.iconType === 'MaterialCommunityIcons' ?
                            <Icon as={MaterialCommunityIcons} name={category?.iconName} size="xl" mb={2} /> :
                            category.iconType === 'Ionicons' ?
                                <Icon as={Ionicons} name={category?.iconName} size="xl" mb={2} /> :
                                <Icon as={AntDesign} name="question" size="xl" mb={2} />
            }
            <Text fontSize={'md'} textAlign={'center'} mb={1}>{category.name}</Text>
            <Text textAlign={'center'} color={'grey'}>45,356 Ads</Text>
        </Center>
    );
};

export default CategoryCard;

const styles = StyleSheet.create({
    container: {}
});


