import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ComingSoon from '../../components/common/CommingSoon';

interface MayAdsProps { }

const MayAds = (props: MayAdsProps) => {
    return (
        <ComingSoon />
    );
};

export default MayAds;

const styles = StyleSheet.create({
    container: {}
});
