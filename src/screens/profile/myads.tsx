import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MayAdsProps { }

const MayAds = (props: MayAdsProps) => {
    return (
        <View style={styles.container}>
            <Text>MayAds</Text>
        </View>
    );
};

export default MayAds;

const styles = StyleSheet.create({
    container: {}
});
