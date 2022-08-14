import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface GetMembershipProps { }

const GetMembership = (props: GetMembershipProps) => {
    return (
        <View style={styles.container}>
            <Text>GetMembership</Text>
        </View>
    );
};

export default GetMembership;

const styles = StyleSheet.create({
    container: {}
});
