import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HStack, Icon, Text } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface ChipProps {
    title: string,
    iconType: string,
    iconName: string,
    bgColor: string,
}

const Chip = ({ title, iconType, iconName, bgColor }: ChipProps) => {
    return (
        <HStack alignItems={'center'} justifyContent={'center'} bgColor={bgColor} h={6} px={2} pb={0.5} borderRadius={20}>
            {iconType === 'AntDesign' ?
                <Icon as={AntDesign} name={iconName} size="sm" mb={2} color={colors.white} opacity={0.6} mt={2.5} /> :
                iconType === 'MaterialIcons' ?
                    <Icon as={MaterialIcons} name={iconName} size="sm" mb={2} color={colors.white} opacity={0.6} mt={2.5} /> :
                    iconType === 'MaterialCommunityIcons' ?
                        <Icon as={MaterialCommunityIcons} name={iconName} size="sm" mb={2} color={colors.white} opacity={0.6} mt={2.5} /> :
                        iconType === 'Ionicons' ?
                            <Icon as={Ionicons} name={iconName} size="sm" mb={2} color={colors.white} opacity={0.6} mt={2.5} /> :
                            <Icon as={AntDesign} name="question" size="sm" mb={2} color={colors.white} opacity={0.6} mt={2.5} />}
            <Text ml={1} color={colors.white} opacity={0.8}>{title}</Text>
        </HStack>
    );
};

export default Chip;

const styles = StyleSheet.create({
    container: {}
});
