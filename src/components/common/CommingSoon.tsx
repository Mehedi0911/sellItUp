import { MaterialIcons } from '@expo/vector-icons';
import { HStack, Icon, Text, VStack } from 'native-base';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

interface ComingSoonProps { }

const ComingSoon = (props: ComingSoonProps) => {
    return (
        <View style={styles.container}>
            <VStack alignItems={'center'}>
                <Icon as={MaterialIcons} name="developer-mode" size="2xl" mb={3} />
                <Text fontWeight={'semibold'} fontSize={'xl'} color={'grey'}>Under Development</Text>
            </VStack>
        </View>
    );
};

export default ComingSoon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
