import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface AllAdsProps { }

const AllAds = (props: AllAdsProps) => {
    return (
        <View style={styles.container}>
            <Text>AllAds</Text>
        </View>
    );
};

export default AllAds;

const styles = StyleSheet.create({
    container: {}
});
