import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ContactProps { }

const Contact = (props: ContactProps) => {
    return (
        <View style={styles.container}>
            <Text>Contact</Text>
        </View>
    );
};

export default Contact;

const styles = StyleSheet.create({
    container: {}
});
