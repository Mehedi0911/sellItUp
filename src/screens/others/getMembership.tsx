import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ComingSoon from '../../components/common/CommingSoon';

interface GetMembershipProps { }

const GetMembership = (props: GetMembershipProps) => {
    return (
        <ComingSoon />
    );
};

export default GetMembership;

const styles = StyleSheet.create({
    container: {}
});
