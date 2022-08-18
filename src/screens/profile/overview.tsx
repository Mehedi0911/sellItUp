import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ComingSoon from '../../components/common/CommingSoon';

interface OverviewProps { }

const Overview = (props: OverviewProps) => {
    return (
        <ComingSoon />
    );
};

export default Overview;

const styles = StyleSheet.create({
    container: {}
});
