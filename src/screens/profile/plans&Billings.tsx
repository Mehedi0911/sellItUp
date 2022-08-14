import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface PlanAndBillingsProps { }

const PlanAndBillings = (props: PlanAndBillingsProps) => {
    return (
        <View style={styles.container}>
            <Text>PlanAndBillings</Text>
        </View>
    );
};

export default PlanAndBillings;

const styles = StyleSheet.create({
    container: {}
});
