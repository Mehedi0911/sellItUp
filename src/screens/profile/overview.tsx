import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface OverviewProps { }

const Overview = (props: OverviewProps) => {
    return (
        <View style={styles.container}>
            <Text>Overview</Text>
        </View>
    );
};

export default Overview;

const styles = StyleSheet.create({
    container: {}
});
