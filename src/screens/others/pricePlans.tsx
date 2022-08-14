import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PricePlansProps { }

const PricePlans = (props: PricePlansProps) => {
    return (
        <View style={styles.container}>
            <Text>PricePlans</Text>
        </View>
    );
};

export default PricePlans;

const styles = StyleSheet.create({
    container: {}
});
