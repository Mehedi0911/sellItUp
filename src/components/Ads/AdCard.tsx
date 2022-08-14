import { Ionicons } from '@expo/vector-icons';
import { Box, Divider, HStack, Icon, Image, Text, View, VStack } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { Dimensions } from 'react-native';
interface AdCardProps { }

const screen = Dimensions.get("screen");

const AdCard = (props: AdCardProps) => {
    return (
        <View style={styles.container}>
            <View>
                <Image source={require('../../../assets/car.jpg')} alt={'car'} resizeMode="contain" height={170} />
            </View>
            <Text alignSelf={'center'} m={2} fontWeight="semibold">Brand New BMW car for sale.</Text>
            <Divider />
            <HStack p={3} justifyContent="space-between" alignItems="center">
                <HStack alignItems="center">
                    <Icon as={Ionicons} name="location-outline" size="sm" color={colors.primary} />
                    <Text>Dhaka</Text>
                </HStack>
                <Text fontWeight={'bold'} color={colors.red}>$200</Text>
            </HStack>
        </View>
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
