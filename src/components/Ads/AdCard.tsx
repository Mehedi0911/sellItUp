import { Ionicons } from '@expo/vector-icons';
import { Box, Divider, HStack, Icon, Image, Pressable, Text, View, VStack } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addDoc } from 'firebase/firestore';
interface AdCardProps {
    ad?: any,
}

const screen = Dimensions.get("screen");

const AdCard = ({ ad }: AdCardProps) => {
    const navigation: any = useNavigation()

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('AdDetails', { ad: ad })}>
            <View>
                <Image source={{ uri: ad?.images?.[0] }} alt={'car'} resizeMode="contain" height={170} />
            </View>
            <Text alignSelf={'center'} m={2} fontWeight="semibold">{ad?.title}</Text>
            <Divider />
            <HStack p={3} justifyContent="space-between" alignItems="center">
                <HStack alignItems="center">
                    <Icon as={Ionicons} name="location-outline" size="sm" color={colors.primary} />
                    <Text>{ad?.city}</Text>
                </HStack>
                <Text fontWeight={'bold'} color={colors.red}>$ {ad?.price}</Text>
            </HStack>
        </Pressable>
    );
};

export default AdCard;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.grey,
        borderRadius: 5,
        marginVertical: 10,
        marginHorizontal: screen.width > 500 ? 5 : 0,
        width: screen.width < 500 ? '100%' : '48%',
    }
});
