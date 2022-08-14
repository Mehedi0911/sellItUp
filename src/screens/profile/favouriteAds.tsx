import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface FavoriteAdsProps { }

const FavoriteAds = (props: FavoriteAdsProps) => {
    return (
        <View style={styles.container}>
            <Text>FavoriteAds</Text>
        </View>
    );
};

export default FavoriteAds;

const styles = StyleSheet.create({
    container: {}
});
