import { Text } from 'native-base';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface BannerProps { }

const Banner = (props: BannerProps) => {
    return (
        <View style={styles.container}>
            <Text textAlign={'center'} w={'70%'} fontSize='2xl' color={colors.white} fontWeight='semibold' mt={12}>Browse Over <Text color={colors.secondary} fontWeight='bold'>95,000</Text> Classified Listings of your choice</Text>
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
    container: {
        height: 300,
        backgroundColor: colors.dark,
        alignItems: 'center',
    }
});
